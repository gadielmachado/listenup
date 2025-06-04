import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, User } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/my-lessons', icon: BookOpen, label: 'Minhas Lições' },
    { path: '/profile', icon: User, label: 'Perfil' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200/30 dark:border-gray-700/30 px-4 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <motion.button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="relative flex flex-col items-center py-2 px-3 rounded-ios-lg transition-all duration-200"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-600/10 rounded-ios-lg"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                  />
                )}

                {/* Icon with Animation */}
                <motion.div
                  className={`relative z-10 ${
                    isActive 
                      ? 'text-ios-blue' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -2 : 0
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                >
                  <Icon 
                    className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} 
                  />
                </motion.div>

                {/* Label with Fade Animation */}
                <motion.span
                  className={`text-xs font-medium mt-1 relative z-10 ${
                    isActive 
                      ? 'text-blue-600' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                    fontWeight: isActive ? 600 : 500
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>

                {/* Active Dot Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -top-1 left-1/2 w-1 h-1 bg-blue-600 rounded-full"
                    initial={{ scale: 0, x: "-50%" }}
                    animate={{ scale: 1, x: "-50%" }}
                    transition={{
                      type: "spring",
                      stiffness: 600,
                      damping: 25,
                      delay: 0.1
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Safe Area Bottom Padding for iOS */}
      <div className="h-safe-area-inset-bottom bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg"></div>
    </div>
  );
};

export default BottomNav;
