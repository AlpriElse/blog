import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/sandbox/poc-subtext/',
  build: {
    // Skip gzip size calculation - causes OOM on large WASM files
    reportCompressedSize: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // Keep WASM files separate, don't try to optimize them
        manualChunks: (id) => {
          if (id.includes('@huggingface/transformers')) {
            return 'transformers'
          }
        },
      },
    },
  },
  optimizeDeps: {
    // Exclude ONNX runtime from pre-bundling
    exclude: ['onnxruntime-web'],
  },
})
