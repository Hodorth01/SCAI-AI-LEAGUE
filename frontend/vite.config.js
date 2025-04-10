import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // target: process.env.VITE_API_URL || 'http://localhost:4000', // Use the env variable or fallback to localhost
        target: "https://scai-ai-league-production-2128.up.railway.app"|| 'http://localhost:4000', // Use the env variable or fallback to localhost

        changeOrigin: true,
      },
    },
  },
});
