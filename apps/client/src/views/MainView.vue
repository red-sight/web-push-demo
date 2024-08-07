<template>
  <div class="w-full text-center">
    <AppButton label="Start" @click="init" />
  </div>
</template>

<script setup lang="ts">
import { useWebPushStore } from '@/stores/web-push.store'

const webPushStore = useWebPushStore()

async function init() {
  await webPushStore.init()
}
</script>
