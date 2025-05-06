import type { User } from './user';

export type NotificationType = 'like' | 'comment' | 'follow' | 'mention' | 'share' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  createdAt: string;
  read: boolean;
  actor?: User;
  targetId?: string;
  targetType?: 'post' | 'comment' | 'profile';
  message: string;
}
