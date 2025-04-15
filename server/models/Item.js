import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    tag: { type: String, enum: ["Lost", "Found"], required: true },
    email: { type: String, required: true },
    foundDate: { type: Date, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes __v field
  }
);

export default mongoose.model("Item", itemSchema);
