<template>
  <div class="p-4">
    <div v-if="error">
      <h1>Ошибка при загрузке результатов</h1>
      <p>{{ error }}</p>
    </div>
    <div v-else-if="isLoading">
      <p>Загрузка результатов...</p>
    </div>
    <div v-else-if="results.length">
      <h1>Результаты поиска по «{{ displayQuery }}»</h1>
      <ul>
        <li v-for="item in results" :key="item.id">{{ item.title }}</li>
      </ul>
    </div>
    <div v-else-if="displayQuery">
      <p>По вашему запросу «{{ displayQuery }}» ничего не найдено.</p>
    </div>
    <div v-else>
      <p>Введите поисковый запрос.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from '#app';
import { ref, watchEffect, computed } from 'vue';

interface SearchResultItem {
  id: number;
  title: string;
}

const route = useRoute();
const results = ref<SearchResultItem[]>([]);
const error = ref<string | null>(null);
const isLoading = ref(false);

const displayQuery = ref('');

watchEffect(async () => {
  let currentQueryValue = '';
  if (Array.isArray(route.query.q)) {
    currentQueryValue = route.query.q[0] || '';
  } else {
    currentQueryValue = route.query.q || '';
  }
  displayQuery.value = currentQueryValue;
  if (!currentQueryValue) {
    results.value = [];
    error.value = null;
    isLoading.value = false;
    return;
  }
  isLoading.value = true;
  error.value = null;
  try {
    const response = await fetch(
      `https://175061237ca5525f.mokky.dev/snakers?title=*${encodeURIComponent(currentQueryValue)}`
    );
    if (!response.ok) {
      let errorMessage = `Ошибка HTTP: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {}
      throw new Error(errorMessage);
    }
    const data = await response.json();
    results.value = data as SearchResultItem[];
  } catch (err: any) {
    console.error('Ошибка при выполнении поиска:', err);
    error.value = err.message || 'Произошла неизвестная ошибка';
    results.value = [];
  } finally {
    isLoading.value = false;
  }
});
</script>
