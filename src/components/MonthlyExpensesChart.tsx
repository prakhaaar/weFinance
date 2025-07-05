"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useSWR from "swr";

// Simple fetcher for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MonthlyExpensesChart() {
  const { data, error } = useSWR("/api/transactions", fetcher);

  if (error) return <div className="text-red-500">Failed to load chart</div>;
  if (!data) return <div>Loading chart...</div>;

  // Aggregate monthly totals
  const monthlyData: { [month: string]: number } = {};
  data.forEach((tx: any) => {
    const date = new Date(tx.date);
    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    monthlyData[month] = (monthlyData[month] || 0) + tx.amount;
  });

  // Format for Recharts
  const chartData = Object.keys(monthlyData).map((month) => ({
    month,
    amount: monthlyData[month],
  }));

  return (
    <div className="w-full h-80 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg p-4">
      <h2 className="text-lg font-semibold text-purple-600 mb-3 text-center">
        Monthly Expenses 📅
      </h2>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="month"
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
          <Bar dataKey="amount" fill="#8ecae6" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
