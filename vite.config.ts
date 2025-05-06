import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      api: '/src/api',
      components: '/src/components',
      contexts: '/src/contexts',
      data: '/src/data',
      hooks: '/src/hooks',
      types: '/src/types',
      utils: '/src/utils',
    },
  },
});
