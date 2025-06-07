<template>
  <div class="flex items-center space-x-2">
    <button
      @click="$emit('change', currentPage - 1)"
      :disabled="currentPage <= 1"
      class="px-3 py-1 rounded shadow bg-white"
    >
      <Icon name="mdi:arrow-left" />
    </button>

    <span>Стр. {{ currentPage }} из {{ totalPages }}</span>

    <button
      @click="$emit('change', currentPage + 1)"
      :disabled="currentPage >= totalPages"
      class="px-3 py-1 rounded shadow bg-white self-center"
    >
      <Icon name="mdi:arrow-right" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  pageSize: number;
  total: number;
}>();

const totalPages = computed(() => Math.ceil(props.total / props.pageSize));
</script>
