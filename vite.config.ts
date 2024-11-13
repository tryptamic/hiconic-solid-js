import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    solidPlugin(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@dev.hiconic/tf.js_tf-js/src/tf-js.js", // Copy hiconic js
          dest: "assets", // Place it in dist/assets
        },
      ],
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",  // Set to 'jsdom' for UI testing, or 'node' for algorithm-only tests
    setupFiles: "./test/setup.ts",  // Optional setup file
  },
  build: {
    target: "esnext",
    sourcemap: true,
    outDir: "dist",
    rollupOptions: {
      external: ["@dev.hiconic/tf.js_tf-js"], // Mark hiconic.js as external
      output: {
        paths: {
          // Transform hiconic.js imports to use the copied path in dist
          "@dev.hiconic/tf.js_tf-js": "./tf-js.js",
        },
      },
    },
  },
  
});