// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative paths for Netlify
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});


