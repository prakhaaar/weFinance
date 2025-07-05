import { connectDB } from "@/lib/db";
import Transaction from "@/lib/models/transaction";
import { NextResponse } from "next/server";

// Define expected URL param structure
interface Params {
  id: string;
}

// PUT /api/transactions/:id – update a transaction by ID
export async function PUT(req: Request, { params }: { params: Params }) {
  try {
    await connectDB();
    const data = await req.json();

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      params.id,
      data,
      { new: true } // returns updated document
    );

    if (!updatedTransaction) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTransaction, { status: 200 });
  } catch (error) {
    console.error("PUT /api/transactions/:id error:", error);
    return NextResponse.json(
      { error: "Failed to update transaction" },
      { status: 500 }
    );
  }
}

// DELETE /api/transactions/:id – delete a transaction by ID
export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    await connectDB();

    const deleted = await Transaction.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Transaction deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/transactions/:id error:", error);
    return NextResponse.json(
      { error: "Failed to delete transaction" },
      { status: 500 }
    );
  }
}
