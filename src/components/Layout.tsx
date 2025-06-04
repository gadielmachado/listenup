import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Main Content */}
      <main className="pb-20 relative z-0">
        <div className="max-w-md mx-auto min-h-screen bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm">
          <Outlet />
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Layout;
