import { mockUsers } from 'data/users';
import type { Post } from 'types/post';

export const mockPosts: Post[] = [
  {
    id: 'post-1',
    content:
      'Just launched my new portfolio website! Check it out and let me know what you think. #webdesign #portfolio',
    createdAt: '2023-09-15T14:23:45Z',
    author: mockUsers[0],
    likes: 48,
    comments: 12,
    shares: 5,
    hasLiked: false,
    hasShared: false,
    hasBookmarked: false,
  },
  {
    id: 'post-2',
    content:
      'Exploring the beautiful streets of Barcelona this weekend. The architecture here is absolutely stunning! 🏛️ #travel #barcelona',
    images: [
      'https://images.pexels.com/photos/175773/pexels-photo-175773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    createdAt: '2023-09-14T10:12:35Z',
    author: mockUsers[1],
    likes: 327,
    comments: 42,
    shares: 18,
    hasLiked: true,
    hasShared: false,
    hasBookmarked: true,
  },
  {
    id: 'post-3',
    content:
      'Just finished building a new feature for our app using React and TypeScript. The type safety really makes a difference in large projects. #webdev #typescript #react',
    createdAt: '2023-09-13T16:45:22Z',
    author: mockUsers[2],
    likes: 156,
    comments: 23,
    shares: 7,
    hasLiked: false,
    hasShared: false,
    hasBookmarked: false,
  },
  {
    id: 'post-4',
    content:
      "I'm thrilled to announce that my new book \"The Silent Echo\" will be released next month! It's been a long journey, but I can't wait to share this story with all of you. #newbook #author #writing",
    images: [
      'https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    createdAt: '2023-09-12T09:34:18Z',
    author: mockUsers[3],
    likes: 482,
    comments: 67,
    shares: 42,
    hasLiked: true,
    hasShared: true,
    hasBookmarked: false,
  },
  {
    id: 'post-5',
    content:
      "Morning workout completed! Starting the day with exercise sets a positive tone for everything that follows. What's your favorite way to start the day? #fitness #motivation #morningroutine",
    images: [
      'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    createdAt: '2023-09-11T07:15:10Z',
    author: mockUsers[4],
    likes: 289,
    comments: 34,
    shares: 12,
    hasLiked: false,
    hasShared: false,
    hasBookmarked: true,
  },
  {
    id: 'post-6',
    content:
      'Working on a new photography project focusing on urban landscapes at night. The city takes on a completely different character after dark. #photography #nightscape #urban',
    images: [
      'https://images.pexels.com/photos/316093/pexels-photo-316093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    createdAt: '2023-09-10T22:42:55Z',
    author: mockUsers[0],
    likes: 215,
    comments: 28,
    shares: 9,
    hasLiked: false,
    hasShared: false,
    hasBookmarked: false,
  },
  {
    id: 'post-7',
    content:
      'Found this amazing little café tucked away in a side street. Their croissants are to die for! #foodie #café #breakfast',
    images: [
      'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    createdAt: '2023-09-09T11:24:32Z',
    author: mockUsers[1],
    likes: 176,
    comments: 19,
    shares: 3,
    hasLiked: true,
    hasShared: false,
    hasBookmarked: false,
  },
];
