import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    '/api':import.meta.env.VITE_API_URL
  },
  plugins: [react()],
})
