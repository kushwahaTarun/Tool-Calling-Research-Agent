import { runAgent } from "../ai/agent-service.js";

export const researchAndGetAnswer = async (userQuestion, conversationId, onEvent) => {
    conversationId = conversationId || "";

    return runAgent({
        question: userQuestion,
        onEvent,
    });
};