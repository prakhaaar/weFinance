import { connectDB } from "@/lib/db";
import Transaction from "@/lib/models/transaction";
import { NextResponse } from "next/server";

// PUT /api/transactions/:id – update a transaction by ID
export async function PUT(req: Request, context: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    context.params.id,
    data,
    { new: true } // return the updated document
  );

  return NextResponse.json(updatedTransaction);
}

// DELETE /api/transactions/:id – delete a transaction by ID
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  await connectDB();
  await Transaction.findByIdAndDelete(context.params.id);

  return NextResponse.json({ message: "Transaction deleted" });
}
