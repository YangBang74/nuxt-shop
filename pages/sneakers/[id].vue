<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCartShop } from '~/stores/cart';
import Rating from '~/components/Rating.vue';
import OkButton from '~/components/UI/OkButton.vue';
import Loader from '~/components/UI/Loader.vue';

const cart = useCartShop();
const route = useRoute();
const id = route.params.id as string;

const sneakers = ref<any>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const selectSize = ref<number | null>(null);
const addLoader = ref<boolean>(false);
const allGood = ref<boolean>(false);
const setError = ref<boolean>(false);
async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch(`https://175061237ca5525f.mokky.dev/snakers/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Ошибка при получении данных');
    }
    sneakers.value = data;
  } catch (err: any) {
    error.value = err.message || 'Что-то пошло не так';
  } finally {
    loading.value = false;
  }
}

onMounted(fetchData);

// async function onRatingChange(value: number) {
//   if (!sneakers.value) return;
//   try {
//     await updateSneakerRating(sneakers.value.id, value);
//     sneakers.value.rating = value;
//   } catch (err) {
//     console.error('Ошибка при обновлении рейтинга:', err);
//   }
// }

const addItemCart = async (snake: unknown, price: number | null) => {
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
</script>

<template>
  <div class="w-full h-[100vh] flex justify-center items-center" v-if="loading">
    <Loader />
  </div>
  <section class="py-16 bg-gray-50 min-h-screen" v-else>
    <div class="container mx-auto px-4">
      <div v-if="loading" class="flex justify-center items-center py-20">
        <span class="text-gray-500">Загрузка товара...</span>
      </div>
      <div v-else-if="error" class="flex justify-center items-center py-20">
        <span class="text-red-500">{{ error }}</span>
      </div>
      <div v-else class="flex flex-col lg:flex-row gap-8">
        <div class="w-full lg:w-1/2 flex justify-center">
          <div class="w-full max-w-md aspect-square bg-white rounded-lg shadow-md overflow-hidden">
            <NuxtImg
              :src="sneakers.image"
              alt="Sneaker Image"
              class="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
        <div class="w-full lg:w-1/2 flex flex-col justify-center">
          <div>
            <h1 class="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
              {{ sneakers.title }}
            </h1>
            <p class="text-gray-700 my-2">Выберите размер</p>
            <div class="flex flex-wrap gap-3 my-6">
              <button
                v-for="(size, i) in sneakers.sizes"
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
              <Rating :rating="sneakers.rating" @update:rating="onRatingChange" />
              <span class="text-gray-800 font-semibold">{{ sneakers.rating.toFixed(1) }}</span>
            </div>
            <p class="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
              {{ sneakers.price }} тмт
            </p>
          </div>
          <button
            type="button"
            class="w-full py-3 rounded-lg text-white font-semibold transition disabled:bg-gray-400 disabled:cursor-not-allowed text-center bg-green-600 hover:bg-green-700"
            @click="addItemCart(sneakers, selectSize)"
            :disabled="!selectSize"
          >
            {{ selectSize ? 'Добавить в корзину' : 'Выберите размер' }}
          </button>
        </div>
      </div>
    </div>
  </section>
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
