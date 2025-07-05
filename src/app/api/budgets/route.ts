import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";

// Budget schema: each entry has category, amount, and month (e.g., "2025-07")
const budgetSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  month: String,
});

// Reuse existing model in dev or create a new one
const Budget = mongoose.models.Budget || mongoose.model("Budget", budgetSchema);

// GET /api/budgets – fetch all budget entries
export async function GET() {
  await connectDB();
  const budgets = await Budget.find();
  return NextResponse.json(budgets);
}

// POST /api/budgets – create a new budget entry
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newBudget = new Budget(body);
  await newBudget.save();
  return NextResponse.json(newBudget);
}
