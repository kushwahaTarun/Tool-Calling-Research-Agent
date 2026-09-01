"use client";

import type { FormEvent } from "react";
import { ArrowUp, Paperclip } from "lucide-react";
import { useRef } from "react";

import { Textarea } from "@/components/ui/textarea";


export default function ChatComposer({
  autoFocus = false,
  onSend,
  disabled
}: {
  autoFocus?: boolean;
  onSend: (question: string) => void;
  disabled: boolean;
}) {

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    const value = textAreaRef.current?.value ?? "";

    if (!value.trim().length) return;

    onSend(value);

    if (textAreaRef.current) {
      textAreaRef.current.value = "";
    }
  }

  return (
    <div className="shrink-0 border-t border-border bg-background px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-3xl"
        aria-label="Send a research question"
      >
        <div className="mb-2 flex items-end justify-between gap-3">
          <label
            htmlFor="research-query"
            className="text-sm font-medium text-foreground"
          >
            Ask a research question
          </label>
          <p
            id="research-query-hint"
            className="sr-only text-xs text-muted-foreground sm:not-sr-only sm:block"
          >
            <kbd className="rounded-sm border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">
              Enter
            </kbd>{" "}
            to send
            <span className="mx-1.5 text-border">·</span>
            <kbd className="rounded-sm border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">
              Shift
            </kbd>
            +
            <kbd className="rounded-sm border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">
              Enter
            </kbd>{" "}
            for a new line
          </p>
        </div>

        <div className="rounded-md border border-input bg-card p-2 transition-colors duration-200 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30">
          <Textarea
            id="research-query"
            name="question"
            rows={2}
            autoFocus={autoFocus}
            ref={textAreaRef}
            placeholder="Ask anything you want researched…"
            aria-describedby="research-query-hint"
            className="min-h-14 max-h-40 w-full resize-none border-0 bg-transparent px-3 py-3 text-base leading-6 shadow-none focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent"
          />

          <div className="flex items-center justify-between gap-2 px-1">
            <button
              type="button"
              aria-label="Attach context"
              className="inline-flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Paperclip className="size-4" aria-hidden="true" />
            </button>

            <button
              type="submit"
              aria-label="Send question"
              disabled={disabled}
              className="inline-flex size-11 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <ArrowUp className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
