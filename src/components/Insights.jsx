import { useApp } from '../context/AppContext';
import { categoryData, monthlyData } from '../data/mockData';
import { AlertCircle, TrendingUp, Award } from 'lucide-react';

export default function Insights() {
  const { totalIncome, totalExpenses } = useApp();
  const topCategory = [...categoryData].sort((a, b) => b.value - a.value)[0];
  const savingsRate = ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1);
  const lastTwo = monthlyData.slice(-2);
  const expenseDiff = lastTwo[1]?.expenses - lastTwo[0]?.expenses;

  const cards = [
    {
      icon: Award, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/30',
      title: 'Top Spending Category',
      value: topCategory.name,
      sub: `₹${topCategory.value.toLocaleString('en-IN')} spent`
    },
    {
      icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/30',
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      sub: 'of total income saved'
    },
    {
      icon: AlertCircle,
      color: expenseDiff > 0 ? 'text-red-500' : 'text-green-500',
      bg: expenseDiff > 0 ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30',
      title: 'Month-over-Month Expenses',
      value: `${expenseDiff > 0 ? '+' : ''}₹${Math.abs(expenseDiff).toLocaleString('en-IN')}`,
      sub: expenseDiff > 0 ? 'more than last month' : 'less than last month'
    }
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.title} className='bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700'>
            <div className={`inline-flex p-2 rounded-xl ${card.bg} mb-3`}>
              <Icon className={card.color} size={18} />
            </div>
            <p className='text-xs text-gray-400 dark:text-gray-500 mb-1'>{card.title}</p>
            <p className='text-xl font-bold text-gray-800 dark:text-gray-100'>{card.value}</p>
            <p className='text-xs text-gray-400 dark:text-gray-500 mt-0.5'>{card.sub}</p>
          </div>
        );
      })}
    </div>
  );
}