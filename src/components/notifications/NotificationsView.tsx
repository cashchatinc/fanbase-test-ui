import { useNotifications } from 'contexts';
import { motion } from 'framer-motion';
import { AtSign, Bell, Heart, MessageCircle, Share2, User } from 'lucide-react';
import { formatDate } from 'utils/formatDate';

export const NotificationsView = () => {
  const { notifications, markAllAsRead, markAsRead } = useNotifications();

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="text-red-500" size={16} />;
      case 'comment':
        return <MessageCircle className="text-primary-500" size={16} />;
      case 'follow':
        return <User className="text-secondary-500" size={16} />;
      case 'mention':
        return <AtSign className="text-accent-500" size={16} />;
      case 'share':
        return <Share2 className="text-green-500" size={16} />;
      default:
        return <Bell className="text-gray-500 dark:text-gray-400" size={16} />;
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Bell className="text-gray-400 mb-4" size={48} />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No notifications yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          When you get notifications, they'll show up here
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {notifications.filter(n => !n.read).length} new notifications
        </span>
        <button
          className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
          onClick={markAllAsRead}
        >
          Mark all as read
        </button>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {notifications.map(notification => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
              !notification.read ? 'bg-primary-50 dark:bg-gray-800/30' : ''
            }`}
            initial={{ opacity: 0, y: 5 }}
            key={notification.id}
            onClick={() => !notification.read && markAsRead(notification.id)}
          >
            <div className="flex items-start space-x-3">
              {/* Notification icon or user avatar */}
              <div className="flex-shrink-0">
                {notification.actor ? (
                  <img
                    alt={notification.actor.displayName}
                    className="h-10 w-10 rounded-full object-cover"
                    src={notification.actor.avatarUrl}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    {getNotificationIcon(notification.type)}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-900 dark:text-white">
                      <span className="mr-1">{notification.message}</span>
                      {!notification.read && (
                        <span className="inline-block h-2 w-2 rounded-full bg-primary-500 ml-1"></span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {formatDate(notification.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
