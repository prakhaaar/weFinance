"use client";

import useSWR from "swr";
import { Card } from "@/components/ui/card";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SummaryCards() {
  const { data } = useSWR("/api/transactions", fetcher);
  if (!data) return <div>Loading summary...</div>;

  const total = data.reduce((acc: number, tx: any) => acc + tx.amount, 0);

  return (
    <Card className="p-4 flex justify-between rounded-lg bg-gradient-to-r from-indigo-50 to-violet-50 shadow-md">
      <div className="font-medium text-purple-700">Total Expenses</div>
      <div className="font-bold text-purple-800">₹{total}</div>
    </Card>
  );
}
