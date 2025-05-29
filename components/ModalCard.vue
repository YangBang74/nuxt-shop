<script setup lang="ts">
import { useCardShop } from '#imports';

const card = useCardShop();
const props = withDefaults(
  defineProps<{
    class: string;
  }>(),
  {
    class: 'hidden',
  }
);
</script>
<template>
  <article
    class="p-5 border border-gray-400 rounded-lg bg-white/90 text-black absolute right-[-10px] top-12 cursor-auto"
  >
    <h1 class="text-sm font-bold">Корзина</h1>
    <div class="flex flex-col gap-2 mt-4" v-if="card.sneakers.length > 0">
      <div
        v-for="(item, i) in card.sneakers"
        :key="i"
        class="flex justify-between items-center gap-3"
      >
        <div class="flex gap-1">
          <div class="w-10 h-10 border border-gray-400">
            <NuxtImg :src="item.image" :alt="item.title" class="object-cover h-full w-full" />
          </div>
          <div class="text-left">
            <h2 class="font-bold text-[12px] whitespace-nowrap text-ellipsis w-30">
              {{ item.title }}
            </h2>
            <p class="text-[12px] whitespace-nowrap">Цена: {{ item.price }} тмт</p>
          </div>
        </div>
        <button
          type="button"
          @click="card.deleteItem(i)"
          class="border border-gray-700 text-gray-700 hover:bg-red-500 hover:text-white rounded-sm h-6 flex justify-center items-center"
        >
          <Icon name="heroicons:x-mark" size="20" stroke="3" />
        </button>
      </div>
      <NuxtLink
        to="/buy"
        class="text-[12px] block font-medium bg-gray-200 py-2 text-center rounded-sm mt-4 hover:bg-green-400 hover:text-white"
        >Оформить заказ</NuxtLink
      >
    </div>
    <div class="px-5 mt-4" v-else>пока корзина пуста</div>
  </article>
</template>
