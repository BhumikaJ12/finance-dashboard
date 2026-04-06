# 💰 FinanceIQ — Finance Dashboard UI

A personal finance dashboard built as part of a Frontend Developer Intern assignment.
Allows users to track income, expenses, and understand spending patterns through
an interactive and responsive interface.

## 🔗 Links
- **Live Demo:** https://finance-dashboard-amber-sigma.vercel.app
- **Repository:** https://github.com/bhumikaj12/finance-dashboard


---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + Vite | Frontend framework and build tool |
| Tailwind CSS v3 | Utility-first styling |
| Recharts | Charts and data visualizations |
| Lucide React | Icons |
| React Context API | Global state management |
| localStorage | Client-side data persistence |

---

## ✨ Features

### Core
- **Summary Cards** — Total Balance, Income, and Expenses at a glance
- **Bar Chart** — Monthly income vs expenses comparison
- **Donut Chart** — Spending breakdown by category
- **Transactions Table** — Full list with search, filter by type, and sort by date
- **Insights Section** — Top spending category, savings rate, month-over-month comparison

### Role Based UI
- **Viewer** — Can only view data, no edit access
- **Admin** — Can add new transactions via an inline form
- Switch roles using the dropdown in the top navigation bar

### Extras
- 🌙 **Dark Mode** — Toggle between light and dark theme
- 💾 **Data Persistence** — Transactions saved to localStorage, survive page refresh
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop

---

## 🚀 Setup

Make sure you have Node.js installed. Then run:
```bash
git clone [your repo link]
cd finance_dashboard
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🏗 Project Structure

src/
components/
SummaryCards.jsx      # Balance, income, expense cards
Charts.jsx            # Bar chart and donut chart
TransactionList.jsx   # Table with search, filter, sort, add form
Insights.jsx          # Derived insights from transaction data
RoleSwitcher.jsx      # Viewer / Admin role toggle
context/
AppContext.jsx         # Global state — transactions, role, filters
data/
mockData.js            # Static mock transactions and chart data
App.jsx                  # Root component, layout, dark mode
main.jsx                 # Entry point, wraps app with AppProvider

---

## 🧠 Approach

**State Management** — All shared state lives in a single React Context
(AppContext). Components read only what they need via the useApp() custom hook.
Local UI state (sort direction, form visibility) stays inside the component
that owns it.

**Role Based UI** — Roles are simulated on the frontend using a state variable.
Switching to Admin reveals the Add Transaction button and form. No backend or
authentication is involved — this is a UI demonstration.

**Data** — All data is static and defined in mockData.js. The Insights section
derives its values (top category, savings rate, monthly diff) automatically
from the transactions array — nothing is hardcoded.

**Responsiveness** — Tailwind's responsive prefixes (md:, lg:) handle layout
changes across screen sizes without any media query files.

---

## 📋 Assumptions

- Currency is Indian Rupee (₹)
- Mock data covers January to March 2024
- Roles are for UI demonstration only — no authentication implemented
- Charts use static monthlyData and categoryData from mockData.js