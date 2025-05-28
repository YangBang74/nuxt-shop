<script setup lang="ts">
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
</script>

<template>
  <section class="my-20">
    <div class="container">
      <div class="flex justify-between md:flex-row items-center flex-col gap-x-10">
        <div class="w-full md:w-1/2 aspect-square border">
          <NuxtImg :src="snakers.image" class="object-cover w-full h-full" />
        </div>
        <div class="md:w-1/2 w-full">
          <h1 class="font-bold text-3xl">{{ snakers.title }}</h1>
          <div class="flex gap-4 my-10 flex-wrap">
            <button
              type="button"
              v-for="(size, i) in snakers.sizes"
              :key="i"
              class="py-2.5 px-6 rounded border border-gray-500 text-lg hover:bg-gray-200"
            >
              {{ size }}
            </button>
          </div>
          <Reating />
          <p class="text-3xl mb-10">Цена: {{ snakers.price }} тмт</p>
          <button type="button" class="bg-acent py-5.5 text-xl text-white rounded font-bold w-full">
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
