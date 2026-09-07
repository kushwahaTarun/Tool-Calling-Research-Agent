import { runAgent } from "../ai/agent-service.js";
import { supabase } from "../db/index.js";

export const researchAndGetAnswer = async (userQuestion, conversationId, onEvent) => {
    conversationId = conversationId || "";

    return runAgent({
        question: userQuestion,
        onEvent,
    });
};

export const addMessageToDB = async (message, conversation_id, role) => {
    const {data, error} = await supabase.from("messages").insert({ message, conversation_id, role });
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

// SERVICE THAT GETS ALL MESSAGES FOR A CONVERSATION FROM THE DB
export const getAllMessagesFromDB = async (conversation_id) => {
    const {data, error} = await supabase.from("messages").select("*").eq("conversation_id", conversation_id);
    if (error) {
        throw new Error(error.message);
    }
    return data;
}