<script setup lang="ts">
const priceFrom = ref<number | null>(null);
const priceTo = ref<number | null>(null);

const sizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
const styles = ['running', 'casual', 'basketball', 'skate', 'minimal'];
const brands = ['nike', 'converse', 'vans', 'puma', 'adidas'];
const selectSize = ref<number | null>(null);
const selectStyle = ref<string | null>(null);
const selectBrand = ref<string | null>(null);
</script>
<template>
  <article class="w-70 p-5 bg-gray-300 rounded-r-sm">
    <h3 class="text-2xl">Подбор по параметрам</h3>
    <form>
      <p class="text-gray-900 mt-5">Цена, тмт</p>
      <div class="flex items-start my-4 gap-2 md:flex-nowrap flex-wrap">
        <input
          type="text"
          v-model="priceFrom"
          placeholder="От"
          class="w-full px-2 py-1 border border-gray-400 focus:outline-0 bg-gray-200 rounded"
        />
        <input
          type="text"
          v-model="priceTo"
          placeholder="До"
          class="w-full px-2 py-1 border border-gray-400 focus:outline-0 bg-gray-200 rounded"
        />
      </div>
      <div class="my-5">
        <p class="text-gray-900 mb-2">Размер</p>
        <div class="flex justify-start items-start gap-2 flex-wrap">
          <button
            type="button"
            v-for="(size, i) in sizes"
            class="bg-gray-200 w-7 h-7 border-gray-400 border"
            :key="i"
            @click="selectSize = size"
            :class="{ 'bg-gray-800 text-white': selectSize === size }"
          >
            {{ size }}
          </button>
        </div>
      </div>
      <div class="my-5">
        <p class="text-gray-900 mb-2">Стиль</p>
        <div class="flex justify-start items-start gap-2 flex-wrap">
          <button
            type="button"
            v-for="(style, i) in styles"
            class="bg-gray-200 px-2 border-gray-400 border"
            :key="i"
            @click="selectStyle = style"
            :class="{ 'bg-gray-800 text-white': selectStyle === style }"
          >
            {{ style }}
          </button>
        </div>
      </div>
      <div class="my-5">
        <p class="text-gray-900 mb-2">Бренды</p>
        <div class="flex justify-start items-start gap-2 flex-wrap">
          <button
            type="button"
            v-for="(brand, i) in brands"
            class="bg-gray-200 px-2 border-gray-400 border"
            :key="i"
            @click="selectBrand = brand"
            :class="{ 'bg-gray-800 text-white': selectBrand === brand }"
          >
            {{ brand }}
          </button>
        </div>
      </div>
      <button type="button" class="bg-blue-500 py-1 rounded-sm text-white w-full">Применить</button>
    </form>
  </article>
</template>
