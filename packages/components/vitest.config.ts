// vitest.config.ts
/// <reference types="vitest" />
import { defineConfig as defineVitestConfig } from 'vite'
import { defineConfig, mergeConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
const viteConfig = defineVitestConfig({
  plugins: [vue(), vueJsx()],
})
// https://vitejs.dev/config/
const vitestConfig = defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
});
export default mergeConfig(viteConfig, vitestConfig);
// "test": "vitest --coverage"