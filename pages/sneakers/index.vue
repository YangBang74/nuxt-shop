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
        <Filter class="w-80" />
        <div class="flex justify-between items-start gap-5 w-full">
          <CartItems
            v-for="(sneak, i) of sneakers"
            :key="i"
            :id="sneak.id"
            :image="sneak.image"
            :title="sneak.title"
            :price="sneak.price"
          />
        </div>
      </div>
    </div>
  </section>
</template>
