import type { User } from 'types/user';

export const mockProfile: User = {
  id: 'user-1',
  username: 'johndoe',
  displayName: 'John Doe',
  bio: 'Designer, photographer, and coffee enthusiast.',
  avatarUrl:
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
  coverUrl:
    'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  followers: 1248,
  following: 356,
  joinedDate: '2022-01-15',
  isVerified: true,
  location: 'San Francisco, CA',
  website: 'https://johndoe.design',
};
