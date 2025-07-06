import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";

const budgetSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  month: String,
});

const Budget = mongoose.models.Budget || mongoose.model("Budget", budgetSchema);

export async function GET() {
  try {
    await connectDB();
    const budgets = await Budget.find();
    return NextResponse.json(budgets, { status: 200 });
  } catch (error) {
    console.error("GET /api/budgets error:", error);
    return NextResponse.json(
      { error: "Failed to fetch budgets", details: error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newBudget = new Budget(body);
    await newBudget.save();
    return NextResponse.json(newBudget, { status: 201 });
  } catch (error) {
    console.error("POST /api/budgets error:", error);
    return NextResponse.json(
      { error: "Failed to create budget", details: error },
      { status: 500 }
    );
  }
}
