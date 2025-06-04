<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import getSneakers from '@/services/get/getSneakers';
import CartItems from '@/components/CartItems.vue';

interface Sneaker {
  id: string;
  title: string;
  image: string;
  price: number;
}

const sneakers = ref<Sneaker[]>([]);
const loading = ref(false);
const errorMsg = ref<string | null>(null);
const addIsActive = ref<boolean>(false);

const fetchSneakersList = async () => {
  loading.value = true;
  errorMsg.value = null;

  try {
    const data = await getSneakers();
    sneakers.value = data;
  } catch (err: any) {
    errorMsg.value = err?.message || 'Ошибка при получении данных';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchSneakersList();
});

watch(addIsActive, (now) => {
  if (!now) {
    fetchSneakersList();
  }
});
definePageMeta({
  layout: 'auth',
});
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <header class="relative bg-black/70 text-white w-full z-50 border-b border-black/30">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center gap-10">
          <div class="font-medium text-lg py-3"><Logo class="h-10 w-40 text-white" /></div>
          <p>Admin</p>
        </div>
      </div>
    </header>
    <main class="flex-1 w-full flex overflow-hidden">
      <aside class="flex flex-col text-white bg-black/70 h-full max-w-[250px] gap-3 py-3 px-2">
        <button
          type="button"
          class="flex items-center w-full py-2 px-4 gap-3 rounded-r-2xl transition-colors duration-150"
          @click="addIsActive = false"
          :class="{
            'bg-white text-black/70': !addIsActive,
            'hover:bg-white hover:text-black/70': addIsActive,
          }"
        >
          <Icon name="fa6-solid:house" size="20" />
          <span>Главная</span>
        </button>

        <!-- Кнопка "Добавить новый" -->
        <button
          type="button"
          class="flex items-center w-full py-2 px-4 gap-3 rounded-r-2xl transition-colors duration-150"
          @click="addIsActive = true"
          :class="{
            'bg-white text-black/70': addIsActive,
            'hover:bg-white hover:text-black/70': !addIsActive,
          }"
        >
          <Icon name="fa6-solid:circle-plus" size="20" />
          <span>Добавить новый</span>
        </button>

        <!-- Кнопка "Изменить товар" (пример, сейчас просто пустая) -->
        <button
          type="button"
          class="flex items-center w-full py-2 px-4 gap-3 rounded-r-2xl hover:bg-white hover:text-black/70 transition-colors duration-150"
        >
          <Icon name="mdi:pencil" class="w-5 h-5" />
          <span>Изменить товар</span>
        </button>
      </aside>
      <section class="flex-1 overflow-auto">
        <div v-if="!addIsActive" class="p-5">
          <div v-if="loading" class="text-center text-gray-500">Загрузка...</div>
          <div v-else-if="errorMsg" class="text-center text-red-500">{{ errorMsg }}</div>
          <div v-else class="flex flex-wrap gap-5">
            <CartItems
              v-for="item in sneakers"
              :key="item.id"
              :title="item.title"
              :image="item.image"
              :price="item.price"
            />
          </div>
        </div>
        <div v-else>
          <PostNewItem @close="addIsActive = false" />
        </div>
      </section>
    </main>
    <footer class="bg-black text-white text-center">Footer</footer>
  </div>
</template>
