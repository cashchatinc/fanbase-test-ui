import { Timeline } from 'components/feed';
import { useUser } from 'contexts';
import { motion } from 'framer-motion';
import { Calendar, Camera, Globe, Heart, Link as LinkIcon, MapPin, Pencil } from 'lucide-react';
import { useState } from 'react';

export const ProfileView = () => {
  const { currentUser } = useUser();
  const [activeTab, setActiveTab] = useState<string>('posts');

  if (!currentUser) return null;

  const tabs = [
    { id: 'posts', label: 'Posts' },
    { id: 'replies', label: 'Replies' },
    { id: 'media', label: 'Media' },
    { id: 'likes', label: 'Likes' },
  ];

  return (
    <div className="animate-in pb-16 md:pb-0">
      {/* Cover photo */}
      <div className="relative h-48 md:h-64 overflow-hidden bg-gray-200 dark:bg-gray-800">
        {currentUser.coverUrl ? (
          <img
            alt="Profile cover"
            className="w-full h-full object-cover"
            src={currentUser.coverUrl}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary-400 to-secondary-400"></div>
        )}

        {/* Edit cover button */}
        <button className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full">
          <Camera size={18} />
        </button>
      </div>

      {/* Profile header */}
      <div className="relative px-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        {/* Avatar */}
        <div className="absolute -top-16 left-4 border-4 border-white dark:border-gray-900 rounded-full">
          <img
            alt={currentUser.displayName}
            className="h-32 w-32 rounded-full object-cover"
            src={currentUser.avatarUrl}
          />
        </div>

        {/* Edit profile button */}
        <div className="flex justify-end pt-4">
          <motion.button
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full 
                   font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 
                   transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Pencil className="inline-block mr-2" size={16} />
            Edit profile
          </motion.button>
        </div>

        {/* Profile info */}
        <div className="mt-12">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            {currentUser.displayName}
            {currentUser.isVerified && (
              <span className="ml-2 text-primary-500">
                <svg
                  aria-label="Verified account"
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                </svg>
              </span>
            )}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">@{currentUser.username}</p>

          {currentUser.bio && (
            <p className="mt-4 text-gray-900 dark:text-white">{currentUser.bio}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-y-2">
            {currentUser.location && (
              <div className="flex items-center text-gray-500 dark:text-gray-400 mr-4">
                <MapPin className="mr-1" size={16} />
                <span>{currentUser.location}</span>
              </div>
            )}

            {currentUser.website && (
              <div className="flex items-center text-primary-600 dark:text-primary-400 mr-4">
                <LinkIcon className="mr-1" size={16} />
                <a
                  className="hover:underline"
                  href={currentUser.website}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {currentUser.website.replace(/(^\w+:|^)\/\//, '')}
                </a>
              </div>
            )}

            <div className="flex items-center text-gray-500 dark:text-gray-400 mr-4">
              <Calendar className="mr-1" size={16} />
              <span>
                Joined{' '}
                {new Date(currentUser.joinedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          <div className="mt-4 flex space-x-4">
            <div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {currentUser.following}
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">Following</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {currentUser.followers}
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">Followers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex">
          {tabs.map(tab => (
            <button
              className={`px-4 py-4 text-sm font-medium relative ${
                activeTab === tab.id
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500 dark:bg-primary-400"
                  initial={false}
                  layoutId="activeTab"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'posts' && <Timeline feedFilter="latest" />}
        {activeTab === 'replies' && (
          <div className="flex flex-col items-center justify-center py-12">
            <Globe className="text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No replies yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              When you reply to posts, they'll show up here
            </p>
          </div>
        )}
        {activeTab === 'media' && (
          <div className="flex flex-col items-center justify-center py-12">
            <Camera className="text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No media yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              When you share posts with photos or videos, they'll show up here
            </p>
          </div>
        )}
        {activeTab === 'likes' && (
          <div className="flex flex-col items-center justify-center py-12">
            <Heart className="text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No likes yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Posts you like will show up here</p>
          </div>
        )}
      </div>
    </div>
  );
};
