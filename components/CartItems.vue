<script setup lang="ts">
defineProps<{
  id?: number;
  title?: string;
  sizes?: string[];
  price?: number;
  image?: string;
}>();
</script>
<template>
  <div class="w-70 border rounded-r-sm">
    <NuxtImg :src="image" alt="Sneaker Image" class="h-70 w-70 object-cover" />
    <div class="px-5 py-2.5">
      <NuxtLink :to="`/sneakers/${id}`" class="text-2xl">{{ title }}</NuxtLink>
      <!-- <div class="text-gray-900 flex gap-1.5">
        <button v-for="(size, i) in sizes" :key="i" class="w-7 h-7 border">
          {{ size }}
        </button>
      </div> -->
      <p class="text-gray-900">Цена: {{ price }} тмт</p>
    </div>
  </div>
</template>
