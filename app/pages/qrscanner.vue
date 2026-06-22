<template>
  <div>
    <video
      ref="videoRef"
      class="w-full max-w-md rounded border"
    ></video>

    <p v-if="result" class="mt-4">
      Scanned: {{ result }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const videoRef = ref<HTMLVideoElement | null>(null)
const result = ref('')

let qrScanner: any = null

onMounted(async () => {
  // Client-side only import
  const QrScanner = (await import('qr-scanner')).default

  if (!videoRef.value) return

  qrScanner = new QrScanner(
    videoRef.value,
    (scanResult: any) => {
      console.log('decoded qr code:', scanResult)
      result.value =
        typeof scanResult === 'string'
          ? scanResult
          : scanResult.data
    },
    {
      returnDetailedScanResult: true,
      highlightScanRegion: true,
      highlightCodeOutline: true,
    }
  )

  await qrScanner.start()
})

onBeforeUnmount(() => {
  if (qrScanner) {
    qrScanner.stop()
    qrScanner.destroy()
  }
})
</script>