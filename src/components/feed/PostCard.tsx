import { motion } from 'framer-motion';
import { usePosts } from 'hooks/usePosts';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import type { Post } from 'types/post';
import { formatDate } from 'utils/formatDate';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { postBookmark, postLike, postShare } = usePosts();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLike = () => postLike(post.id);
  const handleBookmark = () => postBookmark(post.id);
  const handleShare = () => postShare(post.id);

  // Format post content (extract hashtags, mentions, and links)
  const formatContent = (content: string) => {
    // If content is longer than 280 characters and not expanded, truncate it
    const displayContent =
      !isExpanded && content.length > 280 ? content.slice(0, 280) + '...' : content;

    return displayContent
      .replace(/(#\w+)/g, '<span class="text-primary-600 dark:text-primary-400">$1</span>')
      .replace(/(@\w+)/g, '<span class="text-primary-600 dark:text-primary-400">$1</span>')
      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" class="text-primary-600 dark:text-primary-400 hover:underline" target="_blank">$1</a>',
      );
  };

  return (
    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors duration-200">
      <div className="flex space-x-3">
        {/* Author avatar */}
        <div className="flex-shrink-0">
          <img
            alt={post.author.displayName}
            className="h-10 w-10 rounded-full object-cover"
            src={post.author.avatarUrl}
          />
        </div>

        {/* Post content */}
        <div className="flex-1 min-w-0">
          {/* Post header */}
          <div className="flex items-baseline">
            <div className="flex items-center">
              <p className="font-medium text-gray-900 dark:text-white">{post.author.displayName}</p>
              {post.author.isVerified && (
                <span className="ml-1 text-primary-500">
                  <svg
                    aria-label="Verified account"
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                  </svg>
                </span>
              )}
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                @{post.author.username}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 mx-1">·</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(post.createdAt)}
              </span>
            </div>
            <div className="ml-auto">
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>

          {/* Post text */}
          <div
            className="mt-1 text-gray-900 dark:text-white whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />

          {/* Read more / show less button */}
          {post.content.length > 280 && (
            <button
              className="mt-1 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}

          {/* Post images */}
          {post.images && post.images.length > 0 && (
            <div
              className={`mt-3 grid gap-2 rounded-xl overflow-hidden ${
                post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
              }`}
            >
              {post.images.map((image, index) => (
                <div
                  className={`overflow-hidden ${
                    post.images && post.images.length === 1 ? 'aspect-video' : 'aspect-square'
                  }`}
                  key={index}
                >
                  <img
                    alt={`Post image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    src={image}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Post actions */}
          <div className="mt-3 flex justify-between max-w-md">
            {/* Comment button */}
            <button className="flex items-center text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 group">
              <div className="p-2 rounded-full group-hover:bg-primary-50 dark:group-hover:bg-gray-800">
                <MessageCircle size={20} />
              </div>
              {post.comments > 0 && <span className="ml-1 text-sm">{post.comments}</span>}
            </button>

            {/* Like button */}
            <motion.button
              className={`flex items-center ${
                post.hasLiked
                  ? 'text-red-500 dark:text-red-400'
                  : 'text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400'
              } group`}
              whileTap={{ scale: 1.2 }}
              onClick={handleLike}
            >
              <div
                className={`p-2 rounded-full ${
                  post.hasLiked
                    ? 'bg-red-50 dark:bg-gray-800'
                    : 'group-hover:bg-red-50 dark:group-hover:bg-gray-800'
                }`}
              >
                <Heart fill={post.hasLiked ? 'currentColor' : 'none'} size={20} />
              </div>
              {post.likes > 0 && <span className="ml-1 text-sm">{post.likes}</span>}
            </motion.button>

            {/* Share button */}
            <button
              className={`flex items-center ${
                post.hasShared
                  ? 'text-green-500 dark:text-green-400'
                  : 'text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400'
              } group`}
              onClick={handleShare}
            >
              <div
                className={`p-2 rounded-full ${
                  post.hasShared
                    ? 'bg-green-50 dark:bg-gray-800'
                    : 'group-hover:bg-green-50 dark:group-hover:bg-gray-800'
                }`}
              >
                <Share2 size={20} />
              </div>
              {post.shares > 0 && <span className="ml-1 text-sm">{post.shares}</span>}
            </button>

            {/* Bookmark button */}
            <button
              className={`flex items-center ${
                post.hasBookmarked
                  ? 'text-blue-500 dark:text-blue-400'
                  : 'text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400'
              } group`}
              onClick={handleBookmark}
            >
              <div
                className={`p-2 rounded-full ${
                  post.hasBookmarked
                    ? 'bg-blue-50 dark:bg-gray-800'
                    : 'group-hover:bg-blue-50 dark:group-hover:bg-gray-800'
                }`}
              >
                <Bookmark fill={post.hasBookmarked ? 'currentColor' : 'none'} size={20} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
