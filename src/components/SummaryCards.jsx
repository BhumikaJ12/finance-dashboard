import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Card({ title, amount, icon: Icon, color, bg }) {
  return (
    <div className={`${bg} dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700`}>
      <div className='flex justify-between items-start'>
        <div>
          <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>{title}</p>
          <p className={`text-2xl font-bold ${color}`}>
            ₹{amount.toLocaleString('en-IN')}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${bg === 'bg-white' ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white/20'}`}>
          <Icon className={color} size={22} />
        </div>
      </div>
    </div>
  );
}

export default function SummaryCards() {
  const { balance, totalIncome, totalExpenses } = useApp();
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      <Card title='Total Balance' amount={balance}
        icon={Wallet} color='text-blue-600' bg='bg-white' />
      <Card title='Total Income' amount={totalIncome}
        icon={TrendingUp} color='text-emerald-600' bg='bg-white' />
      <Card title='Total Expenses' amount={totalExpenses}
        icon={TrendingDown} color='text-red-500' bg='bg-white' />
    </div>
  );
}