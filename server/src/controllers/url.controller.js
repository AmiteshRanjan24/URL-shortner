import {
  createShortUrl,
  resolveShortUrl,
  getUrlAnalytics,
} from "../services/url.service.js";
import { enqueueAnalyticsEvent } from "../jobs/queue.js";
import { env } from "../config/env.js";
import { isValidUrl } from "../utils/validateUrl.js";

export async function shortenUrl(req, res, next) {
  try {
    const { longUrl, expiresAt } = req.body;
    if (!longUrl || !isValidUrl(longUrl)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    const url = await createShortUrl(longUrl, expiresAt);
    return res.json({
      shortUrl: `${env.BASE_URL}/${url.shortId}`,
      shortId: url.shortId,
    });
  } catch (err) {
    next(err);
  }
}

export async function redirectUrl(req, res, next) {
  try {
    const { shortId } = req.params;
    const longUrl = await resolveShortUrl(shortId);
    if (!longUrl) return res.status(404).send("Not found");

    // enqueue analytics, non-blocking
    enqueueAnalyticsEvent({ shortId, timestamp: Date.now() });

    return res.redirect(301, longUrl);
  } catch (err) {
    next(err);
  }
}

export async function getAnalytics(req, res, next) {
  try {
    const { shortId } = req.params;
    const doc = await getUrlAnalytics(shortId);
    if (!doc) return res.status(404).json({ error: "Not found" });
    return res.json(doc);
  } catch (err) {
    next(err);
  }
}
