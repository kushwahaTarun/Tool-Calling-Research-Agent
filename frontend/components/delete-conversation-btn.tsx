"use client";

import { useRouter } from "next/navigation";

import { Trash2 } from "lucide-react";

interface propsType {
    conversationId: string;
    className?: string;
}

export default function DeleteConversationBtn({ conversationId, className }: propsType) {

    const router = useRouter();

    // TRIGGERS WHEN USER CLICK ON THE TRASH/DELETE BUTTON ON THE CONVERSATION
    const handleConversationDelete = async (e: React.MouseEvent, conversationId: string) => {
        e.preventDefault();
        try {
            const response = await window.fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/conversations/${conversationId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`error while deleting the conversation ${conversationId}`);
            }

            const result = await response.json();
            router.refresh();

        }
        catch (err) {
            console.error("error while deleting the conversation", err);
        }
    }

    return <button 
        className="absolute hidden group-hover:flex items-center justify-center text-muted-foreground hover:text-red-500 p-1 rounded-md transition-colors z-10" 
        style={{ right: '0.5rem' }}
        aria-label="Delete conversation" 
        onClick={(e) => handleConversationDelete(e, conversationId)}
    >
        <Trash2 className="size-4" />
    </button>
}