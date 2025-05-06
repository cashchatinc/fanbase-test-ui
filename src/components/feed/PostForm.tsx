import { useUser } from 'contexts/UserContext';
import { AnimatePresence, motion } from 'framer-motion';
import { usePosts } from 'hooks/usePosts';
import { Calendar, Image, MapPin, Smile, X } from 'lucide-react';
import type { ChangeEvent, FormEvent } from 'react';
import { useRef, useState } from 'react';

export const PostForm = () => {
  const { currentUser } = useUser();
  const { postCreate } = usePosts();
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Simulate image upload
  const handleImageUpload = () => {
    // Using placeholder images for demo
    const placeholderImages = [
      'https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ];

    // Add a random image from the placeholders
    if (images.length < 4) {
      const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
      setImages([...images, randomImage]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!content.trim() && images.length === 0) return;

    setIsSubmitting(true);

    try {
      // Create a new post using RxJS
      if (currentUser) {
        postCreate({
          content,
          images: images.length > 0 ? images : undefined,
          author: currentUser,
          likes: 0,
          comments: 0,
          shares: 0,
          hasLiked: false,
          hasShared: false,
          hasBookmarked: false,
        });

        // Reset form
        setContent('');
        setImages([]);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-resize textarea
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);

    // Auto-resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  if (!currentUser) return null;

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex space-x-3">
        <img
          alt={currentUser.displayName}
          className="h-10 w-10 rounded-full object-cover"
          src={currentUser.avatarUrl}
        />

        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full p-2 bg-transparent border-none resize-none focus:outline-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              maxLength={280}
              placeholder="What's happening?"
              ref={textareaRef}
              rows={1}
              value={content}
              onChange={handleTextareaChange}
            />

            {/* Image preview */}
            <AnimatePresence>
              {images.length > 0 && (
                <motion.div
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 grid gap-2"
                  exit={{ opacity: 0, height: 0 }}
                  initial={{ opacity: 0, height: 0 }}
                  style={{
                    gridTemplateColumns: `repeat(${Math.min(images.length, 2)}, 1fr)`,
                  }}
                >
                  {images.map((img, index) => (
                    <div className="relative rounded-xl overflow-hidden aspect-square" key={index}>
                      <img alt="Post attachment" className="w-full h-full object-cover" src={img} />
                      <button
                        className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
                        type="button"
                        onClick={() => removeImage(index)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
              {/* Action buttons */}
              <div className="flex space-x-2">
                <button
                  className="text-primary-500 hover:text-primary-600 p-2 rounded-full hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors"
                  disabled={images.length >= 4}
                  type="button"
                  onClick={handleImageUpload}
                >
                  <Image size={20} />
                </button>
                <button
                  className="text-primary-500 hover:text-primary-600 p-2 rounded-full hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors"
                  type="button"
                >
                  <Smile size={20} />
                </button>
                <button
                  className="text-primary-500 hover:text-primary-600 p-2 rounded-full hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors"
                  type="button"
                >
                  <MapPin size={20} />
                </button>
                <button
                  className="text-primary-500 hover:text-primary-600 p-2 rounded-full hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors"
                  type="button"
                >
                  <Calendar size={20} />
                </button>
              </div>

              {/* Character count and post button */}
              <div className="flex items-center space-x-3">
                {content.length > 0 && (
                  <span
                    className={`text-sm ${
                      content.length > 260 ? 'text-warning-500' : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {280 - content.length}
                  </span>
                )}

                <motion.button
                  className="px-5 py-2 bg-primary-500 text-white font-medium rounded-full hover:bg-primary-600 
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={(!content.trim() && images.length === 0) || isSubmitting}
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? 'Posting...' : 'Post'}
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
