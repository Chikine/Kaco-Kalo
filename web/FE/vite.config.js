import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), 
    tsconfigPaths(),
    tailwindcss()
  ],
  server: {
    allowedHosts: ['05dd17deb9f8.ngrok-free.app']
  }
});