import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const devServer = env.VITE_DEV_SERVER_URL || 'http://127.0.0.1:5000'

  return {
    base: '',
    plugins: [
      vue(),
    ],
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_DEV_PORT || 5173),
      proxy: {
        '/api': {
          target: devServer,
          changeOrigin: true,
        },
      },
    },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '@/assets/styles/variable.scss';
          @import '@/assets/styles/mixin.scss';
        `
      },
    },
  },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
