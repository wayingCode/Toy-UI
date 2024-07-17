import { defineConfig } from 'vite'
import { readdirSync, readdir } from "fs";
import { defer, delay, filter, map, includes } from "lodash-es";
import { visualizer } from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import shell from 'shelljs'
import terser from '@rollup/plugin-terser'
import { hooksPlugin } from '@toy-ui/vite-plugins'
const TRY_MOVE_STYLES_DELAY = 750 as const

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}

// 移动样式文件夹至产物根目录
function moveStyles() {
  readdir('./dist/es/theme', err => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY)
      defer(() => shell.mv('./dist/es/theme', './dist'))
  })
}

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      filename: 'dist/stats.es.html'
    }),
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types'
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd,
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          '@DEV': JSON.stringify(isDev),
          '@PROD': JSON.stringify(isProd),
          '@TEST': JSON.stringify(isTest)
        }
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev
      },
    }),
    hooksPlugin({
      rmFiles: [
        './dist/es',
        './dist/theme',
        './dist/types',
        './dist/stats.es.html'
      ],
      // 打包完成后执行移动样式操作
      afterBuild: moveStyles
    })
  ],
  build: {
    outDir: 'dist/es',
    minify: false,
    cssCodeSplit: true,
    sourcemap: !isProd,
    lib: {
      entry: resolve(__dirname, '../index.ts'),
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