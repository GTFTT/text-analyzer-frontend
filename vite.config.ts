import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/text-analyzer-frontend/',
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
  },
})
