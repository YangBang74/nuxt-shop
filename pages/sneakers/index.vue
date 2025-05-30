<script setup lang="ts">
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

async function getWithFilter(filter: {
  priceFrom: number | null;
  priceTo: number | null;
  selectSize: number | null;
  selectStyle: string | null;
  selectBrand: string | null;
}) {
  const { priceFrom, priceTo, selectSize, selectStyle, selectBrand } = filter;
  loading.value = true;
  try {
    const params = new URLSearchParams();
    if (priceFrom !== null) params.append('price[from]', String(priceFrom));
    if (priceTo !== null) params.append('price[to]', String(priceTo));
    if (selectSize !== null) params.append('sizes[]', String(selectSize));
    if (selectStyle !== null) params.append('style[]', selectStyle);
    if (selectBrand !== null) params.append('brand', selectBrand);

    const url = `https://175061237ca5525f.mokky.dev/snakers?${params.toString()}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Что-то пошло не так');

    sneakers.value = data;
    console.log(sneakers.value);
  } catch (err: any) {
    error.value = err.message || 'Ошибка при загрузке сникеров';
  } finally {
    loading.value = false;
  }
}

onMounted(() => getWithFilter(filters.value));

watch(
  filters,
  (newFilters) => {
    console.log('Обновились фильтры:', newFilters);
    getWithFilter(newFilters);
  },
  { deep: true }
);
</script>
<template>
  <section class="my-10">
    <div class="container">
      <div class="flex justify-between gap-5 my-10 items-start">
        <Filter class="w-80" v-model="filters" />
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
