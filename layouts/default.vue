<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '#imports';

const user = useUserStore();
const route = useRoute();

const cart = useCartShop();
const modalIsActive = ref<boolean>(false);

const showBlackBar = ref(true);
let lastScrollY = 0;
const delta = 10;

function onScroll() {
  const current = window.scrollY;
  if (Math.abs(current - lastScrollY) < delta) return;
  showBlackBar.value = current < lastScrollY;
  lastScrollY = current;
}

watch(route, () => {
  modalIsActive.value = false;
});

onMounted(() => window.addEventListener('scroll', onScroll));
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));
</script>
<template>
  <div class="layout flex flex-col justify-between h-full">
    <header class="relative z-50">
      <div
        :class="[
          'fixed top-0 left-0 w-full bg-black/95 text-white transition-transform',
          showBlackBar ? 'translate-y-0' : '-translate-y-full',
        ]"
      >
        <div class="container mx-auto">
          <div class="flex justify-between items-center gap-5 relative">
            <NuxtLink to="/" class="font-bold py-3">En.Shop</NuxtLink>
            <HeaderSearch />
            <div class="flex items-center gap-4">
              <button type="button">
                <NuxtLink to="/signUp" v-if="user.token === null">
                  <Icon name="mdi:account" size="27" />
                </NuxtLink>
                <NuxtLink to="/profile" v-else>
                  <Icon name="mdi:account" size="27" />
                </NuxtLink>
              </button>
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
                    {{ cart.sneakers.length }}
                  </div>
                </div>
              </button>
              <ModalCart
                :style="{ display: modalIsActive ? 'block' : 'none' }"
                v-model:modal="modalState"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-blue-950 text-white pt-13.5">
        <div class="container">
          <nav class="flex gap-10">
            <NuxtLink to="/" class="py-3 text-gray-300 hover:text-white transition">
              Главная
            </NuxtLink>
            <NuxtLink to="/sneakers" class="py-3 text-gray-300 hover:text-white transition">
              Каталог
            </NuxtLink>
            <NuxtLink to="/about" class="py-3 text-gray-300 hover:text-white transition">
              О нас
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>
