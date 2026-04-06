import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { monthlyData, categoryData } from '../data/mockData';

export default function Charts() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

      {/* Bar Chart */}
      <div className='bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700'>
        <h3 className='font-semibold text-gray-800 dark:text-gray-100 mb-4'>Monthly Overview</h3>
        <ResponsiveContainer width='100%' height={220}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#F1F5F9' />
            <XAxis dataKey='month' tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => `₹${v.toLocaleString('en-IN')}`} />
            <Legend />
            <Bar dataKey='income' name='Income' fill='#10B981' radius={[4, 4, 0, 0]} />
            <Bar dataKey='expenses' name='Expenses' fill='#EF4444' radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className='bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700'>
       <h3 className='font-semibold text-gray-800 dark:text-gray-100 mb-4'>Spending Breakdown</h3>
       <ResponsiveContainer width='100%' height={280}>
        <PieChart>
         <Pie
          data={categoryData}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='45%'
          outerRadius={90}
          innerRadius={40}
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          labelLine={false}
         >
         {categoryData.map((entry) => (
          <Cell key={entry.name} fill={entry.color} />
         ))}
        </Pie>
        <Tooltip formatter={(v) => `₹${v.toLocaleString('en-IN')}`} />
        <Legend />
        </PieChart>
       </ResponsiveContainer>
     </div>
    </div>
  );
}