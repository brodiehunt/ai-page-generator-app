import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { hubSummarySchema } from "./ReferenceSchemas";
const seoMatrixSchema = new Schema(
  {
    hubs: [String],
    spokeVariants: [String],
    customerNeedVariants: [String],
    fillerWords: [String],
    targetAudience: [String],
    hasSpreadsheet: {
      type: Boolean,
      default: false,
      required: true,
    },
    spreadsheetContent: {
      type: Buffer,
      required: false,
    },
    spreadsheetFilename: {
      type: String,
      required: false,
    },
    hasContent: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { _id: false }
);

const websiteSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hubs: [hubSummarySchema],
  seoMatrix: seoMatrixSchema,
});

const Website =
  mongoose.models?.Website || mongoose.model("Website", websiteSchema);

export default Website;
