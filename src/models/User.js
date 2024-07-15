import mongoose from "mongoose";
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
import { websiteSummarySchema } from "./ReferenceSchemas";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Hide password from return query unless specifically requested
  },
  websites: [websiteSummarySchema],
});

UserSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  });
});

UserSchema.methods.verifyPassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw new Error(err);
  }
};

export default mongoose.models?.User || mongoose.model("User", UserSchema);
