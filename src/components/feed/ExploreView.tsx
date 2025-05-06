import { PostCard } from 'components/feed';
import { mockPosts } from 'data/posts';
import { Search, Compass } from 'lucide-react';
import { useState } from 'react';

export const ExploreView = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on search query
  const filteredPosts = searchQuery
    ? mockPosts.filter(
        post =>
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.username.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : mockPosts;

  // Popular categories for the explore page
  const categories = [
    'Technology',
    'Travel',
    'Design',
    'Photography',
    'Food',
    'Fitness',
    'Music',
    'Art',
  ];

  return (
    <div className="animate-in">
      {/* Search input */}
      <div className="p-4 sticky top-16 bg-white dark:bg-gray-900 z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={18} />
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 
                   bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none 
                   focus:border-primary-500 focus:ring-1 focus:ring-primary-500
                   dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Search for posts, people, or topics"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      {!searchQuery && (
        <div className="p-4 overflow-x-auto">
          <div className="flex space-x-2">
            {categories.map((category, index) => (
              <button
                className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700
                      text-gray-800 dark:text-gray-200 text-sm font-medium whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-700"
                key={index}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      {filteredPosts.length > 0 ? (
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <Compass className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No results found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try searching for different keywords or browse trending topics
          </p>
        </div>
      )}
    </div>
  );
};
