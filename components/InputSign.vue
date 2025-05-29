<script setup lang="ts">
defineProps<{
  label: string;
  modelValue: string;
  name: string;
  type: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <div class="flex justify-between gap-2 flex-col">
    <label :for="name">{{ label }}</label>
    <input
      :type="type"
      :name="name"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="bg-white w-full flex-1 py-1 px-2.5 border rounded-sm"
      required
    />
  </div>
</template>
