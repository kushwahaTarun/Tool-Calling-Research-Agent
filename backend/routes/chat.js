import express from "express";

import { getAnswer } from "../controllers/chat.js"

export const router = express.Router();

// ENDPOINT THAT RESEARCH USING A USER QUERY
router.post("/research", getAnswer)