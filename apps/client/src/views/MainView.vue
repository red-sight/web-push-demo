<template>
  <div class="w-full text-center">
    <div v-if="requestPermissionStatus !== true"><landing-content /></div>

    <send-push-notification v-if="requestPermissionStatus" />
  </div>
</template>

<script setup lang="ts">
import { useWebPushStore } from "@/stores/web-push.store";
import { storeToRefs } from "pinia";
import SendPushNotification from "@/components/SendPushNotification.vue";
import LandingContent from "@/components/LandingContent.vue";

const webPushStore = useWebPushStore();
const { requestPermissionStatus } = storeToRefs(webPushStore);
</script>
