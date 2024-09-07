import axios, { AxiosError } from 'axios'
import { appEmitter } from '@/scripts/AppEmitter'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    let detail = 'Unknown error'
    if (error.response) {
      if ('data' in error.response) {
        if (typeof error.response.data === 'object') {
          if (error.response.data && 'message' in error.response.data) {
            if ('message' in error.response.data) {
              const { message } = error.response.data
              if (message === 'string') detail = message
              else if (Array.isArray(message)) detail = JSON.stringify(message)
            }
          }
        }
      }
    } else if (error.message) detail = error.message

    appEmitter.showToast({
      severity: 'error',
      summary: 'Whoops!',
      detail,
      closable: true,
    })

    return Promise.reject(error)
  },
)
