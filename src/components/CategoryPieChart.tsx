"use client";

import useSWR from "swr";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Custom colors for pie slices
const COLORS = [
  "#ffb6b9",
  "#8ecae6",
  "#ffc658",
  "#a0c4ff",
  "#bdb2ff",
  "#ffadad",
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CategoryPieChart() {
  const { data } = useSWR("/api/transactions", fetcher);
  if (!data) return <div>Loading chart...</div>;

  // Sum total spending per category
  const categorySums: { [category: string]: number } = {};
  data.forEach((tx: any) => {
    categorySums[tx.category] = (categorySums[tx.category] || 0) + tx.amount;
  });

  // Transform to recharts-compatible format
  const chartData = Object.keys(categorySums).map((category) => ({
    name: category,
    value: categorySums[category],
  }));

  return (
    <div className="w-full h-80 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 shadow-lg p-4 overflow-hidden">
      <h2 className="text-lg font-semibold text-purple-600 mb-3 text-center">
        Spending by Category 🥧
      </h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            data={chartData}
            outerRadius={80}
            innerRadius={50}
            label
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #eee",
              fontSize: "14px",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
