import { NotificationsDropdown } from 'components/notifications';
import { useNotifications, useTheme, useUser } from 'contexts';
import { Bell, Menu, Moon, Search, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser } = useUser();
  const { unreadCount } = useNotifications();
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Add scroll effect to header
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNotificationsDropdown = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header
      className={`sticky top-0 z-10 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm dark:bg-gray-900/90' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-2 sm:px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 md:ml-0">
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                connect
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              type="button"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Search */}
          <div className="hidden md:block flex-1 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={18} />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 rounded-full border border-gray-300 bg-gray-50 
                       text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500 
                       dark:bg-gray-800 dark:border-gray-700 dark:text-white sm:text-sm"
                placeholder="Search on Connect..."
                type="text"
              />
            </div>
          </div>

          {/* Right navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                aria-label="Notifications"
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                        dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                onClick={toggleNotificationsDropdown}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <NotificationsDropdown onClose={() => setShowNotifications(false)} />
              )}
            </div>

            {/* Theme toggle */}
            <button
              aria-label="Toggle theme"
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                      dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User profile */}
            {currentUser && (
              <div className="flex items-center">
                <img
                  alt={currentUser.displayName}
                  className="h-8 w-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                  src={currentUser.avatarUrl}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
