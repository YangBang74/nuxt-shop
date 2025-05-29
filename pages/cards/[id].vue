<script setup lang="ts">
import { updateSneakerRating } from '../services/rating';
import { useCardShop } from '#imports';

const card = useCardShop();

definePageMeta({
  layout: 'default',
});
const route = useRoute();
const id = route.params.id;
const sneakers = ref([]);
const loading = ref(true);
const error = ref<string | null>(null);
const selectSize = ref<number | null>(null);

async function fetchData() {
  try {
    loading.value = true;
    const response = await fetch(`https://175061237ca5525f.mokky.dev/snakers/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    sneakers.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
onMounted(fetchData);

async function onRatingChange(value: number) {
  try {
    await updateSneakerRating(sneakers.value.id, value);
    console.log(`Рейтинг обновлён: ${value}`);
  } catch (err) {
    console.error('Ошибка при обновлении рейтинга:', err);
  }
}
</script>

<template>
  <section class="my-20">
    <div class="container">
      <div class="flex justify-evenly md:flex-row items-center flex-col gap-x-10">
        <div class="w-full md:w-1/2 aspect-square border max-h-100 max-w-100 justify-center">
          <NuxtImg :src="sneakers.image" class="object-cover w-full h-full" />
        </div>
        <div class="md:w-1/2 w-full">
          <h1 class="font-bold text-xl">{{ sneakers.title }}</h1>
          <div class="flex gap-4 my-10 flex-wrap">
            <button
              type="button"
              v-for="(size, i) in sneakers.sizes"
              :key="i"
              class="py-1 px-3 rounded border border-gray-500 text-sm hover:bg-gray-200"
              @click="selectSize = size"
              :class="{ 'bg-gray-500 text-white': selectSize === size }"
            >
              {{ size }}
            </button>
          </div>
          <div class="flex my-10 gap-2 items-center">
            <Rating v-model:rating="sneakers.rating" :id="sneakers.id" />
            <p class="font-bold text-sm">{{ sneakers.rating }}</p>
          </div>
          <p class="text-xl mb-10">Цена: {{ sneakers.price }} тмт</p>
          <button
            type="button"
            class="bg-green-500 py-2 text-sm items-start text-white rounded font-bold w-full disabled:bg-gray-500 disabled:cursor-not-allowed"
            @click="card.addToCard(sneakers, selectSize)"
            :disabled="selectSize === null || selectSize === 0"
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
