import type { User } from './user';

export interface Post {
  id: string;
  content: string;
  images?: string[];
  createdAt: string;
  author: User;
  likes: number;
  comments: number;
  shares: number;
  hasLiked: boolean;
  hasShared: boolean;
  hasBookmarked: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  createdAt: string;
  author: User;
  likes: number;
  hasLiked: boolean;
}
