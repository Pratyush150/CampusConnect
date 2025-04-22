// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// ✅ Replicate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  base: './', // ✅ Ensures relative paths work on Netlify
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ✅ Nice clean import alias
    },
  },
});

