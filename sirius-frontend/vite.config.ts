import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    host: true // нужно для Render
  },

  // для правильного генерации путей на проде
  base: '/',
})
