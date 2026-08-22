import express from "express";

import { createConversation, 
   getallConversations,
   getConversationChats,
   deleteConversation
} from "../controllers/conversations.js";

export const router = express.Router();

// ENDPOINT TO CREATE A NEW CONVERSATION
router.post("/conversations", createConversation);

// ENDPOINT TO GET ALL THE CONVERSATIONS FROM THE DB
router.get("/conversations", getallConversations);

// ENDPOINT TO GET A PARTICULAR CONVERSATION CHATS
router.get("/conversations/:id", getConversationChats);

// ENDPOINT TO DELETE A PARTICULAR CONVERSATION
router.delete("/conversations/:id", deleteConversation);