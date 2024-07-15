import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const blogSummarySchema = new Schema(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

export const hubSummarySchema = new Schema(
  {
    hubId: {
      type: Schema.Types.ObjectId,
      ref: "Hub",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

export const websiteSummarySchema = new Schema(
  {
    websiteId: {
      type: Schema.Types.ObjectId,
      ref: "Website",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);
