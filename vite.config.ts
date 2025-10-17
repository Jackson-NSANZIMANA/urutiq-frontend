import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@radix-ui/react-slot'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@stores': path.resolve(__dirname, './src/stores'),
      react: require.resolve('react'),
    },
  },
  server: {
    port: 3000,
    host: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@tanstack/react-query')) return 'query'
            if (id.includes('recharts')) return 'charts'
            if (id.includes('lucide-react')) return 'icons'
            if (id.includes('jspdf') || id.includes('html2canvas')) return 'pdf'
            if (id.includes('@zxing')) return 'zxing'
            if (id.includes('react-day-picker')) return 'daypicker'
            if (id.includes('@radix-ui')) return 'ui'
            return 'vendor'
          }
        },
      },
    },
  },
  define: {
    'process.env': process.env,
  },
  envPrefix: 'VITE_',
})
