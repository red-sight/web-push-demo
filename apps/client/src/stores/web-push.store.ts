import { api } from '@/scripts/api'
import { urlB64ToUint8Array } from '@/scripts/urlB64ToUint8Array'
import { defineStore } from 'pinia'

export const useWebPushStore = defineStore('web-push', {
  state: (): {
    publicKey: null | string
    subscription: null | PushSubscriptionJSON
    requestPermissionStatus: null | Boolean
  } => ({
    publicKey: null,
    subscription: null,
    requestPermissionStatus: null,
  }),
  actions: {
    async init() {
      await this.getPublicKey()
      await this.getSubscription()
    },

    async getPublicKey() {
      const { data } = await api({
        url: '/get_public_vapid_key',
        method: 'get',
      })
      this.publicKey = data.publicKey
    },

    async getSubscription() {
      if (!this.publicKey) return console.error('Public key is not defined')
      const result = await Notification.requestPermission()
      if (result === 'denied') {
        console.error('The user explicitly denied the permission request.')
        this.requestPermissionStatus = false
        return
      }
      if (result === 'granted') {
        this.requestPermissionStatus = true
        console.info('The user accepted the permission request.')
      }
      const registration = await navigator.serviceWorker.getRegistration()
      if (!registration) return console.error('Failed to register')
      let subscription = await registration.pushManager.getSubscription()
      if (!subscription)
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8Array(this.publicKey),
        })

      this.subscription = subscription.toJSON()
    },

    async sendNotification() {
      if (!this.requestPermissionStatus) return console.error('Not permitted')
      await api({
        url: '/send',
        method: 'post',
        data: {
          notification: {
            title: 'Hey',
            body: 'This is sent from the backend',
          },
          subscription: this.subscription,
        },
      })
    },
  },
})
