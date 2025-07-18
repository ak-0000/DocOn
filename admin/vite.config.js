import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['mock-aws-s3', 'aws-sdk', 'nock']
  }, 
  build: {
    rollupOptions: {
      external: ['mock-aws-s3', 'aws-sdk', 'nock']
    }
  },
  plugins: [react()],
  server: {
    port: 5174
  }
});

