import { connectDB } from "@/lib/db";
import Transaction from "@/lib/models/transaction";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// PUT /api/transactions/[id]
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    context.params.id,
    data,
    { new: true }
  );

  return NextResponse.json(updatedTransaction);
}

// DELETE /api/transactions/[id]
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  await connectDB();
  await Transaction.findByIdAndDelete(context.params.id);

  return NextResponse.json({ message: "Transaction deleted" });
}
