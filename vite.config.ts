import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Minifying drops the unprefixed `backdrop-filter`, which turns off the glass effect.
    cssMinify: false,
    // three.js is ~600 kB on its own and the hero needs it on first paint.
    chunkSizeWarningLimit: 700,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [{ name: 'three', test: /node_modules[\/]three[\/]/ }],
        },
      },
    },
  },
});
