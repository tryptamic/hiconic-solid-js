import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { viteStaticCopy } from "vite-plugin-static-copy";
import "vitest/config";

export default defineConfig({
  optimizeDeps: {
    exclude: ['@dev.hiconic/tf.js_tf-js', '@dev.hiconic/tf.js_tf-js-dev']  // Replace with the exact package name
  },
  plugins: [
    solidPlugin(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@dev.hiconic/tf.js_tf-js/dist/tf-js.js", // Copy hiconic js
          dest: "assets", // Place it in dist/assets
        }
      ],
    }),
  ],
  build: {
    target: "es2020",
    sourcemap: "inline",
    outDir: "dist",
    rollupOptions: {
      external: ["@dev.hiconic/tf.js_tf-js"], // Mark hiconic.js as external
      output: {
        paths: {
          //Transform hiconic.js imports to use the copied path in dist
          "@dev.hiconic/tf.js_tf-js": "./tf-js.js",
        },
      },
    },
  },
});