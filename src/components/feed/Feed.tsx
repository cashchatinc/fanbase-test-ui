import { ExploreView, PostForm, Timeline } from 'components/feed';
import { MessagesView } from 'components/messages';
import { NotificationsView } from 'components/notifications';
import { ProfileView } from 'components/profile';
import { useState } from 'react';

interface FeedProps {
  activePage: 'home' | 'explore' | 'notifications' | 'messages' | 'profile';
}

export const Feed = ({ activePage }: FeedProps) => {
  const [feedFilter, setFeedFilter] = useState<'latest' | 'popular'>('latest');

  const renderMainContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <>
            <PostForm />
            <div className="py-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex space-x-1">
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors
                          ${
                            feedFilter === 'latest'
                              ? 'bg-primary-100 text-primary-700 dark:bg-gray-800 dark:text-primary-400'
                              : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                          }`}
                  onClick={() => setFeedFilter('latest')}
                >
                  Latest
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors
                          ${
                            feedFilter === 'popular'
                              ? 'bg-primary-100 text-primary-700 dark:bg-gray-800 dark:text-primary-400'
                              : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                          }`}
                  onClick={() => setFeedFilter('popular')}
                >
                  Popular
                </button>
              </div>
            </div>
            <Timeline feedFilter={feedFilter} />
          </>
        );
      case 'explore':
        return <ExploreView />;
      case 'notifications':
        return <NotificationsView />;
      case 'messages':
        return <MessagesView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <Timeline feedFilter="latest" />;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="py-4">
        {/* Title */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
          </h1>
        </div>

        {/* Main content */}
        <div>{renderMainContent()}</div>
      </div>
    </div>
  );
};
