import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
        type: 'module',
        disableRuntimeConfig: false
      },
      includeAssets: [
        '/icons/pwa-192x192.png',
        '/icons/pwa-512x512.png',
        '/icons/pwa-maskable-192x192.png',
        '/icons/pwa-maskable-512x512.png'
      ],
      manifest: {
        name: 'Web push notifications demo',
        short_name: 'web-push-demo',
        icons: [
          {
            src: '/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icons/pwa-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/icons/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        start_url: '/',
        display: 'browser',
        background_color: '#FFFFFF',
        theme_color: '#63A862',
        description:
          'A quick implementation of web push notifications can effectively showcase their ability to deliver real-time updates and enhance user engagement.'
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
