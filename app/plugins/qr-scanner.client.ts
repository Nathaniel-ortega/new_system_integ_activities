import QrScanner from 'qr-scanner'

// IMPORTANT: tell Nuxt where worker is
QrScanner.WORKER_PATH = '/qr-scanner-worker.min.js'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      QrScanner
    }
  }
})