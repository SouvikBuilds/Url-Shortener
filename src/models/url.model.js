import mongoose, { Schema, model } from "mongoose";
const urlSchema = new Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: Number,
      },
    ],
  },
  { timestamps: true },
);
export const Url = model("Url", urlSchema);
