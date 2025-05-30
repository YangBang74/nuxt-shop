<template>
  <!-- <div class="relative bg-white text-black">
    <button @click="toggle" class="p-2">
      <NuxtIcon name="lucide:search" />
    </button>
    <transition name="fade">
      <div v-if="isActive" class="absolute right-0 mt-2 w-64">
        <input
          id="header-search-input"
          v-model="query"
          @keyup.enter="submit"
          @blur="isActive = false"
          class="w-full border rounded px-3 py-2"
        />
      </div>
    </transition>
  </div> -->
  <div class="flex items-center relative flex-1">
    <input
      id="header-search-input"
      v-model="query"
      @keyup.enter="submit"
      type="text"
      placeholder="Поиск..."
      class="bg-white rounded-l-lg h-7 flex-1 w-full px-2 py-px text-black focus:outline-0"
    />
    <button type="button" class="bg-gray-300 rounded-r-lg pt-1 px-2">
      <Icon name="lucide:search" class="text-black" />
    </button>
  </div>
</template>

<script setup>
import { useSearch } from '@/composables/useSearch';
const { query, submit } = useSearch();
</script>
