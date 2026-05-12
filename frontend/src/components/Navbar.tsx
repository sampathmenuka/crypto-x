import { useAuthStore } from '../store/authStore';
import { User } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuthStore();

  return (
    <header className="h-16 border-b border-gray-800 bg-gray-950 flex items-center justify-between px-6">
      <div className="flex-1">
        {/* Can put global search or breadcrumbs here */}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-900 rounded-full pl-2 pr-4 py-1 border border-gray-800">
          <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center">
            <User size={16} />
          </div>
          <span className="text-sm font-medium">{user?.username}</span>
        </div>
      </div>
    </header>
  );
}
