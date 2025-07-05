"use client";

import useSWR from "swr";
import { Card } from "@/components/ui/card";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SpendingInsights() {
  const { data: transactions } = useSWR("/api/transactions", fetcher);
  const { data: budgets } = useSWR("/api/budgets", fetcher);

  if (!transactions || !budgets) return <div>Loading insights...</div>;

  const month = new Date().toISOString().slice(0, 7); // Current month in YYYY-MM
  const expenses: { [category: string]: number } = {};

  // Sum expenses by category for the current month
  transactions.forEach((tx: any) => {
    const txMonth = tx.date.slice(0, 7);
    if (txMonth === month) {
      expenses[tx.category] = (expenses[tx.category] || 0) + tx.amount;
    }
  });

  // Find categories that went over budget
  const overBudget: string[] = [];
  budgets.forEach((b: any) => {
    if (b.month === month && expenses[b.category] > b.amount) {
      overBudget.push(b.category);
    }
  });

  return (
    <Card className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 shadow-md">
      {overBudget.length === 0 ? (
        <div className="text-green-600 font-medium text-center">
          You're under budget this month 🎉
        </div>
      ) : (
        <div className="text-red-600 font-medium text-center">
          You’ve overspent in: {overBudget.join(", ")} 🚨
        </div>
      )}
    </Card>
  );
}
