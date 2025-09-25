import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Dimensi/',  // wajib sesuai nama repo
  plugins: [react()]
})
