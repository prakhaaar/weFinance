import { connectDB } from "@/lib/db";
import Transaction from "@/lib/models/transaction";
import { NextResponse } from "next/server";

// GET /api/transactions – fetch all transactions (most recent first)
export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

// POST /api/transactions – create a new transaction
export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const newTransaction = await Transaction.create(data);
  return NextResponse.json(newTransaction);
}
