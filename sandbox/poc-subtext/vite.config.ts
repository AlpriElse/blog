import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Plugin to exclude files/directories from the build output
// - Directories containing .r2 marker files are excluded
// - Additional glob patterns can be passed to exclude specific files
function excludeR2Assets(extraPatterns: string[] = []) {
  const r2Dirs = new Set<string>()
  let outDir: string

  return {
    name: 'exclude-r2-assets',
    configResolved(config: { build: { outDir: string } }) {
      outDir = path.resolve(__dirname, config.build.outDir)
    },
    buildStart() {
      const publicDir = path.resolve(__dirname, 'public')
      function findR2Markers(dir: string) {
        if (!fs.existsSync(dir)) return
        const entries = fs.readdirSync(dir, { withFileTypes: true })
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name)
          if (entry.isDirectory()) {
            findR2Markers(fullPath)
          } else if (entry.name === '.r2') {
            r2Dirs.add(path.relative(publicDir, dir))
          }
        }
      }
      findR2Markers(publicDir)
    },
    closeBundle() {
      // Exclude directories with .r2 markers
      for (const relDir of r2Dirs) {
        const targetDir = path.join(outDir, relDir)
        if (fs.existsSync(targetDir)) {
          fs.rmSync(targetDir, { recursive: true })
          console.log(`Excluded R2 directory: ${relDir}`)
        }
      }
      // Exclude extra patterns
      for (const pattern of extraPatterns) {
        const targetPath = path.join(outDir, pattern)
        if (fs.existsSync(targetPath)) {
          fs.rmSync(targetPath, { recursive: true })
          console.log(`Excluded: ${pattern}`)
        }
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    excludeR2Assets([
      'examples/simon-kim/video.mp4',
      'examples/alex-ke/video.mp4',
    ]),
  ],
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
