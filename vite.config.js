import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080/',
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/script.js',
          assetFileNames: 'assets/styles.css'
        }
      }
    },
    base: env.BASE_PATH ?? ''
  }
})
