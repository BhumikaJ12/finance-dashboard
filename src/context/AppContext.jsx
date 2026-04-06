import { createContext, useContext, useState, useEffect } from 'react';
import { transactions as initialTransactions } from '../data/mockData';

// 1. Create the context (like creating an empty box)
const AppContext = createContext();

// 2. Create the Provider (the box filled with data)
export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
  try {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  } catch {
    return initialTransactions;
  }
  });
  const [role, setRole] = useState('viewer');     // 'viewer' or 'admin'
  const [filter, setFilter] = useState('all');    // 'all', 'income', 'expense'
  const [search, setSearch] = useState('');

  useEffect(() => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Derived values (calculated from state, not stored separately)
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  const addTransaction = (newTx) => {
    setTransactions(prev => [
      { ...newTx, id: Date.now() },
      ...prev
    ]);
  };

  return (
    <AppContext.Provider value={{
      transactions, setTransactions,
      role, setRole,
      filter, setFilter,
      search, setSearch,
      totalIncome, totalExpenses, balance,
      addTransaction,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// 3. Custom hook — makes it easy to use the context
export function useApp() {
  return useContext(AppContext);
}