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

          <div class="flex flex-col items-start pt-5">
            <label class="app-input-block__label py-5"
              >Add an image
              <AppButton
                v-show="state.form.image"
                label="Clear"
                size="small"
                @click="state.form.image = undefined"
            /></label>
            <div class="flex flex-wrap gap-4 justify-between">
              <div v-for="image in images" :key="image" class="flex items-center">
                <RadioButton
                  v-model="state.form.image"
                  :input-id="image"
                  name="image"
                  :value="image"
                />
                <label :for="image" class="ml-2">
                  <img :src="image" alt="" class="w-32" />
                </label>
              </div>
            </div>
          </div>

          <div class="flex items-start py-8">
            <app-checkbox
              v-model="state.actions"
              input-id="actions-checkbox"
              name="actions-checkbox"
              binary
              @change="onActionsChange"
            />
            <label for="actions-checkbox" class="ml-2"> Enable actions </label>
          </div>

          <input-validation
            :errors="state.errors"
            property="vibrate"
            label="Vibrate"
            class="xs:col-span-full py-8"
          >
            <AppSelect
              v-model="state.form.vibrate"
              :options="vibrations"
              option-label="label"
              option-value="value"
            />
          </input-validation>
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
  actions: boolean;
} = reactive({
  form: new PushNotificationDto(),
  errors: [],
  dirty: false,
  value: "",
  actions: false,
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
].map((filename) => getPublicUrl(`form-options/icons/${filename}`));

const badges = ["1.svg", "2.svg", "3.svg", "4.svg"].map((filename) =>
  getPublicUrl(`form-options/badges/${filename}`)
);

const images = ["1.png", "2.png", "3.png"].map((filename) =>
  getPublicUrl(`form-options/images/${filename}`)
);

const actions = [
  {
    action: "dismiss",
    title: "Dismiss",
    icon: getPublicUrl("form-options/icons/material-symbols--cancel-rounded.svg"),
  },
  {
    action: "confirm",
    title: "Confirm",
    icon: getPublicUrl("form-options/icons/lets-icons--check-ring-duotone.svg"),
  },
];

const vibrations = [
  {
    label: "Heartbeat",
    value: [100, 200, 100, 400],
  },

  {
    label: "Double trouble",
    value: [200, 100, 200, 400, 200],
  },

  {
    label: "Drumroll",
    value: [50, 50, 50, 50, 50, 50, 50, 50, 300],
  },

  {
    label: "Echo",
    value: [300, 100, 200, 100, 100],
  },
];

function getPublicUrl(path: string) {
  return new URL(path, import.meta.env.VITE_WEBSITE_URL).href;
}

function onActionsChange() {
  state.form.actions = state.actions ? actions : undefined;
}

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
