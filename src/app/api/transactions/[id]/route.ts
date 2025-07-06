import { connectDB } from "@/lib/db";
import Transaction from "@/lib/models/transaction";
import { NextResponse } from "next/server";

interface Params {
  id: string;
}

// PUT /api/transactions/:id — update
export async function PUT(req: Request, { params }: { params: Params }) {
  try {
    await connectDB();
    const body = await req.json();

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );

    if (!updatedTransaction) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTransaction);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
  }
}

// DELETE /api/transactions/:id — delete
export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    await connectDB();

    const deleted = await Transaction.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Transaction deleted" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 });
  }
}
