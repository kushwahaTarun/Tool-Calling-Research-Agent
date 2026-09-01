"use client";

import { useEffect, useRef, useState } from "react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import ChatComposer from "@/components/chat-composer";

// INTERFACE FOR THE MESSAGE
    interface Message {
        role: "user" | "assistant",
        text: string
    }

export default function ResearchChat() {
 
    // STATE VARIABLE USED FOR ENABLING/DISABLING THE SEND BUTTON
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    
    // STATE VARIABLE THAT STORES THE USER AND ASSISTANT MESSAGES 
    const [messages, setMessages] = useState<Message[]>([]);
    
    // STATE VARIABLE THAT SORES THE STATUS OF THE RESPONSE BASED ON THE EVENTS RECEIVED  
    const [status, setStatus] = useState<string>("");

    const transcriptRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const container = transcriptRef.current;
      if (!container) return;

      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }, [messages, status]);

    async function handleSubmit(query: string) {

    // UPDATING THE STATE TO DISABLE SEND BUTTON   
    setIsStreaming(true);
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setStatus("Thinking");

    try {
      const response = await window.fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/research`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question: query,
          conversationId: ""
        })
      });

      if (!response.ok) {
        setIsStreaming(false);
        console.error("error while pulling the response");
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        setIsStreaming(false);
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value: chunk, done } = await reader.read();

        if (done) break;

        buffer += decoder.decode(chunk, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          const line = part.split("\n").find((l) => l.startsWith("data: "));
          if (!line) continue;

          const event = JSON.parse(line.slice(6));

          if (event.type === "started") {
            setStatus("Thinking…");
          } else if (event.type === "tool_start") {
            const label =
              event.tool === "fetch_url"
                ? `Reading: ${event.args?.url ?? ""}`
                : `Searching: ${event.args?.query ?? event.tool}`;
            setStatus(label);
          } else if (event.type === "final_answer") {
            setMessages((prev) => [
              ...prev,
              { role: "assistant", text: event.content ?? "" },
            ]);
            setStatus("");
          } else if (event.type === "error") {
            setStatus(event.message || "Research failed");
          } else if (event.type === "done") {
            setIsStreaming(false);
            setStatus("");
          }
        }
      }

    }
    catch (err) {
      console.error("Error generated from the file", err);

      // DISABLING THE STREAM IN CASE OF ERROR
      setIsStreaming(false);
    }
  }

    const isEmpty = messages.length === 0;

    return (
        <div className="flex h-full min-h-0 flex-1 flex-col">
        <section
        ref={transcriptRef}
        aria-labelledby={isEmpty ? "empty-chat-heading" : "research-transcript"}
        className={`flex min-h-0 flex-1 flex-col overflow-y-auto px-4 sm:px-6 ${
          isEmpty ? "items-center justify-center py-10" : "items-stretch justify-start py-6"
        }`}
        >
        {isEmpty ? (
        <div className="max-w-md text-center">
          <h1
            id="empty-chat-heading"
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            What should we research?
          </h1>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Type a question below. The agent can search and call tools when it
            needs evidence.
          </p>
        </div>
        ) : (
        <ul
          id="research-transcript"
          className="mx-auto flex w-full max-w-3xl flex-col gap-4"
        >
          {messages.map((message, index) => {
            const isUser = message.role === "user";

            return (
              <li
                key={index}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex min-w-0 max-w-[85%] flex-col gap-1 sm:max-w-[75%] ${
                    isUser ? "items-end" : "items-start"
                  }`}
                >
                  <p className="text-xs text-muted-foreground">
                    {isUser ? "You" : "Assistant"}
                  </p>
                  <div
                    className={`research-markdown min-w-0 wrap-anywhere rounded-md px-3 py-2 text-sm leading-6 sm:text-base ${
                      isUser
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-card text-card-foreground"
                    }`}
                  >
                    <Markdown remarkPlugins={[remarkGfm]}>
                      {message.text}
                    </Markdown>
                  </div>
                </div>
              </li>
            );
          })}
          {status ? (
            <li key={status} className="flex justify-start">
              <p
                className="research-status inline-flex max-w-[85%] items-baseline gap-1 text-sm text-muted-foreground sm:max-w-[75%]"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                {status}
                <span className="research-status-dots" aria-hidden="true">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </p>
            </li>
          ) : null}
        </ul>
        )}
        </section>

      <ChatComposer autoFocus disabled={isStreaming} onSend={handleSubmit} />
    </div>
    )
}