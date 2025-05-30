<template>
  <div class="p-4" v-if="results.length">
    <h1>Результаты поиска по «{{ q }}»</h1>
    <ul>
      <li v-for="item in results" :key="item.id">{{ item.title }}</li>
    </ul>
  </div>
  <div v-else>По вашему запросу ничего не найдено</div>
</template>

<script setup lang="ts">
import { useRoute } from '#app';
import { ref, watchEffect } from 'vue';

const route = useRoute();
const q = ref(route.query.q || '');
const results = ref([]);
const error = ref<string | null>(null);

watchEffect(async function fetchData() {
  try {
    if (!q.value) return;
    const response = await fetch(`https://175061237ca5525f.mokky.dev/snakers?title=*${q.value}`);
    const data = await response.json();
    results.value = data;
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    console.log(results.value);
  } catch (err) {
    error.value = err.message;
  }
});
</script>
