import { defineConfig } from 'vitest/config';

export default defineConfig({
    optimizeDeps: {
        exclude: ['@dev.hiconic/tf.js_tf-js','@dev.hiconic/tf.js_tf-js-dev']  // Replace with the exact package name
        },
    
  test: {
    globals: true,
    environment: 'node',
  },
});