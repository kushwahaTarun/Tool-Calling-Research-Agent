import "../load-env.js";
import { OpenRouter } from "@openrouter/sdk";

import { tools } from "../tools/tools-schema.js";

const apiKey = process.env.OPENROUTER_API_KEY;
const model = process.env.OPENROUTER_MODEL_NAME;

if (!apiKey) {
  throw new Error("OPENROUTER_API_KEY is missing. Add it to backend/.env");
}

if (!model) {
  throw new Error("OPENROUTER_MODEL_NAME is missing. Add it to backend/.env");
}

const client = new OpenRouter({ apiKey });

export async function callLLM(messages) {
  try {
    return await client.chat.send({
      chatRequest: {
        model,
        messages,
        tools,
        tool_choice: "auto",
      },
    });
  } catch (error) {
    console.error("Error:", error.message || error);
    throw error;
  }
}