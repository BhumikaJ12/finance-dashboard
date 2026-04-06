import { useApp } from '../context/AppContext';

export default function RoleSwitcher() {
  const { role, setRole } = useApp();

  return (
    <div className='flex items-center gap-2'>
      <span className='text-sm text-gray-500'>Role:</span>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className='text-sm border rounded-lg px-3 py-1.5 bg-white shadow-sm'
      >
        <option value='viewer'>👁 Viewer</option>
        <option value='admin'>🔑 Admin</option>
      </select>
      {role === 'admin' && (
        <span className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full'>
          Admin Mode
        </span>
      )}
    </div>
  );
}