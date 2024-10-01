import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Vite configuration with proxy
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.barcelos.dev', // The API server being proxied
        changeOrigin: true, // Needed to avoid CORS issues
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
});
