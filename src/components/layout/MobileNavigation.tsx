import { useNotifications } from 'contexts/NotificationContext';
import { Home, Compass, Bell, MessageSquare, User } from 'lucide-react';

interface MobileNavigationProps {
  activePage: 'home' | 'explore' | 'notifications' | 'messages' | 'profile';
  setActivePage: (page: 'home' | 'explore' | 'notifications' | 'messages' | 'profile') => void;
}

export const MobileNavigation = ({ activePage, setActivePage }: MobileNavigationProps) => {
  const { unreadCount } = useNotifications();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'explore', icon: Compass, label: 'Explore' },
    { id: 'notifications', icon: Bell, label: 'Notifications', badge: unreadCount },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map(item => (
          <button
            className={`flex flex-col items-center justify-center py-3 px-2 w-full
                     ${
                       activePage === item.id
                         ? 'text-primary-600 dark:text-primary-400'
                         : 'text-gray-500 dark:text-gray-400'
                     }`}
            key={item.id}
            onClick={() => setActivePage(item.id as any)}
          >
            <div className="relative">
              <item.icon size={24} />
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {item.badge > 9 ? '9+' : item.badge}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
