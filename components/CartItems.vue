<script setup lang="ts">
withDefaults(
  defineProps<{
    link?: string;
    item: Array<any>;
  }>(),
  {
    link: 'sneakers',
  }
);
</script>

<template>
  <div
    class="bg-white w-70 h-90 rounded-lg border border-black/15 shadow-md hover:shadow-lg transition p-4 flex flex-col"
  >
    <NuxtImg
      :src="item.image"
      alt="Sneaker Image"
      class="h-50 w-50 object-contain rounded-md mb-4 mx-auto"
      loading="lazy"
    />
    <div class="flex-1 flex flex-col justify-between">
      <NuxtLink
        :to="`/${link}/${item.id}`"
        class="text-lg sm:text-xl font-semibold text-gray-800 hover:text-blue-600 transition mb-2 line-clamp-2"
      >
        {{ item.title }}
      </NuxtLink>
      <p class="text-gray-700 text-base mb-4">Размеры: {{ item.sizes?.join(', ') }}</p>
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-gray-900">{{ item.price }} тмт</span>
        <NuxtLink
          :to="`/${link}/${item.id}`"
          class="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          В корзину
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* line-clamp для переноса длинного заголовка */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
