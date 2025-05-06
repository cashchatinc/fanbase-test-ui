import { useUser } from 'contexts/UserContext';
import { motion } from 'framer-motion';
import {
  Home,
  Compass,
  Bell,
  MessageSquare,
  User,
  Bookmark,
  Settings,
  PlusCircle,
} from 'lucide-react';

interface SidebarProps {
  activePage: 'home' | 'explore' | 'notifications' | 'messages' | 'profile';
  setActivePage: (page: 'home' | 'explore' | 'notifications' | 'messages' | 'profile') => void;
}

export const Sidebar = ({ activePage, setActivePage }: SidebarProps) => {
  const { currentUser } = useUser();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="h-screen sticky top-0 py-8 pr-4 overflow-y-auto scrollbar-thin">
      <div className="flex flex-col h-full justify-between">
        <div className="space-y-2">
          {/* Navigation items */}
          {navItems.map(item => (
            <button
              className={`flex items-center w-full px-4 py-3 rounded-full text-left transition-colors
                         ${
                           activePage === item.id
                             ? 'font-semibold text-primary-600 bg-primary-50 dark:bg-gray-800 dark:text-primary-400'
                             : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                         }`}
              key={item.id}
              onClick={() => setActivePage(item.id as any)}
            >
              <item.icon
                className={`mr-4 ${
                  activePage === item.id
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
                size={24}
              />
              <span className="text-lg">{item.label}</span>
            </button>
          ))}

          {/* Bookmarks */}
          <button className="flex items-center w-full px-4 py-3 rounded-full text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
            <Bookmark className="mr-4 text-gray-500 dark:text-gray-400" size={24} />
            <span className="text-lg">Bookmarks</span>
          </button>

          {/* Settings */}
          <button className="flex items-center w-full px-4 py-3 rounded-full text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
            <Settings className="mr-4 text-gray-500 dark:text-gray-400" size={24} />
            <span className="text-lg">Settings</span>
          </button>
        </div>

        {/* Post button */}
        <motion.button
          className="mt-4 w-full bg-primary-500 hover:bg-primary-600 text-white rounded-full py-3 px-8 font-semibold flex items-center justify-center shadow-md transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusCircle className="mr-2" size={20} />
          <span>New Post</span>
        </motion.button>

        {/* User profile */}
        {currentUser && (
          <div className="mt-auto pt-4">
            <div className="flex items-center p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
              <img
                alt={currentUser.displayName}
                className="h-10 w-10 rounded-full object-cover"
                src={currentUser.avatarUrl}
              />
              <div className="ml-3">
                <p className="font-medium text-gray-900 dark:text-white">
                  {currentUser.displayName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">@{currentUser.username}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
