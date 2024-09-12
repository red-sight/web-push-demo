import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { EAppEmitterEvent } from './scripts/AppEmitter'

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

self.addEventListener('notificationclick', function (event) {
  // Close the notification
  event.notification.close()

  // Check which action was clicked
  if (event.action === 'confirm') {
    // Handle the 'open' action (open a specific URL)
    event.waitUntil(
      (async () => {
        const allClients = await self.clients.matchAll({
          includeUncontrolled: true,
          type: 'window',
        })
        if (allClients.length > 0) {
          allClients[0].postMessage({
            type: EAppEmitterEvent.SHOW_TOAST,
            data: {
              severity: 'success',
              summary: 'Heeey!',
              detail: "We noticed that you've clicked it",
              closable: true,
            },
          })
        }
      })(),
    )

    // event.waitUntil(self.clients.openWindow('https://example.com/specific-page'))
  } else if (event.action === 'dismiss') {
    // Handle the 'dismiss' action
    // Could do nothing or log something
  } else {
    // Default action if the user clicks the notification itself
    // event.waitUntil(self.clients.openWindow('https://example.com'))
  }
})
