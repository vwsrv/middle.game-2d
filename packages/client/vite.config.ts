import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

dotenv.config();

export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  build: {
    outDir: path.join(__dirname, 'dist/client'),
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'antd',
      '@ant-design/cssinjs',
      'rc-util',
    ],
  },
  ssr: {
    noExternal: [
      'antd',
      '@ant-design/cssinjs',
      '@ant-design/icons',
      /@ant-design\/.*$/,
      /rc-.*$/,
      'rc-util',
      '@emotion/hash',
    ],
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/entities': path.resolve(__dirname, './src/entities'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/widgets': path.resolve(__dirname, './src/widgets'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/app': path.resolve(__dirname, './src/app'),
      '@/styles/': path.resolve(__dirname, './src/styles'),
    },
    dedupe: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      '@ant-design/cssinjs',
      'rc-util',
    ],
  },
});
