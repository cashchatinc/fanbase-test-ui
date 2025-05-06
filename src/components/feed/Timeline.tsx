import { PostCard } from 'components/feed';
import { AnimatePresence, motion } from 'framer-motion';
import { usePosts } from 'hooks/usePosts';
import { useMemo } from 'react';

interface TimelineProps {
  feedFilter: 'latest' | 'popular';
}

export const Timeline = ({ feedFilter }: TimelineProps) => {
  const { posts } = usePosts();

  // Sort posts based on the selected filter
  const sortedPosts = useMemo(
    () =>
      [...posts].sort((a, b) => {
        if (feedFilter === 'latest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }

        // For 'popular', sort by engagement (total of likes, comments, shares)
        const engagementA = a.likes + a.comments + a.shares;
        const engagementB = b.likes + b.comments + b.shares;
        return engagementB - engagementA;
      }),
    [feedFilter, posts],
  );

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-800">
      <AnimatePresence initial={false}>
        {sortedPosts.map((post, index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, y: 20 }}
            key={post.id}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
