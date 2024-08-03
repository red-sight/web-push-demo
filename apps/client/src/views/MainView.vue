<template>Main view</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useWebPushStore } from '@/stores/web-push.store'

const webPushStore = useWebPushStore()

const publicKey = computed(() => webPushStore.publicKey)

async function init() {
  await webPushStore.init()
  // if (!publicKey) return
  // const result = await Notification.requestPermission()
  // if (result === 'denied') {
  //   console.error('The user explicitly denied the permission request.')
  //   return
  // }
  // if (result === 'granted') {
  //   console.info('The user accepted the permission request.')
  // }
  // const registration = await navigator.serviceWorker.getRegistration()
  // if (!registration) return console.error('Failed to register')
  // const subscribed = await registration.pushManager.getSubscription()
  // if (subscribed) {
  //   console.info('User is already subscribed.', subscribed)
  //   return
  // }
  // const subscription = await registration.pushManager.subscribe({
  //   userVisibleOnly: true,
  //   applicationServerKey: urlB64ToUint8Array(publicKey.toString())
  // })
  // console.log('SUCCESS!!!', subscription)
}

// function urlB64ToUint8Array(base64String: string) {
//   const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
//   const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
//   const rawData = window.atob(base64)
//   const outputArray = new Uint8Array(rawData.length)
//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i)
//   }
//   return outputArray
// }

onMounted(() => {
  init()
})
</script>
