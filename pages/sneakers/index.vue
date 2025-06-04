<script setup lang="ts">
import { getWithFilter } from '~/services/get/filterForSneakers';

definePageMeta({
  layout: 'default',
});

const sneakers = ref([]);
const loading = ref(false);
const error = ref<string | null>(null);

const filters = ref({
  priceFrom: null as number | null,
  priceTo: null as number | null,
  selectSize: null as number | null,
  selectStyle: null as string | null,
  selectBrand: null as string | null,
});

async function loadSneakers(item: any) {
  loading.value = true;
  error.value = null;
  try {
    const data = await getWithFilter(item);
    if (typeof data === 'string') {
      error.value = data;
      sneakers.value = [];
    } else {
      sneakers.value = data;
    }
  } catch (err) {
    error.value = (err as Error).message || 'Неизвестная ошибка';
  } finally {
    loading.value = false;
  }
}

onMounted(() => loadSneakers(filters.value));

watch(
  filters,
  (newFilters) => {
    console.log('Обновились фильтры:', newFilters);
    loadSneakers(newFilters);
  },
  { deep: true }
);
</script>
<template>
  <section class="my-10">
    <div class="container">
      <div class="flex justify-between gap-5 my-10 items-start">
        <Filter class="w-80" v-model="filters" />
        <div class="flex justify-start items-start gap-5 w-full">
          <CartItems
            v-for="(sneak, i) of sneakers"
            :key="i"
            :item="sneak"
          />
        </div>
      </div>
    </div>
  </section>
</template>
