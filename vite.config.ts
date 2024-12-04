import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { viteStaticCopy } from "vite-plugin-static-copy";
import "vitest/config";
import path from 'path';

export default defineConfig({
  optimizeDeps: {
    exclude: ['@dev.hiconic/tf.js_tf-js', '@dev.hiconic/hc-js-base']  // Replace with the exact package name
  },
  plugins: [
    solidPlugin(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@dev.hiconic/tf.js_tf-js/dist/tf-js.js", // Copy hiconic js
          dest: "assets", // Place it in dist/assets
        },
        {
          src: "node_modules/@dev.hiconic/hc-js-base/dist/hc-js-base.js", // Copy hiconic js
          dest: "assets", // Place it in dist/assets
        },
      ],
    }),
  ],
  test: {
    globals: true,
    environment: "node",  // Set to 'jsdom' for UI testing, or 'node' for algorithm-only tests
    // setupFiles: "./test/setup.ts",  // Optional setup file
  },
//  resolve: {
    //alias: {
      //'@public': path.resolve(__dirname, './public'),
    //},
  //},
  build: {
    target: "es2020",
    sourcemap: "inline",
    outDir: "dist",
    rollupOptions: {
      external: ["@dev.hiconic/tf.js_tf-js", "@dev.hiconic/hc-js-base"], // Mark hiconic.js as external
      output: {
        paths: {
          // Transform hiconic.js imports to use the copied path in dist
          // "@dev.hiconic/tf.js_tf-js": "./tf-js.js",
          // "@dev.hiconic/hc-js-base": "./hc-js-base.js",
        },
      },
    },
  },
});