import { mockProfile } from 'data/user';
import type { User } from 'types/user';

export const mockUsers: User[] = [
  mockProfile,
  {
    id: 'user-2',
    username: 'sarah_j',
    displayName: 'Sarah Johnson',
    bio: 'Travel blogger & foodie. Always planning my next adventure.',
    avatarUrl:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    coverUrl:
      'https://images.pexels.com/photos/450062/pexels-photo-450062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    followers: 5624,
    following: 432,
    joinedDate: '2021-03-22',
    isVerified: true,
    location: 'New York, NY',
    website: 'https://sarahtravels.com',
  },
  {
    id: 'user-3',
    username: 'tech_mike',
    displayName: 'Mike Chen',
    bio: 'Software engineer by day, gamer by night.',
    avatarUrl:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
    followers: 982,
    following: 254,
    joinedDate: '2022-06-08',
    isVerified: false,
    location: 'Seattle, WA',
  },
  {
    id: 'user-4',
    username: 'emily_writes',
    displayName: 'Emily Roberts',
    bio: 'Author and storyteller. Writing about life, love, and everything in between.',
    avatarUrl:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    coverUrl:
      'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    followers: 8754,
    following: 465,
    joinedDate: '2021-08-14',
    isVerified: true,
    location: 'Boston, MA',
    website: 'https://emilywritesbooks.com',
  },
  {
    id: 'user-5',
    username: 'alex_fitness',
    displayName: 'Alex Trainer',
    bio: 'Fitness coach. Helping you become the best version of yourself.',
    avatarUrl:
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    followers: 12654,
    following: 320,
    joinedDate: '2020-11-05',
    isVerified: true,
    location: 'Miami, FL',
    website: 'https://alexfitness.com',
  },
];
