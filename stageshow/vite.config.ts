import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const stub = fileURLToPath(new URL('./brands-stub.ts', import.meta.url))

// The kit's brand artwork is unused here: resolve its registry to an empty one
const noBrands = {
  name: 'akii-no-brands',
  enforce: 'pre' as const,
  resolveId(source: string, importer?: string) {
    if (importer && importer.includes('/kit/') && /(^|\/)brands(\/index(\.ts)?)?$/.test(source)) return stub
    return null
  },
}

// One script (IIFE, fully minified) and one stylesheet for the static site, no hashes in the
// names, so the pages can link them directly.
export default defineConfig({
  plugins: [noBrands, react()],
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    outDir: '../assets/stageshow',
    emptyOutDir: true,
    lib: { entry: 'main.tsx', formats: ['iife'], name: 'akiiDemos', fileName: () => 'demos.js', cssFileName: 'demos' },
  },
})
