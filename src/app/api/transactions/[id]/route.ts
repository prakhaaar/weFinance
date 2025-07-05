import { connectDB } from "@/lib/db";
import Transaction from "@/lib/models/transaction";
import { NextResponse } from "next/server";

// Define the Params interface
interface Params {
  id: string;
}

// PUT /api/transactions/:id – update a transaction by ID
export async function PUT(req: Request, { params }: { params: Params }) {
  await connectDB();
  const data = await req.json();

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    params.id,
    data,
    { new: true } // return the updated document
  );

  return NextResponse.json(updatedTransaction);
}

// DELETE /api/transactions/:id – delete a transaction by ID
export async function DELETE(req: Request, { params }: { params: Params }) {
  await connectDB();
  await Transaction.findByIdAndDelete(params.id);

  return NextResponse.json({ message: "Transaction deleted" });
}
