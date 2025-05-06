export interface User {
  id: string;
  username: string;
  displayName: string;
  bio?: string;
  avatarUrl: string;
  coverUrl?: string;
  followers: number;
  following: number;
  joinedDate: string;
  isVerified: boolean;
  location?: string;
  website?: string;
}

export interface UserConnection {
  id: string;
  userId: string;
  connectionType: 'follower' | 'following' | 'both';
  createdAt: string;
}
