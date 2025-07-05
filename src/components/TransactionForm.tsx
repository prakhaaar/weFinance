"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function TransactionForm({ editTx = null, onClearEdit }: any) {
  const [amount, setAmount] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Food");

  // Populate form with data if editing an existing transaction
  useEffect(() => {
    if (editTx) {
      setAmount(editTx.amount);
      setDescription(editTx.description);
      setDate(editTx.date.slice(0, 10));
      setCategory(editTx.category);
    }
  }, [editTx]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation check
    if (!amount || !description || !date || !category) {
      toast.error("Please fill all fields");
      return;
    }

    const payload = { amount, description, date, category };
    let res;

    // Decide whether to add or update
    if (editTx) {
      res = await fetch(`/api/transactions/${editTx._id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      res = await fetch("/api/transactions", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    // Handle response
    if (res.ok) {
      toast.success(
        editTx
          ? "Transaction updated successfully"
          : "Transaction added successfully"
      );

      // Reset form
      setAmount("");
      setDescription("");
      setDate("");
      setCategory("Food");

      mutate("/api/transactions"); // Refresh list
      onClearEdit && onClearEdit();
    } else {
      toast.error("Error saving transaction");
    }
  };

  return (
    <Card className="p-6 bg-white/50 backdrop-blur-md shadow-xl rounded-3xl border border-purple-300 space-y-6 relative overflow-visible">
      <h2 className="text-2xl font-bold text-center text-purple-700">
        {editTx ? "Edit Transaction" : "Add New Transaction"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Category Selector */}
        <div className="space-y-2 relative z-[9999]">
          <Label className="font-semibold text-purple-700">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2 shadow-sm text-base font-medium hover:shadow-md focus:ring-2 focus:ring-purple-400 transition">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg border border-gray-300 rounded-xl z-[9999]">
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Rent">Rent</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Utilities">Utilities</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label className="font-semibold text-purple-700">Amount (₹)</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="e.g., 1200"
            className="w-full rounded-xl border-gray-300 px-4 py-2 shadow focus:ring-2 focus:ring-purple-400 transition"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className="font-semibold text-purple-700">Description</Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Dinner with friends"
            className="w-full rounded-xl border-gray-300 px-4 py-2 shadow focus:ring-2 focus:ring-purple-400 transition"
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label className="font-semibold text-purple-700">Date</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border-gray-300 px-4 py-2 shadow focus:ring-2 focus:ring-purple-400 transition"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full py-2 hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
        >
          {editTx ? "Update Transaction" : "Add Transaction"}
        </Button>

        {/* Cancel Edit */}
        {editTx && (
          <Button
            type="button"
            variant="secondary"
            className="w-full mt-2"
            onClick={onClearEdit}
          >
            Cancel Edit
          </Button>
        )}
      </form>
    </Card>
  );
}
