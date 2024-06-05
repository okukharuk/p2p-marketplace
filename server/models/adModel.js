import mongoose, { Schema } from "mongoose";

const adSchema = mongoose.Schema(
  {
    user_id: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      immutable: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ad = mongoose.model("Ad", adSchema);

export default Ad;
