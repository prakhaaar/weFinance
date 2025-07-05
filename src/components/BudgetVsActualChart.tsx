"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BudgetVsActualChart() {
  const { data: transactions } = useSWR("/api/transactions", fetcher);
  const { data: budgets } = useSWR("/api/budgets", fetcher);

  if (!transactions || !budgets) return <div>Loading chart...</div>;

  const month = new Date().toISOString().slice(0, 7); // Current month (e.g., "2025-07")

  // Aggregate actual spending by category for the current month
  const expenses: { [category: string]: number } = {};
  transactions.forEach((tx: any) => {
    const txMonth = tx.date.slice(0, 7);
    if (txMonth === month) {
      expenses[tx.category] = (expenses[tx.category] || 0) + tx.amount;
    }
  });

  // Collect all unique categories from both budgets and transactions
  const categories = Array.from(
    new Set([
      ...transactions.map((t: any) => t.category),
      ...budgets.map((b: any) => b.category),
    ])
  );

  // Build chart-friendly data
  const chartData = categories.map((cat) => {
    const budgetEntry = budgets.find(
      (b: any) => b.category === cat && b.month === month
    );
    return {
      category: cat,
      Budget: budgetEntry ? budgetEntry.amount : 0,
      Actual: expenses[cat] || 0,
    };
  });

  return (
    <div className="w-full h-80 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg p-6">
      <h2 className="text-lg font-semibold text-purple-600 mb-4 text-center">
        Budget vs Actual 💸
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="category"
            tick={{ fill: "#8884d8", fontSize: 12, fontWeight: 500 }}
          />
          <YAxis tick={{ fill: "#8884d8", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #eee",
              fontSize: "14px",
            }}
          />
          <Legend wrapperStyle={{ paddingTop: "8px" }} />
          <Bar dataKey="Budget" fill="#ffb6b9" radius={[10, 10, 0, 0]} />
          <Bar dataKey="Actual" fill="#8ecae6" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
