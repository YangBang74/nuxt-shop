<script setup lang="ts">
import type { Sneaker } from '~/shared/types/sneaker';
import Loader from '~/components/UI/Loader.vue';

definePageMeta({
  layout: 'default',
});

const route = useRoute();
const name = route.params.name as string | undefined;

const loading = ref(true);
const sneakers = ref<Sneaker[]>([]);
const error = ref<string | null>(null);

async function fetchData() {
  if (!name) {
    error.value = 'Бренд не указан';
    loading.value = false;
    return;
  }

  try {
    loading.value = true;
    error.value = null;

    const response = await fetch(
      `https://175061237ca5525f.mokky.dev/snakers?brand=${encodeURIComponent(name)}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Что-то пошло не так при загрузке данных');
    }
    sneakers.value = data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = 'Неизвестная ошибка';
    }
  } finally {
    loading.value = false;
  }
}

onMounted(fetchData);
</script>

<template>
  <section class="my-20">
    <div class="container">
      <div class="flex justify-between items-start flex-wrap">
        <CartItems v-for="snake in sneakers" :key="snake.id" :item="snake" />
      </div>

      <div v-if="loading" class="text-center py-10">
        <Loader />
      </div>

      <div v-if="error" class="text-center text-red-600 py-10">
        {{ error }}
      </div>

      <div v-if="!loading && !sneakers.length && !error" class="text-center py-10">
        Нет данных для отображения
      </div>
    </div>
  </section>
</template>
