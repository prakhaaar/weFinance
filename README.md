# 💰 weFinance – Personal Finance Visualizer

**weFinance** is a full-stack web app that helps users **track expenses, set monthly budgets**, and **visualize spending habits** with beautiful, interactive charts. Built using **Next.js**, **MongoDB**, **Tailwind CSS**, **shadcn/ui**, and **Recharts**.

---

## 🚀 Live Demo

👉 [View on Vercel](https://your-vercel-url.vercel.app)

---

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, shadcn/ui
- **Backend**: API Routes (Next.js), MongoDB, Mongoose
- **Charts**: Recharts
- **UI Components**: shadcn/ui, Tailwind
- **Notifications**: Sonner
- **Deployment**: Vercel

---

## ✨ Features

### ✅ Stage 1: Transaction Tracking

- Add/Edit/Delete transactions
- View transaction list with amount, date, and category
- Monthly bar chart to track expenses
- Basic form validation & error states

### ✅ Stage 2: Categories

- Predefined categories (Food, Rent, Utilities, etc.)
- Pie chart showing category-wise expense breakdown
- Dashboard cards for total spend and recent history

### ✅ Stage 3: Budgeting

- Set monthly budgets per category
- Compare actual spend vs budget with bar charts
- Smart insights on overspending

---

## 📸 Screenshots

> _Add screenshots of the dashboard, charts, and budget forms here if available._

---

## 📂 Folder Structure

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
db.ts # DB connection
models/
transaction.ts
budget.ts

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/prakhaaar/weFinance.git
cd weFinance
2. Install dependencies
bash
Copy
Edit
npm install
3. Create .env.local
env
Copy
Edit
MONGODB_URI=your-mongodb-connection-string
Make sure .env.local is listed in .gitignore

4. Run locally
bash
Copy
Edit
npm run dev
App will be live at: http://localhost:3000

🔍 Future Enhancements
Export data as CSV

Recurring transaction support

Theme switcher (dark/light mode)

Multi-month analytics

👨‍💻 Author
Prakhar Mishra

GitHub: @prakhaaar

LinkedIn: Prakhar Mishra

Email: mprakhar07@gmail.com

📜 License
MIT License — free to use, modify, and distribute.

🏁 Submission Stage
✅ Stage 3 (Final) – All features implemented, live, and production-ready.
```
