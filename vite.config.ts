import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    solidPlugin(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/lodash/lodash.js", // Copy lodash from node_modules
          dest: "assets", // Place it in dist/vendor
        },
      ],
    }),
  ],
  build: {
    target: "esnext",
    sourcemap: true,
    outDir: "dist",
    rollupOptions: {
      external: ["lodash"], // Mark lodash as external
      output: {
        paths: {
          // Transform lodash imports to use the copied path in dist
          lodash: "./assets/lodash.js",
        },
      },
    },
  },
});