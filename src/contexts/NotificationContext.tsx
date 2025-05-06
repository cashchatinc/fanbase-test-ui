import { mockNotifications } from 'data/notifications';
import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import type { Notification } from 'types/notification';

// RxJS stream for notifications
export const notificationsSubject = new BehaviorSubject<Notification[]>(mockNotifications);

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  // Subscribe to the RxJS subject
  useEffect(() => {
    const subscription = notificationsSubject.subscribe(newNotifications => {
      setNotifications(newNotifications);
    });

    return () => subscription.unsubscribe();
  }, []);

  const addNotification = (notification: Notification) => {
    const updatedNotifications = [notification, ...notifications];
    notificationsSubject.next(updatedNotifications);
  };

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification,
    );
    notificationsSubject.next(updatedNotifications);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true,
    }));
    notificationsSubject.next(updatedNotifications);
  };

  const removeNotification = (id: string) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    notificationsSubject.next(updatedNotifications);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
