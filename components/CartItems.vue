<script setup lang="ts">
withDefaults(
  defineProps<{
    id?: number;
    title?: string;
    sizes?: string[];
    price?: number;
    image?: string;
    link?: string;
  }>(),
  {
    link: 'sneakers',
  }
);
</script>
<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 flex flex-col">
    <NuxtImg
      :src="image"
      alt="Sneaker Image"
      class="object-cover h-56 w-56 rounded-md mb-4"
      loading="lazy"
    />
    <div class="flex-1 flex flex-col justify-between">
      <NuxtLink
        :to="`/${link}/${id}`"
        class="text-lg sm:text-xl font-semibold text-gray-800 hover:text-blue-600 transition mb-2 line-clamp-2"
      >
        {{ title }}
      </NuxtLink>
      <p class="text-gray-700 text-base mb-4">Размеры: {{ sizes?.join(', ') }}</p>
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-gray-900">{{ price }} тмт</span>
        <NuxtLink
          :to="`/${link}/${id}`"
          class="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          В корзину
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
