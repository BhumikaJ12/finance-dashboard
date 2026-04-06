import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ArrowUpDown, Plus } from 'lucide-react';

export default function TransactionList() {
  const { transactions, filter, setFilter, search, setSearch, role, addTransaction } = useApp();
  const [sortDir, setSortDir] = useState('desc');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    description: '', amount: '', category: '', type: 'expense', date: ''
  });

  const filtered = transactions
    .filter(t => filter === 'all' || t.type === filter)
    .filter(t => t.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortDir === 'desc'
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
    );

  const handleAdd = () => {
    if (!form.description || !form.amount || !form.date) return;
    addTransaction({
      ...form,
      amount: form.type === 'expense'
        ? -Math.abs(Number(form.amount))
        : Number(form.amount)
    });
    setForm({ description: '', amount: '', category: '', type: 'expense', date: '' });
    setShowForm(false);
  };

  return (
    <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700'>

      {/* Header */}
      <div className='p-5 border-b border-gray-100 dark:border-gray-700 flex flex-wrap gap-3 items-center justify-between'>
        <h3 className='font-semibold text-gray-800 dark:text-gray-100'>Transactions</h3>
        <div className='flex flex-wrap gap-2 items-center'>

          {/* Search */}
          <div className='relative'>
            <Search size={14} className='absolute left-2.5 top-2.5 text-gray-400' />
            <input
              className='pl-8 pr-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 
                         rounded-lg bg-white dark:bg-gray-700 
                         text-gray-800 dark:text-gray-100
                         placeholder-gray-400 dark:placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Search...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter buttons */}
          {['all', 'income', 'expense'].map(f => (
            <button key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-sm rounded-lg capitalize ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              {f}
            </button>
          ))}

          {/* Sort */}
          <button
            onClick={() => setSortDir(d => d === 'desc' ? 'asc' : 'desc')}
            className='p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          >
            <ArrowUpDown size={14} />
          </button>

          {/* Admin only — Add button */}
          {role === 'admin' && (
            <button
              onClick={() => setShowForm(s => !s)}
              className='flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg'
            >
              <Plus size={14} /> Add
            </button>
          )}

        </div>
      </div>

      {/* Add form — admin only */}
      {showForm && role === 'admin' && (
        <div className='p-4 bg-blue-50 dark:bg-gray-700 border-b border-blue-100 dark:border-gray-600 flex flex-wrap gap-2'>
          <input
            className='border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm 
                       flex-1 min-w-32 bg-white dark:bg-gray-800 
                       text-gray-800 dark:text-gray-100 placeholder-gray-400'
            placeholder='Description'
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
          <input
            type='number'
            className='border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm 
                       w-28 bg-white dark:bg-gray-800 
                       text-gray-800 dark:text-gray-100 placeholder-gray-400'
            placeholder='Amount'
            value={form.amount}
            onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
          />
          <input
            className='border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm 
                       w-28 bg-white dark:bg-gray-800 
                       text-gray-800 dark:text-gray-100 placeholder-gray-400'
            placeholder='Category'
            value={form.category}
            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
          />
          <select
            className='border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm 
                       bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100'
            value={form.type}
            onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
          >
            <option value='expense'>Expense</option>
            <option value='income'>Income</option>
          </select>
          <input
            type='date'
            className='border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm 
                       bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100'
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
          />
          <button
            onClick={handleAdd}
            className='px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors'
          >
            Save
          </button>
        </div>
      )}

      {/* Table */}
      <div className='overflow-x-auto'>
        {filtered.length === 0 ? (
          <p className='text-center text-gray-400 dark:text-gray-500 py-12'>
            No transactions found.
          </p>
        ) : (
          <table className='w-full text-sm'>
            <thead className='bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 uppercase text-xs'>
              <tr>
                <th className='px-5 py-3 text-left'>Date</th>
                <th className='px-5 py-3 text-left'>Description</th>
                <th className='px-5 py-3 text-left'>Category</th>
                <th className='px-5 py-3 text-right'>Amount</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-50 dark:divide-gray-700'>
              {filtered.map(t => (
                <tr key={t.id} className='hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'>
                  <td className='px-5 py-3 text-gray-400 dark:text-gray-500'>{t.date}</td>
                  <td className='px-5 py-3 font-medium text-gray-700 dark:text-gray-200'>{t.description}</td>
                  <td className='px-5 py-3'>
                    <span className='px-2 py-0.5 bg-gray-100 dark:bg-gray-600 rounded-full text-gray-600 dark:text-gray-300 text-xs'>
                      {t.category}
                    </span>
                  </td>
                  <td className={`px-5 py-3 text-right font-semibold ${
                    t.type === 'income' ? 'text-emerald-600' : 'text-red-500'
                  }`}>
                    {t.type === 'income' ? '+' : '-'}₹{Math.abs(t.amount).toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}