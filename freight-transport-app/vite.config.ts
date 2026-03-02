import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return;
          }

          if (id.includes('react-dom') || id.includes('react-router-dom') || id.includes('/react/')) {
            return 'react-core';
          }

          if (id.includes('recharts')) {
            return 'charts';
          }

          if (id.includes('@tanstack/react-table')) {
            return 'tables';
          }

          if (id.includes('zod') || id.includes('react-hook-form') || id.includes('@hookform/resolvers')) {
            return 'forms';
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});