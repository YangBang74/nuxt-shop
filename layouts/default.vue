<script setup lang="ts">
import { useCardShop } from '@/stores/card';
import ModalCard from '~/components/ModalCard.vue';
const card = useCardShop();

const modalIsActive = ref<boolean>(false);
</script>

<template>
  <div class="layout flex flex-col justify-between">
    <header class="fixed z-1000 w-full bg-blue-950 text-white">
      <div class="container mx-auto">
        <div class="flex justify-between items-center gap-5 relative">
          <div class="font-bold py-3">Nuxt Shop</div>
          <nav class="flex gap-10">
            <NuxtLink to="/" class="py-3 text-gray-300 hover:text-white transition">
              Главная
            </NuxtLink>
            <NuxtLink to="/about" class="py-3 text-gray-300 hover:text-white transition">
              Каталог
            </NuxtLink>
          </nav>
          <button
            type="button"
            @click="modalIsActive = !modalIsActive"
            class="flex py-3 items-center gap-1 relative"
          >
            <div class="relative">
              <Icon name="heroicons-outline:shopping-cart" size="24" />
              <div
                class="w-4 h-4 bg-green-500 absolute top-[-2px] right-[-3px] text-[10px] rounded-full text-center"
              >
                {{ card.sneakers.length }}
              </div>
            </div>
          </button>
          <ModalCard :style="{ display: modalIsActive ? 'block' : 'none' }" />
        </div>
      </div>
    </header>
    <main class="pt-13.5 flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>
