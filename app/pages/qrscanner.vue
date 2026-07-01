<template>
  <div class="scanner-container">
    <div class="scanner-card">
      <h2 class="title">QR Code Scanner</h2>

      <video
        ref="videoRef"
        class="scanner-video"
      ></video>

      <div v-if="result" class="result-box">
        <span class="label">Scanned Result</span>
        <p>{{ result }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const videoRef = ref<HTMLVideoElement | null>(null)
const result = ref('')

let qrScanner: any = null

onMounted(async () => {
  const QrScanner = (await import('qr-scanner')).default

  if (!videoRef.value) return

  qrScanner = new QrScanner(
    videoRef.value,
    (scanResult: any) => {
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

<style scoped>
.scanner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f4f6f9;
  padding: 20px;
}

.scanner-card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  text-align: center;
}

.title {
  margin-bottom: 20px;
  color: #333;
  font-size: 1.6rem;
  font-weight: 600;
}

.scanner-video {
  width: 100%;
  border-radius: 12px;
  border: 3px solid #2563eb;
  background: #000;
  overflow: hidden;
}

.result-box {
  margin-top: 20px;
  padding: 15px;
  background: #eef8ff;
  border-left: 5px solid #2563eb;
  border-radius: 8px;
  text-align: left;
  word-break: break-word;
}

.label {
  display: block;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 6px;
  font-weight: 600;
}

.result-box p {
  margin: 0;
  color: #1f2937;
  font-size: 1rem;
  font-weight: 500;
}

@media (max-width: 480px) {
  .scanner-card {
    padding: 18px;
  }

  .title {
    font-size: 1.3rem;
  }
}
</style>