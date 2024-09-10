<template>
  <div>
    <float-label class="xs:col-span-full sm:col-span-1">
      <slot></slot>
      <label
        :for="`notification-input-${props.property}`"
        class="app-input-block__label"
        >{{ props.label }}</label
      >
    </float-label>
    <div v-if="errorMessages">
      <div
        v-for="message in errorMessages"
        :key="message"
        class="text-sm text-red-500 flex items-start"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ValidationError } from "class-validator";
import { computed } from "vue";

const props = defineProps<{
  errors: ValidationError[];
  property: string;
  label: string;
}>();

const errorMessages = computed(() => {
  const propertyError = props.errors.find(({ property }) => property === props.property);
  if (!propertyError) return null;
  if (!propertyError.constraints) return [propertyError.toString()];
  if (propertyError.constraints)
    return Object.keys(propertyError.constraints).map(
      (key) => propertyError.constraints?.[key]
    );
  return [];
});
</script>
