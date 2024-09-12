import type { ToastMessageOptions } from 'primevue/toast'

export enum EAppEmitterEvent {
  SHOW_TOAST = 'show-toast',
}

class AppEmitter extends EventTarget {
  emit(eventName: string, data: any) {
    this.dispatchEvent(new CustomEvent(eventName, { detail: data }))
  }

  showToast(options: ToastMessageOptions) {
    this.emit(EAppEmitterEvent.SHOW_TOAST, options)
  }
}

export const appEmitter = new AppEmitter()

// Listen for messages from the Service Worker
if (navigator.serviceWorker) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === EAppEmitterEvent.SHOW_TOAST) {
      const options = event.data.data
      appEmitter.showToast(options)
    }
  })
}
