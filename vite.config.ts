import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 浏览器请求 /api/todos 时，转发给本地模拟后端
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        // json-server 的地址是 /todos，没有 /api 前缀
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
