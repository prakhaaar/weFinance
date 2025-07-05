"use client";

import { useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import CategoryPieChart from "@/components/CategoryPieChart";
import SummaryCards from "@/components/SummaryCards";
import BudgetForm from "@/components/BudgetForm";
import BudgetVsActualChart from "@/components/BudgetVsActualChart";
import SpendingInsights from "@/components/SpendingInsights";

export default function Page() {
  const [editTx, setEditTx] = useState<any>(null); // holds transaction being edited

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 p-6">
      {/* App header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-purple-700 drop-shadow">
          Finance Visualizer 💜
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Your money, beautifully visualized ✨
        </p>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto space-y-10">
        <TransactionForm editTx={editTx} onClearEdit={() => setEditTx(null)} />
        <SummaryCards />
        <CategoryPieChart />
        <BudgetForm />
        <BudgetVsActualChart />
        <SpendingInsights />
        <TransactionList onEdit={setEditTx} />
      </div>
    </div>
  );
}
