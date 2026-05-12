import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-3xl absolute -top-1/4 -right-1/4" />
        <div className="w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl absolute -bottom-1/4 -left-1/4" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-blue-600/20">
            X
          </div>
          <span className="text-3xl font-bold tracking-tight text-white">Crypto-X</span>
        </div>
        
        <Outlet />
      </div>
    </div>
  );
}
