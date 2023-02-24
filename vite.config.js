import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig, loadEnv } from 'vite';
import process from 'process'

export default ({ mode }) =>
  defineConfig({
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          sourcemap: true,
        },
      }),
    ],
    build: {
      manifest: true,
    },
    define: { 'process.env': { ...loadEnv(mode, process.cwd()) } },
  });
