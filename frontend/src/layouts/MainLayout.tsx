import React from 'react'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar will go here */}
      <aside className="w-64 bg-gray-800">
        {/* Sidebar content */}
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Navbar will go here */}
        <nav className="bg-gray-800 border-b border-gray-700">
          {/* Navbar content */}
        </nav>

        {/* Page content */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default MainLayout
