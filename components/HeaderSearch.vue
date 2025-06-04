<template>
  <div class="flex items-center relative flex-1/2 max-w-150">
    <input
      id="header-search-input"
      v-model="query"
      @keyup.enter="submit"
      type="text"
      placeholder="Поиск..."
      class="bg-white rounded-l-lg h-7 flex-1 w-full px-2 py-px text-black focus:outline-0"
    />
    <button
      type="button"
      @click="submit"
      class="flex items-center justify-center px-4 py-1 bg-blue-600 rounded-r-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <Icon name="lucide:search" class="w-5 h-5 text-white" />
    </button>
  </div>
</template>

<script setup>
import { useSearch } from '@/composables/useSearch';
const { query, submit } = useSearch();
</script>
