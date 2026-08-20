import express from "express";

import { checkHealth } from "../controllers/health.js";

export const router = express.Router();

// ENDPOINT THAT CHECKS THE HEALTH OF A SERVER
router.get("/health", checkHealth);