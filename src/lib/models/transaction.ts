import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    amount: Number,
    description: String,
    date: Date,
    category: {
      type: String,
      enum: ["Food", "Rent", "Entertainment", "Shopping", "Utilities", "Other"],
      default: "Other",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
