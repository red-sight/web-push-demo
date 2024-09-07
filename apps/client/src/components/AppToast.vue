<template>
  <Toast position="top-center" />
</template>

<script setup lang="ts">
import { appEmitter, EAppEmitterEvent } from "@/scripts/AppEmitter";
import Toast, { type ToastMessageOptions } from "primevue/toast";
import { useToast } from "primevue/usetoast";

const toast = useToast();

function show(message: ToastMessageOptions) {
  toast.add(message);
}

appEmitter.addEventListener(EAppEmitterEvent.SHOW_TOAST, event => {
  if('detail' in event) show(event.detail as ToastMessageOptions)
})
</script>
