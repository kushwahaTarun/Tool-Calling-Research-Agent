import type { ReactNode } from "react";
import Link from "next/link";
import {
  Clock3,
  MessageSquare,
  PanelLeft,
  Plus,
  Search,
  Settings,
} from "lucide-react";

import { formatConversationTime } from "@/lib/time"
import DeleteConversationBtn from "./delete-conversation-btn";

export default async function ApplicationSidebar({
  children,
}: {
  children: ReactNode;
}) {

  async function getAllConversations() {
    const baseUrl = process.env.BACKEND_BASE_URL;

    if (!baseUrl) return [];

    try {
      const response = await fetch(`${baseUrl}/api/conversations`, {
        "cache": "no-store"
      });

      if (!response.ok) {
        console.error("Error while retrieving the conversations");
        return [];
      }

      const result = await response.json();
      return result;
    }
    catch (error) {
      return [];
    }

  }

  async function handleSearch(formData: FormData) {
    "use server";
    const query = formData.get("conversationSearch") as string;

    if (!query) return;
  }

  const conversations = await getAllConversations();

  return (
    <div className="drawer lg:drawer-open h-dvh">
      <input id="app-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex h-dvh min-h-0 flex-col overflow-hidden bg-background">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-3">
          <label
            htmlFor="app-drawer"
            aria-label="Toggle sidebar"
            className="inline-flex size-11 items-center justify-center rounded-md text-foreground transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <PanelLeft className="size-5" aria-hidden="true" />
          </label>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium tracking-tight">
              New research
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Workspace · Tool-calling agent
            </p>
          </div>

          <span className="mr-1 inline-flex items-center gap-2 rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            Ready
          </span>
        </header>

        <main
          id="main-content"
          tabIndex={-1}
          className="flex min-h-0 flex-1 flex-col outline-none"
        >
          {children}
        </main>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="app-drawer"
          aria-label="Close sidebar"
          className="drawer-overlay"
        />

        <aside className="flex min-h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground is-drawer-close:w-16 is-drawer-open:w-72">
          <div className="flex items-center gap-3 border-b border-sidebar-border px-3 py-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-md border border-sidebar-border bg-muted font-heading text-xs font-semibold">
              RA
            </span>
            <div className="min-w-0 is-drawer-close:hidden">
              <p className="text-sm font-semibold tracking-tight">
                Research Agent
              </p>
              <p className="text-xs text-muted-foreground">Private workspace</p>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-4 p-3">
            <Link
              href="/"
              aria-label="New conversation"
              data-tip="New conversation"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-sidebar-border bg-transparent px-3 text-sm font-medium text-sidebar-foreground transition-colors duration-200 hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring is-drawer-close:tooltip is-drawer-close:tooltip-right"
            >
              <Plus className="size-4 shrink-0" aria-hidden="true" />
              <span className="is-drawer-close:hidden">New conversation</span>
            </Link>

            <div className="is-drawer-close:hidden">
              <label
                htmlFor="conversation-search"
                className="mb-2 block text-xs font-medium text-muted-foreground"
              >
                Search
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <form action={handleSearch}>
                  <input
                    id="conversation-search"
                    type="search"
                    name="conversationSearch"
                    placeholder="Find a thread"
                  className="h-11 w-full rounded-md border border-input bg-background pr-3 pl-10 text-base text-foreground placeholder:text-muted-foreground transition-colors duration-200 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none md:text-sm"
                />
                </form>
              </div>
            </div>

            <nav
              aria-label="Conversations"
              className="min-h-0 flex-1 overflow-y-auto"
            >
              <h2 className="mb-2 flex items-center gap-2 px-1 text-xs font-medium text-muted-foreground is-drawer-close:hidden">
                <Clock3 className="size-3" aria-hidden="true" />
                Recent
              </h2>
              <ul className="flex flex-col gap-1">
                {conversations.data.map((conversation: any) => (
                  <li key={conversation.id} className="group relative flex items-center">
                    <Link
                      href={`/?id=${conversation.id}`}
                      data-tip={conversation.title}
                      className={`relative flex w-full min-h-11 items-center gap-2.5 rounded-md px-3 py-2.5 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring is-drawer-close:tooltip is-drawer-close:tooltip-right ${conversation.current
                          ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/70"
                        }`}
                    >
                      {conversation.current ? (
                        <span
                          aria-hidden="true"
                          className="absolute top-2.5 bottom-2.5 left-0 w-0.5 rounded-full bg-primary"
                        />
                      ) : null}
                      <MessageSquare
                        className="size-4 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1 is-drawer-close:hidden">
                        <span className="block truncate pr-6">
                          {conversation.title}
                        </span>
                      </span>
                      <span className="text-[11px] font-normal text-muted-foreground is-drawer-close:hidden group-hover:hidden">
                        {formatConversationTime(conversation.created_at)}
                      </span>
                    </Link>

                    {/* Delete conversation trash button */}
                    <DeleteConversationBtn 
                      conversationId={conversation.id} 
                      className="absolute right-2 hidden group-hover:flex items-center justify-center text-muted-foreground hover:text-red-500 is-drawer-close:hidden p-1 rounded-md transition-colors z-10" 
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="space-y-1 border-t border-sidebar-border p-3">
            <Link
              href="/"
              aria-label="Settings"
              data-tip="Settings"
              className="flex min-h-11 items-center gap-2 rounded-md px-3 text-sm text-sidebar-foreground transition-colors duration-200 hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring is-drawer-close:tooltip is-drawer-close:tooltip-right"
            >
              <Settings className="size-4 shrink-0" aria-hidden="true" />
              <span className="is-drawer-close:hidden">Settings</span>
            </Link>

            <div className="flex items-center gap-3 rounded-md px-2 py-2 is-drawer-close:justify-center">
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-md bg-muted text-xs font-semibold"
              >
                Y
              </span>
              <div className="min-w-0 is-drawer-close:hidden">
                <p className="truncate text-sm font-medium">You</p>
                <p className="truncate text-xs text-muted-foreground">
                  Local session
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
