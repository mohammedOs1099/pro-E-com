import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    
  },
  build: {
    outDir: "dist"
  },
  server: {
    port: 3000
  }
});
