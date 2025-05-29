<script setup lang="ts">
import { updateSneakerRating } from '../services/rating';
import { useCardShop } from '#imports';

const card = useCardShop();

definePageMeta({
  layout: 'default',
});
const route = useRoute();
const id = route.params.id;
const snakers = ref([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function fetchData() {
  try {
    loading.value = true;
    const response = await fetch(`https://175061237ca5525f.mokky.dev/snakers/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    snakers.value = data;
    console.log(snakers);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
onMounted(fetchData);

async function onRatingChange(value: number) {
  try {
    await updateSneakerRating(snakers.value.id, value);
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
          <NuxtImg :src="snakers.image" class="object-cover w-full h-full" />
        </div>
        <div class="md:w-1/2 w-full">
          <h1 class="font-bold text-xl">{{ snakers.title }}</h1>
          <div class="flex gap-4 my-10 flex-wrap">
            <button
              type="button"
              v-for="(size, i) in snakers.sizes"
              :key="i"
              class="py-1 px-3 rounded border border-gray-500 text-sm hover:bg-gray-200"
            >
              {{ size }}
            </button>
          </div>
          <div class="flex my-10 gap-2 items-center">
            <Rating v-model:rating="snakers.rating" :id="snakers.id" />
            <p class="font-bold text-sm">{{ snakers.rating }}</p>
          </div>

          <p class="text-xl mb-10">Цена: {{ snakers.price }} тмт</p>
          <button
            type="button"
            class="bg-acent py-2 text-sm items-start text-white rounded font-bold w-full"
            @click="card.addToCard(snakers)"
          >
            Добавить в корзину
          </button>
          <!-- <div class="text-gray-900 flex gap-1.5">
        <button v-for="(size, i) in sizes" :key="i" class="w-7 h-7 border">
          {{ size }}
        </button>
      </div> -->
        </div>
      </div>
    </div>
  </section>
</template>
