import { useState } from 'react';
import SummaryCards from './components/SummaryCards';
import Charts from './components/Charts';
import TransactionList from './components/TransactionList';
import Insights from './components/Insights';
import RoleSwitcher from './components/RoleSwitcher';

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? 'dark' : ''}>
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>

        {/* Top Navigation Bar */}
        <header className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center'>

            {/* Left — Logo */}
            <div>
              <h1 className='text-lg font-bold text-gray-800 dark:text-gray-100'>💰 FinanceIQ</h1>
              <p className='text-xs text-gray-400 dark:text-gray-500'>Personal Finance Dashboard</p>
            </div>

            {/* Right — Dark mode toggle + Role switcher */}
            <div className='flex items-center gap-3'>
              <button
                onClick={() => setDark(d => !d)}
                className='p-2 rounded-lg bg-gray-100 dark:bg-gray-700 
                           text-gray-600 dark:text-gray-300 
                           hover:bg-gray-200 dark:hover:bg-gray-600 
                           transition-colors'
              >
                {dark ? '☀️' : '🌙'}
              </button>
              <RoleSwitcher />
            </div>

          </div>
        </header>

        {/* Main Content */}
        <main className='max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6'>

          {/* Summary Cards */}
          <section>
            <h2 className='text-sm font-medium text-gray-400 dark:text-gray-500 uppercase mb-3'>
              Overview
            </h2>
            <SummaryCards />
          </section>

          {/* Charts */}
          <section>
            <h2 className='text-sm font-medium text-gray-400 dark:text-gray-500 uppercase mb-3'>
              Visualizations
            </h2>
            <Charts />
          </section>

          {/* Insights */}
          <section>
            <h2 className='text-sm font-medium text-gray-400 dark:text-gray-500 uppercase mb-3'>
              Insights
            </h2>
            <Insights />
          </section>

          {/* Transactions */}
          <section>
            <h2 className='text-sm font-medium text-gray-400 dark:text-gray-500 uppercase mb-3'>
              Transactions
            </h2>
            <TransactionList />
          </section>

        </main>
      </div>
    </div>
  );
}