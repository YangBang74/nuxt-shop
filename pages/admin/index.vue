<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});

const addIsActive = ref<boolean>(false);
</script>
<template>
  <div class="flex flex-col justify-between h-full">
    <header class="fixed bg-black text-white w-full">
      <div class="container">
        <div class="flex justify-between items-center gap-10">
          <div class="font-bold text-lg py-3">Nuxt Shop</div>
          <button class="bg-green-500 rounded py-1 px-6">Добавить товар</button>
        </div>
      </div>
    </header>
    <main class="flex-1 pt-12">
      <aside class="flex flex-col text-white bg-gray-600 h-full max-w-20">
        <div class="flex items-center justify-left">
          Меню
          <button type="button" class="block my-1.5">
            <span class="block h-px bg-white w-full"></span>
          </button>
        </div>
        <button type="button" class="bg-green-500text-left">Добавить новый товар</button>
        <button type="button" class="text-left">Изменить старые товары</button>
      </aside>
      <div class="flex"></div>
    </main>
    <footer class="bg-black text-white">Footer</footer>
  </div>
</template>
