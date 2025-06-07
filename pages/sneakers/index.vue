<script setup lang="ts">
import { getWithFilter } from '~/services/get/filterForSneakers';
import type { FilterParams } from '~/services/get/filterForSneakers';
import Loader from '~/components/UI/Loader.vue';
import Pagination from '~/components/PaginationPage.vue';

definePageMeta({ layout: 'default' });
useSeoMeta({
  title: 'Каталог товаров - YangShop',
  description: 'Добро пожаловать в наш магазин!',
  ogTitle: 'Home Page – My Shop',
});

const sneakers = ref<any[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const totalItems = ref(0);

const filters = ref<FilterParams>({
  priceFrom: null,
  priceTo: null,
  selectSize: null,
  selectStyle: null,
  selectBrand: null,
  page: 1,
  limit: 12,
});

async function loadSneakers() {
  loading.value = true;
  error.value = null;
  try {
    const { items, total } = await getWithFilter(filters.value);
    sneakers.value = items;
    totalItems.value = total;
  } catch (err) {
    error.value = (err as Error).message;
    sneakers.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(loadSneakers);
watch(filters, loadSneakers, { deep: true });

function onPageChange(newPage: number) {
  filters.value.page = newPage;
}
</script>

<template>
  <section class="my-10">
    <div class="container">
      <div class="flex justify-start gap-5 my-10 items-start">
        <Filter class="w-80" v-model="filters" />

        <div class="w-full" v-if="loading">
          <div class="h-[100vh] flex justify-center items-center">
            <Loader />
          </div>
        </div>

        <div v-else class="w-full">
          <div class="flex flex-wrap gap-5">
            <CartItems v-for="(sneak, i) in sneakers" :key="i" :item="sneak" />
          </div>
          <div class="flex justify-center mt-8">
            <Pagination
              :current-page="filters.page"
              :page-size="filters.limit"
              :total="totalItems"
              @change="onPageChange"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
