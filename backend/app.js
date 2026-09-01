import "./load-env.js";
import express from "express";

import { router as healthRouter } from "./routes/health.js";
import { router as chatRouter } from "./routes/chat.js";
import { router as conversationRouter } from "./routes/conversations.js";

export const app = express();

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", frontendOrigin);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  next();
});

app.use(express.json());

app.use("/api", healthRouter);
app.use("/api", chatRouter);
app.use("/api", conversationRouter);