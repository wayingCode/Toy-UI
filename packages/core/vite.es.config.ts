import { defineConfig } from 'vite'
import { readdirSync, readdir } from "fs";
import { defer, delay, filter, map, includes } from "lodash-es";
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
export default defineConfig({
  plugins: [vue(), dts({
    tsconfigPath: '../../tsconfig.build.json',
    outDir: 'dist/types'
  })],
  build: {
    outDir: 'dist/es',
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'ToyUI',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        '@popperjs/core',
        'async-validator'
      ],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        },
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'style.css') {
            return 'index.css'
          }
          if (
            chunkInfo.type === "asset" &&
            /\.(css)$/i.test(chunkInfo.name as string)
          ) {
            return "theme/[name].[ext]";
          }
          return chunkInfo.name as string
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return "vendor";
          }
          if (id.includes('packages/hooks')) {
            return "hooks";
          }
          if (
            includes(id, "/packages/utils") ||
            includes(id, "plugin-vue:export-helper")
          ) {
            return "utils";
          }
          for (const item of getDirectoriesSync("../components")) {
            if (includes(id, `/packages/components/${item}`)) return item;
          }
        }
      }
    }
  }
})