<script setup lang="ts">
import { getSneakers } from '@/services/get/getSneakersPagination';
import Logo from '@/components/Logo.vue';
import CartItems from '@/components/CartItems.vue';
import ChangeCart from '@/components/ChangeCart.vue';
import PostNewItem from '@/components/PostNewItem.vue';
import type { Sneaker } from '~/shared/types/sneaker';
import Pagination from '~/components/PaginationPage.vue';

definePageMeta({
  layout: 'auth',
  middleware: 'auth',
});

const activeModule = useCookie<'home' | 'add' | 'change'>('activeModule', {
  default: () => 'home',
});

const addIsActive = computed(() => activeModule.value === 'add');
const setModule = (module: 'home' | 'add' | 'change') => {
  activeModule.value = module;
};

const homeSneakers = ref<Sneaker[]>([]);
const homeTotal = ref(0);
const homeCurrentPage = ref(1);

const changeSneakers = ref<Sneaker[]>([]);
const changeTotal = ref(0);
const changeCurrentPage = ref(1);

const pageSize = 12;
const loading = ref(false);

const fetchHomeSneakers = async (): Promise<string | void> => {
  loading.value = true;
  try {
    const data = await getSneakers(homeCurrentPage.value, pageSize);
    homeSneakers.value = data.items;
    homeTotal.value = data.total;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return err.message;
    } else {
      return 'Ошибка при получении данных';
    }
  } finally {
    loading.value = false;
  }
};

const fetchChangeSneakers = async (): Promise<string | void> => {
  loading.value = true;
  try {
    const data = await getSneakers(changeCurrentPage.value, pageSize);
    changeSneakers.value = data.items;
    changeTotal.value = data.total;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return err.message;
    } else {
      return 'Ошибка при получении данных';
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchHomeSneakers();
});

watch(homeCurrentPage, () => {
  if (activeModule.value === 'home') {
    fetchHomeSneakers();
  }
});

watch(changeCurrentPage, () => {
  if (activeModule.value === 'change') {
    fetchChangeSneakers();
  }
});

watch(
  () => activeModule.value,
  (newModule) => {
    if (newModule === 'home') {
      homeCurrentPage.value = 1;
      fetchHomeSneakers();
    }
    if (newModule === 'change') {
      changeCurrentPage.value = 1;
      fetchChangeSneakers();
    }
  }
);

function onHomePageChange(newPage: number) {
  homeCurrentPage.value = newPage;
}

function onChangePageChange(newPage: number) {
  changeCurrentPage.value = newPage;
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="relative bg-black/70 text-white w-full z-50 border-b border-black/30">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center gap-10">
          <div class="font-medium text-lg py-3">
            <Logo class="h-10 w-40 text-white" />
          </div>
          <p>Admin</p>
        </div>
      </div>
    </header>

    <main class="flex-1 w-full flex">
      <aside class="flex flex-col text-white bg-black/70 w-70 gap-3 py-3 pr-5">
        <button
          type="button"
          class="flex items-center py-2 pl-10 pr-7 gap-3 rounded-r-2xl"
          @click="setModule('home')"
          :class="{ 'bg-white text-black/70': activeModule === 'home' }"
        >
          <Icon name="fa6-solid:house" size="20" />
          Главная
        </button>
        <button
          type="button"
          class="flex items-center py-2 pl-10 pr-7 gap-3 rounded-r-2xl whitespace-nowrap"
          @click="setModule('add')"
          :class="{ 'bg-white text-black/70': activeModule === 'add' }"
        >
          <Icon name="fa6-solid:circle-plus" size="20" />
          Добавить новый
        </button>
        <button
          type="button"
          class="flex items-center py-2 pl-10 pr-7 gap-3 rounded-r-2xl"
          @click="setModule('change')"
          :class="{ 'bg-white text-black/70': activeModule === 'change' }"
        >
          <Icon name="mdi:pencil" class="w-5 h-5" />
          Изменить товар
        </button>
      </aside>

      <div class="flex-1">
        <div class="flex flex-col" v-if="activeModule === 'home'">
          <div class="p-5 flex flex-wrap gap-5 items-start justify-center mx-auto">
            <CartItems v-for="(item, i) in homeSneakers" :key="i" :item="item" />
          </div>
          <Pagination
            :current-page="homeCurrentPage"
            :page-size="pageSize"
            :total="homeTotal"
            @change="onHomePageChange"
            class="mx-auto my-5"
          />
        </div>
        <PostNewItem v-if="activeModule === 'add'" />
        <div v-if="activeModule === 'change'" class="py-5 flex flex-col gap-3">
          <ChangeCart
            v-for="(item, i) in changeSneakers"
            :key="i"
            :item="item"
            @deleted="fetchChangeSneakers"
          />
          <div class="flex justify-center mt-4">
            <Pagination
              :current-page="changeCurrentPage"
              :page-size="pageSize"
              :total="changeTotal"
              @change="onChangePageChange"
            />
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-black text-white text-center mt-auto">Footer</footer>
  </div>
</template>
