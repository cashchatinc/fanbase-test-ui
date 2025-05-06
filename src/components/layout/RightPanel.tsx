import { mockSuggestions } from 'data/suggestions';
import { trendingTopics } from 'data/trending';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export const RightPanel = () => {
  return (
    <div className="h-screen sticky top-0 py-8 pl-4 pr-2 space-y-6 overflow-y-auto scrollbar-thin">
      {/* Mobile Search - only visible on medium screens */}
      <div className="lg:hidden mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={18} />
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2 rounded-full border border-gray-300 
                   bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none 
                   focus:border-primary-500 focus:ring-1 focus:ring-primary-500
                   dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Search on Connect..."
            type="text"
          />
        </div>
      </div>

      {/* Trending section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Trending Topics
        </h2>
        <div className="space-y-4">
          {trendingTopics.map(topic => (
            <motion.div className="cursor-pointer" key={topic.id} whileHover={{ x: 5 }}>
              <p className="font-medium text-gray-900 dark:text-white">#{topic.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {topic.postCount.toLocaleString()} posts
              </p>
            </motion.div>
          ))}
        </div>
        <button className="mt-4 text-primary-500 hover:text-primary-600 text-sm font-medium">
          Show more
        </button>
      </div>

      {/* Who to follow section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Who to follow</h2>
        <div className="space-y-4">
          {mockSuggestions.map(user => (
            <div className="flex items-center justify-between" key={user.id}>
              <div className="flex items-center">
                <img
                  alt={user.displayName}
                  className="h-10 w-10 rounded-full object-cover"
                  src={user.avatarUrl}
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-900 dark:text-white">{user.displayName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
                </div>
              </div>
              <motion.button
                className="bg-primary-50 hover:bg-primary-100 text-primary-600 dark:bg-gray-700 dark:text-primary-400 
                       dark:hover:bg-gray-600 px-3 py-1 rounded-full text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Follow
              </motion.button>
            </div>
          ))}
        </div>
        <button className="mt-4 text-primary-500 hover:text-primary-600 text-sm font-medium">
          Show more
        </button>
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2">
        <div className="flex flex-wrap gap-2">
          <a className="hover:underline" href="#">
            About
          </a>
          <a className="hover:underline" href="#">
            Terms of Service
          </a>
          <a className="hover:underline" href="#">
            Privacy Policy
          </a>
          <a className="hover:underline" href="#">
            Cookie Policy
          </a>
          <a className="hover:underline" href="#">
            Accessibility
          </a>
          <a className="hover:underline" href="#">
            More
          </a>
        </div>
        <p>© 2025 Connect</p>
      </div>
    </div>
  );
};
