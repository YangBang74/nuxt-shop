<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue?: number;
  rating?: number;
  readonly?: boolean;
  canVote?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:rating', value: number): void;
}>();

const activeRating = computed(() => {
  return props.readonly ? (props.modelValue ?? 0) : (props.rating ?? 0);
});

const handleClick = (value: number) => {
  if (props.canVote && !props.readonly) {
    emit('update:rating', value);
  }
};
</script>

<template>
  <div class="flex gap-1">
    <span
      v-for="i in 5"
      :key="i"
      class="text-2xl cursor-pointer transition"
      :class="{
        'text-yellow-400': i <= activeRating,
        'text-gray-300': i > activeRating,
        'cursor-default': readonly,
      }"
      @click="handleClick(i)"
    >
      ★
    </span>
  </div>
</template>
