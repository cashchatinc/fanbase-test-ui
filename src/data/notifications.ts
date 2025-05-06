import { mockUsers } from 'data/users';
import type { Notification } from 'types/notification';

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'like',
    createdAt: '2023-09-15T15:30:45Z',
    read: false,
    actor: mockUsers[1],
    targetId: 'post-1',
    targetType: 'post',
    message: 'Sarah Johnson liked your post',
  },
  {
    id: 'notif-2',
    type: 'comment',
    createdAt: '2023-09-15T14:22:18Z',
    read: false,
    actor: mockUsers[2],
    targetId: 'post-1',
    targetType: 'post',
    message: 'Mike Chen commented on your post',
  },
  {
    id: 'notif-3',
    type: 'follow',
    createdAt: '2023-09-14T19:15:32Z',
    read: true,
    actor: mockUsers[3],
    targetId: 'user-1',
    targetType: 'profile',
    message: 'Emily Roberts started following you',
  },
  {
    id: 'notif-4',
    type: 'mention',
    createdAt: '2023-09-13T11:05:24Z',
    read: true,
    actor: mockUsers[4],
    targetId: 'post-3',
    targetType: 'post',
    message: 'Alex Trainer mentioned you in a post',
  },
  {
    id: 'notif-5',
    type: 'system',
    createdAt: '2023-09-12T08:00:00Z',
    read: true,
    message: 'Welcome to Connect! Complete your profile to get started.',
  },
];
