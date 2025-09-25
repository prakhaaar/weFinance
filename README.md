💰 weFinance – Personal Finance Visualizer

Welcome to weFinance! 🚀
A sleek, full-stack web app that helps you track expenses, set budgets, and visualize your spending habits with interactive, beautiful charts. Built with Next.js, MongoDB, Tailwind CSS, shadcn/ui, and Recharts, it’s designed to make managing your money simple, fun, and visual. 📊✨

🌐 Live Demo

👉 Check it out on Vercel(https://we-finance-bay.vercel.app/)

🛠️ Tech Stack

Frontend: Next.js 14 (App Router), React, Tailwind CSS, shadcn/ui

Backend: API Routes (Next.js), MongoDB, Mongoose

Charts: Recharts

UI Components: shadcn/ui, Tailwind

Notifications: Sonner

Deployment: Vercel

✨ Features
Stage 1: Transaction Tracking 💸

Add, edit, and delete transactions effortlessly

View all transactions with amount, date, and category

Monthly bar chart to visualize spending trends

Built-in form validation and error handling

Stage 2: Categories 📂

Predefined categories (Food, Rent, Utilities…)

Interactive pie chart showing category-wise breakdown

Dashboard cards for total spend and recent activity

Stage 3: Budgeting 💡

Set monthly budgets per category

app/
api/
  transactions/
  budgets/
page.tsx

components/
  TransactionForm.tsx
  TransactionList.tsx
  CategoryPieChart.tsx
  BudgetForm.tsx
  BudgetVsActualChart.tsx
  SpendingInsights.tsx
  SummaryCards.tsx

lib/
  db.ts        # Database connection
models/
  transaction.ts
  budget.ts

Future Enhancements

Export transaction data as CSV

Support for recurring transactions

Dark/Light theme toggle

Multi-month analytics and insights


👨‍💻 Author

Made with ❤️ by Prakhar Mishra

GitHub: @prakhaaar

LinkedIn: Prakhar Mishra

Email: mprakhar07@gmail.com

📜 License

MIT License – free to use, modify, and distribute.

Compare actual spending vs budget with bar charts

Smart insights to help you avoid overspending
