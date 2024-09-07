<template>
  <div class="text-left">
    <span v-if="state.permissionStatus === null">
      Welcome to our demonstration of web push notifications technology! In this demo,
      you'll see how businesses and websites can leverage push notifications to keep users
      informed and engaged, even when they aren't actively browsing. Just click "Start"
      button to proceed.
    </span>
    <span v-if="state.permissionStatus === false">
      We were not abled to request the permission. Please, allow showing web permission in
      your browser settings. iOS devices are also requiring the website link to be added
      to the home screen.
    </span>
  </div>

  <div class="text-right pb-20 pt-10">
    <AppButton
      :label="state.permissionStatus === null ? 'Start' : 'Try again'"
      @click="init"
      class="border-4 rounded-md border-color"
    />
  </div>
</template>

<script setup lang="ts">
import { useWebPushStore } from "@/stores/web-push.store";
import { reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";

const webPushStore = useWebPushStore();
const { requestPermissionStatus } = storeToRefs(webPushStore);

const state: {
  loading: boolean;
  permissionStatus: boolean | null;
} = reactive({
  loading: false,
  permissionStatus: null,
});

async function init() {
  state.loading = true;
  try {
    await webPushStore.init();
    state.permissionStatus = requestPermissionStatus.value;
  } catch (e) {
    console.error("Failed to init", e);
  } finally {
    state.loading = false;
  }
}

onMounted(() => init());
</script>
