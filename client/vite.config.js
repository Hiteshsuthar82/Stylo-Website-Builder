import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    '/api':'https://stylo-website-builder.onrender.com'
  },
  plugins: [react()],
})
