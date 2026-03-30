import express, { Router } from "express";
import { Url } from "../models/url.model.js";
import {
  handleGenerateNewShortUrl,
  visitRedirectedUrl,
  handleGetAnalytics,
} from "../controllers/index.js";

const router = Router();
router.route("/").post(handleGenerateNewShortUrl);
router.route("/:shortId").get(visitRedirectedUrl);
router.route("/analytics/:shortId").get(handleGetAnalytics);

export default router;
