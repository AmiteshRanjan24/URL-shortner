import { Router } from "express";
import {
  shortenUrl,
  redirectUrl,
  getAnalytics,
} from "../controllers/url.controller.js";

const router = Router();

// POST shorten
router.post("/api/v1/shorten", shortenUrl);

// analytics endpoint - must come before /:shortId
router.get("/api/v1/analytics/:shortId", getAnalytics);

// redirect
router.get("/:shortId", redirectUrl);

export default router;
