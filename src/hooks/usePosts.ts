import { useCallback, useState } from 'react';
import type { Post } from 'types/post';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const postCreate = useCallback((data: Omit<Post, 'id' | 'createdAt'>) => {
    const id = `post-${Date.now()}`;
    const createdAt = new Date().toISOString();

    const post: Post = {
      ...data,
      id,
      createdAt,
    };

    throw new Error('Not implemented');
  }, []);

  const postLike = (id: string) => {
    throw new Error('Not implemented');
  };

  const postBookmark = (id: string) => {
    throw new Error('Not implemented');
  };

  const postShare = (id: string) => {
    throw new Error('Not implemented');
  };

  return {
    posts,
    postCreate,
    postBookmark,
    postLike,
    postShare,
  };
};
