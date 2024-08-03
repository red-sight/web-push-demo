import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'

declare let self: ServiceWorkerGlobalScope

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

self.skipWaiting()
clientsClaim()

self.addEventListener('push', function (event) {
  if (!event.data) return
  const { title, ...options } = event.data.json()
  const promiseChain = self.registration.showNotification(title, options)
  event.waitUntil(promiseChain)
})
