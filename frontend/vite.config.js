import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target:  'https://scai-ai-league-production-2128.up.railway.app' || 'http://localhost:4000', 
        changeOrigin: true,
      },
    },
  },
});
