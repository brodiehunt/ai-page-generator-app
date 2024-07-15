import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  keywords: [string],
  hubId: {
    type: Schema.Types.ObjectId,
    ref: "Hub",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.models?.Blog || mongoose.model("Blog", blogSchema);
