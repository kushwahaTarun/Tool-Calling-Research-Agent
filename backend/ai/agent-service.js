import { callLLM } from "./ai-service.js";
import { webSearch } from "../tools/web-search.js";
import { fetchUrl } from "../tools/fetch-url.js";

const MAX_STEPS = 5;

const SYSTEM_PROMPT =
  "You are a helpful research assistant. Use tools when you need current or external information.";

const toolMap = {
  web_search: webSearch,
  fetch_url: fetchUrl,
};

export async function runAgent({ question, conversationHistory = [], onEvent }) {
  let messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...conversationHistory,
    { role: "user", content: question },
  ];

  let step = 0;

  while (step < MAX_STEPS) {
    step++;

    const response = await callLLM(messages);
    const message = response?.choices?.[0]?.message;

    if (!message) {
      const error = new Error("The model did not return a message");
      onEvent?.({ type: "error", message: error.message });
      throw error;
    }

    const toolCalls = message.toolCalls;

    if (!toolCalls || toolCalls.length === 0) {
      const finalAnswer = message.content;
      onEvent?.({ type: "final_answer", content: finalAnswer });
      return finalAnswer;
    }

    for (const toolCall of toolCalls) {
      const toolName = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);

      onEvent?.({ type: "tool_start", tool: toolName, args });

      const toolFunction = toolMap[toolName];
      if (!toolFunction) {
        throw new Error(`Unknown tool: ${toolName}`);
      }

      const toolResult = await toolFunction(args);
      const toolContent =
        typeof toolResult === "string"
          ? toolResult
          : JSON.stringify(toolResult ?? { error: "Tool returned no result" });

      onEvent?.({ type: "tool_result", tool: toolName, result: toolResult });

      messages.push({
        role: "assistant",
        toolCalls: [toolCall],
      });

      messages.push({
        role: "tool",
        toolCallId: toolCall.id,
        content: toolContent,
      });
    }
  }

  const fallback = "I reached the maximum number of research steps.";
  onEvent?.({ type: "final_answer", content: fallback });
  return fallback;
}