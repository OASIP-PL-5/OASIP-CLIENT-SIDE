import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/pl5/',
  plugins: [vue()],
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'http://intproj21.sit.kmutt.ac.th',
    //     changeOrigin: true,
    //     secure: false,
    //     // rewrite: (path) => path.replace(/^\/api/, '')
    //   },

    // }
    port : 80
  }
})


