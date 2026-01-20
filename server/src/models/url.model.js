import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: { type: String, unique: true, index: true, required: true },
    longUrl: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    dailyClicks: { type: Map, of: Number, default: {} },
    expiresAt: Date,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Url", urlSchema);
