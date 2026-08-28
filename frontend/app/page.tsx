import ChatComposer from "@/components/chat-composer";

export default function Home() {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <section
        aria-labelledby="empty-chat-heading"
        className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-10 sm:px-6"
      >
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
      </section>

      <ChatComposer autoFocus />
    </div>
  );
}
