import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { blogSummarySchema } from "./ReferenceSchemas";

const hubSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  websiteId: {
    type: Schema.Types.ObjectId,
    ref: "Website",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blogs: [blogSummarySchema],
});

const Hub = mongoose.models?.Hub || mongoose.model("Hub", hubSchema);

export default Hub;
