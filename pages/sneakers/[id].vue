<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCartShop } from '~/stores/cart';
import Rating from '~/components/Rating.vue';
import OkButton from '~/components/UI/OkButton.vue';
import Loader from '~/components/UI/Loader.vue';
import { fetchData } from '~/services/get/getSneakerWithId';
import type { Sneaker } from '~/shared/types/sneaker';

const cart = useCartShop();
const route = useRoute();
const id = route.params.id as string;

const sneakers = ref<Sneaker | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const selectSize = ref<number | null>(null);
const addLoader = ref<boolean>(false);
const allGood = ref<boolean>(false);
const setError = ref<boolean>(false);

const getSneak = async () => {
  try {
    await fetchData(loading, sneakers, id);
  } catch (e) {
    console.log(e);
  }
};

onMounted(getSneak);

const addItemCart = async (snake: Sneaker, price: number) => {
  addLoader.value = true;
  try {
    await cart.addToCart(snake, price);
    allGood.value = true;
    setTimeout(() => {
      allGood.value = false;
    }, 2000);
  } catch {
    setError.value = true;
  }
};

const handleAddToCart = () => {
  if (sneakers.value && selectSize.value) {
    addItemCart(sneakers.value, selectSize.value);
  }
};
</script>

<template>
  <div class="w-full h-[100vh] flex justify-center items-center" v-if="loading">
    <Loader />
  </div>
  <div v-else>
    <section class="py-16 min-h-screen">
      <div class="container mx-auto px-4">
        <div v-if="loading" class="flex justify-center items-center py-20">
          <span class="text-gray-500">Загрузка товара...</span>
        </div>
        <div v-else-if="error" class="flex justify-center items-center py-20">
          <span class="text-red-500">{{ error }}</span>
        </div>
        <div v-else class="flex flex-col lg:flex-row gap-8">
          <div class="w-full lg:w-1/2 flex justify-center">
            <div
              class="w-full max-w-md aspect-square bg-white rounded-lg shadow-md overflow-hidden"
            >
              <NuxtImg
                :src="sneakers?.image"
                alt="Sneaker Image"
                class="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
          <div class="w-full lg:w-1/2 flex flex-col justify-center">
            <div>
              <h1 class="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
                {{ sneakers?.title }}
              </h1>
              <p class="text-gray-700 my-2">Выберите размер</p>
              <div class="flex flex-wrap gap-3 my-6">
                <button
                  v-for="(size, i) in sneakers?.sizes"
                  :key="i"
                  type="button"
                  @click="selectSize = size"
                  :class="[
                    'w-12 h-10 flex items-center justify-center border rounded-lg text-sm font-medium transition',
                    selectSize === size
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100',
                  ]"
                >
                  {{ size }}
                </button>
              </div>
              <div class="flex items-center gap-3 mb-6">
                <Rating :rating="sneakers?.rating" :readonly="true" />
                <span class="text-gray-800 font-semibold">{{ sneakers?.rating?.toFixed(1) }}</span>
              </div>
              <p class="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
                {{ sneakers?.price }} тмт
              </p>
            </div>
            <button
              type="button"
              class="w-full py-3 rounded-lg text-white font-semibold transition disabled:bg-gray-400 disabled:cursor-not-allowed text-center bg-green-600 hover:bg-green-700"
              @click="handleAddToCart"
              :disabled="!selectSize"
            >
              {{ selectSize ? 'Добавить в корзину' : 'Выберите размер' }}
            </button>
          </div>
        </div>
      </div>
    </section>
    <Comments @updated="getSneak" />
  </div>
  <Teleport to="body">
    <div
      v-if="allGood"
      class="fixed left-0 top-0 w-full h-full z-100 bg-black/40 flex justify-center items-center"
    >
      <div class="bg-white p-10 rounded-lg">
        <h1 class="font-medium text-lg">Добавлено в корзину</h1>
        <OkButton class="mt-5" @click="allGood = false" />
      </div>
    </div>
    <div
      v-if="setError"
      class="fixed left-0 top-0 w-full h-full z-100 bg-black/40 flex justify-center items-center"
    >
      <div class="bg-white p-10 rounded-lg">
        <h1 class="font-medium text-lg">Что-то пошел не так, попробуйте заново</h1>
        <OkButton class="mt-5" @click="setError = false" />
      </div>
    </div>
  </Teleport>
</template>
