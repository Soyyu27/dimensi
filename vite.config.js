import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Dimensi/', // HARUS sama dengan nama repo
  plugins: [react()]
})
