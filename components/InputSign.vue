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
  <div class="flex flex-col mb-6">
    <label :for="name" class="mb-2 text-gray-700 font-medium">
      {{ label }}
    </label>
    <input
      :type="type"
      :name="name"
      :id="name"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-200 shadow-sm"
      required
    />
  </div>
</template>
