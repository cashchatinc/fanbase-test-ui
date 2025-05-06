import { mockPosts } from 'data/posts';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPostsAsync = async () => {
  await delay(2000);
  return mockPosts;
};
