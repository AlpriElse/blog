import { defineConfig } from 'vite';

export default defineConfig({
  // Base path must match where this site will be served from
  base: '/sandbox/example-site/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});

