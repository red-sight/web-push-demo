<template>
  <div class="text-left">
    Great! The permission for sending web push notifications is successfully provided. Now
    you're able to send a notification using the controls below.
  </div>
  <form class="grid grid-cols-2 gap-10 pt-10" @submit.prevent>
    <input-validation
      :errors="state.errors"
      property="title"
      label="Title"
      class="xs:col-span-full sm:col-span-1"
    >
      <input-text
        id="notification-input-title"
        v-model="state.form.title"
        size="large"
        :invalid="!!state.errors.find(({ property }) => property === 'title')"
        fluid
      />
    </input-validation>

    <input-validation
      :errors="state.errors"
      property="body"
      label="Details"
      class="xs:col-span-full"
    >
      <text-area
        id="notification-input-body"
        v-model="state.form.body"
        size="large"
        fluid
        rows="6"
        class="w-full"
        :invalid="!!state.errors.find(({ property }) => property === 'body')"
      />
    </input-validation>
  </form>
  <div class="text-right pb-20 pt-10">
    <AppButton label="Send notification" @click="onClick" />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { useWebPushStore } from "@/stores/web-push.store";
import { PushNotificationDto } from "@repo/dtos";
import { validate, ValidationError } from "class-validator";
import InputValidation from "@/components/InputValidation.vue";

const webPushStore = useWebPushStore();

const state: {
  form: PushNotificationDto;
  errors: ValidationError[];
  dirty: boolean;
} = reactive({
  form: new PushNotificationDto(),
  errors: [],
  dirty: false,
});

async function onClick() {
  try {
    const errors = await validate(state.form);
    state.dirty = true;
    state.errors = errors;
    if (errors?.length) return;
    await webPushStore.sendNotification(state.form);
  } catch (error) {
    console.error(error);
  }
}

watch(state.form, async () => {
  if (state.dirty) {
    const errors = await validate(state.form);
    state.errors = errors;
  }
});
</script>

<style lang="scss"></style>
