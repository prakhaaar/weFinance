"use client";

import useSWR from "swr";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TransactionList({
  onEdit,
}: {
  onEdit: (tx: any) => void;
}) {
  const { data, error, mutate } = useSWR("/api/transactions", fetcher);

  const handleDelete = async (id: string) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    mutate(); // Revalidate after deletion
  };

  if (error)
    return <div className="text-red-500">Failed to load transactions</div>;

  if (!data)
    return (
      <div className="space-y-2">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );

  return (
    <Card className="bg-white/60 backdrop-blur-lg border border-purple-200 p-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-bold text-purple-700 mb-4">
        All Transactions 🗂️
      </h3>
      <div className="space-y-2">
        {data.map((tx: any) => (
          <div
            key={tx._id}
            className="flex justify-between items-center bg-white rounded-xl p-3 shadow-sm hover:shadow transition"
          >
            {/* Left: transaction details */}
            <div>
              <div className="font-medium">{tx.description}</div>
              <div className="text-sm text-gray-500">
                {new Date(tx.date).toLocaleDateString()} — {tx.category}
              </div>
            </div>

            {/* Right: amount and action buttons */}
            <div className="flex items-center gap-2">
              <div className="font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                ₹{tx.amount}
              </div>
              <Button
                variant="outline"
                onClick={() => onEdit(tx)}
                className="rounded-full px-2 py-1 text-purple-600 border-purple-300 hover:bg-purple-50"
              >
                ✏️
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(tx._id)}
                className="rounded-full px-2 py-1"
              >
                ❌
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
