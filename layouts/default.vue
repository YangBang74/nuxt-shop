<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    count: number;
  }>(),
  {
    count: 0,
  }
);
</script>

<template>
  <div class="layout">
    <header class="fixed w-full bg-blue-950 text-white">
      <div class="container mx-auto">
        <div class="flex justify-between items-center gap-5">
          <div class="font-bold py-3">Nuxt Shop</div>
          <nav class="flex gap-10">
            <NuxtLink to="/" class="py-3 text-gray-300 hover:text-white transition"
              >Главная</NuxtLink
            >
            <NuxtLink to="/about" class="py-3 text-gray-300 hover:text-white transition"
              >Католог</NuxtLink
            >
          </nav>
          <button type="button" class="flex py-3 items-center gap-1">
            <div class="relative">
              <Icon name="heroicons-outline:shopping-cart" size="24" />
              <div
                class="w-4 h-4 bg-green-500 absolute top-[-2px] right-[-3px] text-[10px] rounded-full"
              >
                {{ count }}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
    <main class="pt-13.5">
      <slot></slot>
    </main>
    <footer>
      <div class="container mx-auto">
        <p>Footer content goes here</p>
      </div>
    </footer>
  </div>
</template>
<style scoped></style>
