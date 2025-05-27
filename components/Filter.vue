<script setup lang="ts">
import { ref } from 'vue';

const priceFrom = ref<number | null>(null);
const priceTo = ref<number | null>(null);
</script>
<template>
  <article class="w-70 p-5 bg-gray-300 rounded-r-sm">
    <h3 class="text-2xl">Подбор по параметрам</h3>
    <form>
      <p class="text-gray-900 mt-5">Цена, тмт</p>
      <div class="flex items-start my-4 gap-2">
        
        <input
          type="text"
          v-model="priceFrom"
          placeholder="От"
          class="w-full p-2 border border-gray-400 focus:outline-0 bg-gray-200 rounded"
        />
        <input
          type="text"
          v-model="priceTo"
          placeholder="До"
          class="w-full p-2 border border-gray-400 focus:outline-0 bg-gray-200 rounded"
        />
      </div>
    </form>
  </article>
</template>
