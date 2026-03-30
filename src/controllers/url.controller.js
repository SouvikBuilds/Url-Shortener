import { ApiError, ApiResponse, asyncHandler } from "../utils/index.js";
import { nanoid } from "nanoid";
import { Url } from "../models/url.model.js";

export const handleGenerateNewShortUrl = asyncHandler(
  async (req, res, next) => {
    try {
      const { redirectUrl } = req.body;
      if (!redirectUrl || redirectUrl.trim().length === 0) {
        console.log("Url is missing");
        throw new ApiError(400, "url is required");
      }
      const shortId = nanoid(8);
      await Url.create({
        shortId: shortId,
        redirectUrl,
        visitHistory: [],
      });

      return res.status(201).json(
        new ApiResponse(
          201,
          {
            id: shortId,
            shotUrl: `${process.env.BACKEND_URL}/api/v1/url/${shortId}`,
          },
          "Short Url Created",
        ),
      );
    } catch (error) {
      console.log("Error: ", error);
      throw new ApiError(
        error.statusCode || 500,
        error.message || "internal server error",
      );
    }
  },
);

export const visitRedirectedUrl = asyncHandler(async (req, res, next) => {
  try {
    const url = await Url.findOne({ shortId: req.params.shortId });

    if (!url) {
      throw new ApiError(404, "Url not found");
    }

    url.visitHistory.push({
      timestamp: Date.now(),
    });

    await url.save();

    return res.redirect(url.redirectUrl);
  } catch (error) {
    console.log("Error: ", error);

    throw new ApiError(
      error.statusCode || 500,
      error.message || "Internal Server Error",
    );
  }
});

export const handleGetAnalytics = asyncHandler(async (req, res, next) => {
  try {
    const url = await Url.findOne({ shortId: req.params.shortId });
    if (!url) {
      throw new ApiError(404, "Url not found");
    }
    const totalClicks = url.visitHistory.length;
    const analytics = url.visitHistory;
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { totalClicks, analytics },
          "analytics fetched successfully",
        ),
      );
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Internal Server Error",
    );
  }
});
