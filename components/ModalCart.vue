<script setup lang="ts">
const cart = useCartShop();
</script>
<template>
  <article
    class="absolute right-0 top-10 w-72 bg-white rounded-lg shadow-lg overflow-hidden text-gray-900 z-50"
  >
    <header class="px-4 py-3 bg-gray-100 border-b border-gray-200">
      <h1 class="text-sm font-semibold">Корзина</h1>
    </header>
    <div class="px-4 py-3 space-y-4">
      <div v-if="cart.sneakers.length > 0">
        <div
          v-for="(item, i) in cart.sneakers"
          :key="i"
          class="flex items-center justify-between space-y-2"
        >
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gray-50 rounded-md overflow-hidden border border-gray-200">
              <NuxtImg
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div class="flex-1">
              <h2 class="text-xs font-medium text-gray-800 line-clamp-2">
                {{ item.title }}
              </h2>
              <p class="text-xs text-gray-600">Цена: {{ item.price }} тмт</p>
            </div>
          </div>
          <button
            type="button"
            @click="cart.deleteItem(i)"
            class="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 hover:bg-red-500 hover:border-red-500 transition"
          >
            <Icon name="heroicons:x-mark" class="w-4 h-4 text-gray-600 hover:text-white" />
          </button>
        </div>
        <div class="border-t border-gray-200 py-3 mt-2 flex items-center justify-between">
          <span class="text-sm font-medium">Всего:</span>
          <span class="text-sm font-semibold"> {{ cart.totalPrice }} тмт </span>
        </div>
        <NuxtLink
          to="/buy"
          class="block w-full text-center text-sm font-medium bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Оформить заказ
        </NuxtLink>
      </div>
      <div v-else>
        <div class="flex flex-col items-center justify-center py-8">
          <span class="text-sm text-gray-500">Корзина пуста</span>
        </div>
      </div>
    </div>
    <!-- <div class="px-5 mt-4" v-else>пока корзина пуста</div> -->
  </article>
</template>
