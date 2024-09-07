<template>
  <div class="text-left">
    Great! The permission for sending web push notifications is successfully provided. Now
    you're able to send a notification using the controls below.
  </div>
  <form @submit.prevent class="grid grid-cols-2 gap-10 pt-10">
    <!-- <div class="input-block">
      <label class="input-block__label" for="notification-input-title">Title</label>
      <input type="text" v-model="state.form.title" id="notification-input-title" />
    </div> -->
    <float-label class="xs:col-span-full sm:col-span-1">
      <input-text
        v-model="state.form.title"
        id="notification-input-title"
        size="large"
        fluid
      />
      <label for="notification-input-title" class="app-input-block__label">Title</label>
    </float-label>

    <float-label class="xs:col-span-full">
      <text-area
        v-model="state.form.body"
        id="notification-input-body"
        size="large"
        fluid
        rows="6"
        class="w-full"
      />
      <label for="notification-input-body" class="app-input-block__label">Details</label>
    </float-label>
  </form>
  <div class="text-right pb-20 pt-10">
    <AppButton label="Send notification" @click="onClick" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { type INotification } from '@/types/notitifcation.interface'
import { useWebPushStore } from "@/stores/web-push.store";

const webPushStore = useWebPushStore()

const state: {
  form: INotification
} = reactive({
  form: {
    title: null,
    body: null,
  },
});

async function onClick() {
  try {
    await webPushStore.sendNotification(state.form)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss"></style>
