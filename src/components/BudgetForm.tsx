"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";

export default function BudgetForm() {
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [month, setMonth] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category || !month) {
      toast.error("Please fill all fields");
      return;
    }

    const res = await fetch("/api/budgets", {
      method: "POST",
      body: JSON.stringify({ amount, category, month }),
    });

    if (res.ok) {
      toast.success("Budget set successfully 💪");
      setAmount(undefined);
      setCategory("Food");
      setMonth("");
      mutate("/api/budgets"); // Refresh budget list
    } else {
      toast.error("Failed to set budget");
    }
  };

  return (
    <Card className="bg-white/30 backdrop-blur-md border border-purple-200 shadow-xl p-6 rounded-2xl my-6">
      <h2 className="text-xl font-bold text-purple-700 text-center mb-4">
        Set Monthly Budget 💸
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Selector */}
        <div>
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full bg-white border-gray-300 shadow-sm rounded-md">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white border rounded-md shadow-lg">
              <SelectItem value="Food">🍕 Food</SelectItem>
              <SelectItem value="Rent">🏠 Rent</SelectItem>
              <SelectItem value="Entertainment">🎬 Entertainment</SelectItem>
              <SelectItem value="Shopping">🛍️ Shopping</SelectItem>
              <SelectItem value="Utilities">💡 Utilities</SelectItem>
              <SelectItem value="Other">✨ Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amount Input */}
        <div>
          <Label>Amount (₹)</Label>
          <Input
            type="number"
            value={amount ?? ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Budget amount"
          />
        </div>

        {/* Month Picker */}
        <div>
          <Label>Month</Label>
          <Input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white font-semibold rounded-full shadow-md transition-all"
        >
          Set Budget
        </Button>
      </form>
    </Card>
  );
}
