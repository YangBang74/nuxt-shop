<script setup lang="ts">
import Loader from '~/components/UI/Loader.vue';
import type { Sneaker } from '~/shared/types/sneaker';

const route = useRoute();
const results = ref<Sneaker[]>([]);
const error = ref<string | null>(null);
const isLoading = ref(false);

const displayQuery = ref('');

watchEffect(async () => {
  let currentQueryValue = '';
  if (Array.isArray(route.query.q)) {
    currentQueryValue = route.query.q[0] || '';
  } else {
    currentQueryValue = (route.query.q as string) || '';
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
      `https://175061237ca5525f.mokky.dev/sneakers?title=*${encodeURIComponent(currentQueryValue)}`
    );

    if (!response.ok) {
      let errorMessage = `Ошибка HTTP: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        error.value = errorMessage;
        results.value = [];
        return;
      }
      const data = await response.json();
      results.value = data as Sneaker[];
    }
  } catch (err: unknown) {
    console.error('Ошибка при выполнении поиска:', err);

    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = 'Произошла неизвестная ошибка';
    }

    results.value = [];
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <section></section>
  <div class="p-4">
    <div v-if="error">
      <h1>Ошибка при загрузке результатов</h1>
      <p>{{ error }}</p>
    </div>
    <div class="w-full h-[100vh] flex justify-center items-center" v-else-if="isLoading">
      <Loader />
    </div>
    <section v-else-if="results.length">
      <div class="container">
        <h1>Результаты поиска по «{{ displayQuery }}»</h1>
        <div class="flex justify-start items-start gap-5 w-full flex-wrap mt-4">
          <CartItems v-for="(sneak, i) of results" :key="i" :item="sneak" />
        </div>
      </div>
    </section>
    <div v-else-if="displayQuery">
      <p>По вашему запросу «{{ displayQuery }}» ничего не найдено.</p>
    </div>
    <div v-else>
      <p>Введите поисковый запрос.</p>
    </div>
  </div>
</template>
