import type { ToastMessageOptions } from 'primevue/toast'

class AppEmitter extends EventTarget {
  emit(eventName: string, data: any) {
    this.dispatchEvent(new CustomEvent(eventName, { detail: data }))
  }

  showToast(options: ToastMessageOptions) {
    this.emit(EAppEmitterEvent.SHOW_TOAST, options)
  }
}

export const appEmitter = new AppEmitter()

export enum EAppEmitterEvent {
  SHOW_TOAST = 'show-toast',
}
