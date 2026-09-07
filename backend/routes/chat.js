import express from "express";

import { getAnswer, addMessage, getAllMessages } from "../controllers/chat.js"

export const router = express.Router();

// ENDPOINT THAT RESEARCH USING A USER QUERY
router.post("/research", getAnswer);

// ENDPOINT THAT ADDS A MESSAGE TO THE DB
router.post('/messages', addMessage);

// ENDPOINT TO GET ALL THE MESSAGES FOR A CONVERSATION
router.get("/messages", getAllMessages);