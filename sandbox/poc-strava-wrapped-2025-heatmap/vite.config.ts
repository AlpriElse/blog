import { defineConfig } from 'vite';

export default defineConfig({
  base: '/sandbox/poc-strava-wrapped-2025-heatmap/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  publicDir: 'public',
  server: {
    open: true,
  },
});


