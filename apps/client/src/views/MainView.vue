<template>
  <div class="w-full text-center">
    <div v-show="requestPermissionStatus !== true">
      <!-- <div v-show="requestPermissionStatus === false">
        Whoops!&nbsp; It looks like the notification feature is currently disabled by your
        browser's security settings. To experience our push notifications, please follow
        these steps: 1. **Enable Notifications:** Allow the "Notifications" permission for
        this website in your browser settings. 2. **For Apple Devices:** Add this site as
        a bookmark to your home screen and access it from there. By adjusting these
        settings, you'll be able to receive timely updates and stay connected with the
        latest information.
      </div>
      <AppButton
        :label="requestPermissionStatus === false ? 'Try again' : 'Start'"
        @click="init"
      /> -->

      <landing-content>
        <AppButton label="Start" @click="init" class="border-4 rounded-md border-color" />
      </landing-content>
    </div>

    <send-push-notification v-if="requestPermissionStatus" />
  </div>
</template>

<script setup lang="ts">
import { useWebPushStore } from "@/stores/web-push.store";
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import SendPushNotification from "@/components/SendPushNotification.vue";
import LandingContent from "@/components/LandingContent.vue";

const webPushStore = useWebPushStore();
const { requestPermissionStatus } = storeToRefs(webPushStore);

const state = reactive({
  loading: false,
});

async function init() {
  state.loading = true;
  try {
    await webPushStore.init();
  } finally {
    state.loading = false;
  }
}
</script>
