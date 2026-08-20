import express from "express";
import dotenv from "dotenv";

import { router as healthRouter } from "./routes/health.js";
import { router as chatRouter } from "./routes/chat.js"
import { router as conversationRouter } from "./routes/chat.js"

dotenv.config();
export const app = express();

app.use(express.json());

app.use("/api", healthRouter);
app.use("/api", chatRouter);
app.use("/api", conversationRouter);