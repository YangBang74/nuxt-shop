<template>
  <div class="p-4">
    <h1>Результаты поиска по «{{ q }}»</h1>
    <ul>
      <li v-for="item in results" :key="item.id">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script setup>
import { useRoute } from '#app';
import { ref, watchEffect } from 'vue';

const route = useRoute();
const q = ref(route.query.q || '');
const results = ref([]);

// const { data, error } = useAsyncData(
//   () => ['search', q],
//   () => {
//     if (!q) return { items: [] };
//     return $fetch(`https://175061237ca5525f.mokky.dev/snakers?title=*${q.value}', {
//       method: 'GET',
//       query: { search: q },
//     });
//   }
// );

const items = data.value?.items || []
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

// definePageMeta({
//   title: `Поиск: ${q}`,
//   meta: [{ name: 'description', content: `Результаты поиска по запросу ${q}` }],
// });
</script>
