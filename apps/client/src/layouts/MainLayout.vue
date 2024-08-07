<template>
  <div class="app-page-container">
    <div class="app-width">
      <AppToolbar>
        <template #center>Web Push Demo</template>
      </AppToolbar>
    </div>
    <div class="app-page app-width grow">
      <RouterView />
    </div>
    <div class="bottom">Bottom</div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style lang="scss">
.toolbar-logo {
  @apply h-10;
}
</style>
