import {
  defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Dimensi/', // HARUS sesuai nama repo
  plugins: [react()]
})