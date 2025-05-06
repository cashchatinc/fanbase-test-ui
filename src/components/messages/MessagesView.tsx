import { mockUsers } from 'data/users';
import { motion } from 'framer-motion';
import { Search, Mail } from 'lucide-react';
import { useState } from 'react';

export const MessagesView = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter users based on search query
  const filteredUsers = searchQuery
    ? mockUsers.filter(
        user =>
          user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : mockUsers;

  return (
    <div className="animate-in">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={18} />
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 
                   bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none 
                   focus:border-primary-500 focus:ring-1 focus:ring-primary-500
                   dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Search for people"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {filteredUsers
            .filter(user => user.id !== 'user-1')
            .map(user => (
              <motion.div
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                key={user.id}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center space-x-3">
                  <img
                    alt={user.displayName}
                    className="h-12 w-12 rounded-full object-cover"
                    src={user.avatarUrl}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.displayName}
                          {user.isVerified && (
                            <span className="ml-1 text-primary-500">
                              <svg
                                aria-label="Verified account"
                                className="inline-block w-4 h-4 fill-current"
                                viewBox="0 0 24 24"
                              >
                                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                              </svg>
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">2m</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 truncate">
                      Hey there! How's it going?
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <Mail className="text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No messages found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            {searchQuery
              ? 'No users match your search criteria'
              : 'Start a conversation with someone!'}
          </p>
        </div>
      )}
    </div>
  );
};
