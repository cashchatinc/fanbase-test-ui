import { useNotifications } from 'contexts';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { formatDate } from 'utils/formatDate';

interface NotificationsDropdownProps {
  onClose: () => void;
}

export const NotificationsDropdown = ({ onClose }: NotificationsDropdownProps) => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-50 border border-gray-200 dark:border-gray-700"
      exit={{ opacity: 0, y: -10 }}
      initial={{ opacity: 0, y: -10 }}
      ref={dropdownRef}
      transition={{ duration: 0.2 }}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-medium text-gray-900 dark:text-white">Notifications</h3>
        <button
          className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
          onClick={markAllAsRead}
        >
          Mark all as read
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {notifications.slice(0, 5).map(notification => (
              <div
                className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  !notification.read ? 'bg-primary-50 dark:bg-gray-800/50' : ''
                }`}
                key={notification.id}
                onClick={() => {
                  if (!notification.read) {
                    markAsRead(notification.id);
                  }
                }}
              >
                <div className="flex items-start space-x-3">
                  {notification.actor && (
                    <img
                      alt={notification.actor.displayName}
                      className="h-8 w-8 rounded-full object-cover"
                      src={notification.actor.avatarUrl}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {notification.message}
                      {!notification.read && (
                        <span className="inline-block h-2 w-2 rounded-full bg-primary-500 ml-1"></span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatDate(notification.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-gray-500 dark:text-gray-400">
            <p>No notifications yet</p>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
        <button
          className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
          onClick={onClose}
        >
          View all notifications
        </button>
      </div>
    </motion.div>
  );
};
