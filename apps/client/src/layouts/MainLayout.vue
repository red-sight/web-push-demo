<template>
  <div class="app-page-container">
    <div class="app-width">
      <AppToolbar>
        <template #center>
          <span class="text-header">Web Push Demo</span>
        </template>
      </AppToolbar>
    </div>
    <div class="app-page app-width grow">
      <RouterView />
    </div>
    <div class="bottom">
      <div class="app-width flex justify-between items-center">
        <Icon icon="bi:github" class="text-xl" />
        <span>malahov.dmitry@gmail.com</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { Icon } from "@iconify/vue";
</script>

<style lang="scss" scoped>
.bottom {
  @apply flex justify-center items-center bg-gray-900 text-white w-full h-10;
}
</style>
