import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      external: ['cesium'],
    },
  },
  optimizeDeps: {
    include: [
      '@cesium/engine',
      'resium',
      'cesium'
    ],
    exclude: ['@cesium/engine']
  },
  define: {
    CESIUM_BASE_URL: JSON.stringify('/node_modules/cesium/Build/Cesium'),
  },
});
