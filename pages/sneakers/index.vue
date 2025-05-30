<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

import getSnakers from '@/services/getSnakers';

const cards = useCartShop();
const sneakers = ref([]);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  try {
    sneakers.value = await getSnakers();
    console.log(sneakers.value);
  } catch (err) {
    error.value = err.message || 'Ошибка при получении данных';
  } finally {
    loading.value = false;
  }
});
</script>
<template>
  <section class="my-10">
    <div class="container">
      <div class="flex justify-between gap-5 my-10 items-start">
        <Filter />
      </div>
    </div>
  </section>
</template>
