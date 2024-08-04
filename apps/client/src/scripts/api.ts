import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://web-push-demo.distantcell.space/api',
})
