import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

dotenvExpand.expand(
  dotenv.config({
    path: path.join(__dirname, `env/.env.${process.env.profile}`)
  })
)
dotenvExpand.expand(
  dotenv.config({
    path: path.join(__dirname, `env/.env`)
  })
)

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 7889,
    proxy: {
      '/api': {
        target: process.env.VITE_APP_API_URL,
        changeOrigin: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  lintOnSave: false,
  base: '/nts-ui/'
})
