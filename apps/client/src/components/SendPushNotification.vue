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

    <app-accordion :value="null" class="col-span-full">
      <app-accordion-panel value="0">
        <app-accordion-header>Additional configuration</app-accordion-header>
        <app-accordion-content>
          <div class="flex flex-col items-start pt-5">
            <label class="app-input-block__label py-5">Icon</label>
            <div class="flex flex-wrap gap-4 justify-between">
              <div v-for="icon in icons" :key="icon" class="flex items-center">
                <RadioButton
                  v-model="state.form.icon"
                  :input-id="icon"
                  name="icon"
                  :value="icon"
                />
                <label :for="icon" class="ml-2">
                  <img :src="icon" alt="" class="w-16 rounded-md" />
                </label>
              </div>
            </div>
          </div>

          <div class="flex flex-col items-start pt-5">
            <label class="app-input-block__label py-5">Badge</label>
            <div class="flex flex-wrap gap-4 justify-between">
              <div v-for="badge in badges" :key="badge" class="flex items-center">
                <RadioButton
                  v-model="state.form.badge"
                  :input-id="badge"
                  name="badge"
                  :value="badge"
                />
                <label :for="badge" class="ml-2">
                  <img :src="badge" alt="" class="w-8" />
                </label>
              </div>
            </div>
          </div>
        </app-accordion-content>
      </app-accordion-panel>
    </app-accordion>
  </form>
  <div class="text-right pb-20 pt-10">
    <AppButton label="Send notification" @click="onClick" />
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch } from "vue";
import { useWebPushStore } from "@/stores/web-push.store";
import { PushNotificationDto } from "@repo/dtos";
import { validate, ValidationError } from "class-validator";
import InputValidation from "@/components/InputValidation.vue";

const webPushStore = useWebPushStore();

const state: {
  form: PushNotificationDto;
  errors: ValidationError[];
  dirty: boolean;
  value: string;
} = reactive({
  form: new PushNotificationDto(),
  errors: [],
  dirty: false,
  value: "",
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

const icons = [
  "apple-touch-icon.png",
  "unjs--ungh.svg",
  "unjs--uncrypto.svg",
  "unjs--cookie-es.svg",
].map(
  (filename) =>
    new URL(`form-options/icons/${filename}`, import.meta.env.VITE_WEBSITE_URL).href
);

const badges = ["1.svg", "2.svg", "3.svg", "4.svg"].map(
  (filename) =>
    new URL(`form-options/badges/${filename}`, import.meta.env.VITE_WEBSITE_URL).href
);

onMounted(() => {
  state.form.title = "Heeeey!";
  state.form.body = "I'm a new web push notification!!!";
  state.form.icon = icons[0];
  state.form.badge = badges[0];
});

watch(state.form, async () => {
  if (state.dirty) {
    const errors = await validate(state.form);
    state.errors = errors;
  }
});
</script>
