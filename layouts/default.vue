<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '#imports';
import { useCartShop } from '#imports';

const user = useUserStore();
const route = useRoute();

const cart = useCartShop();
const modalIsActive = ref<boolean>(false);
const modalState = ref<boolean>(false);
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
            <NuxtLink to="/" class="font-bold">
              <Logo class="text-white h-12 w-40" />
            </NuxtLink>
            <HeaderSearch />
            <div class="flex items-center gap-4">
              <button type="button">
                <NuxtLink to="/signIn" v-if="user.fullName === null">
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
      <div class="bg-black/60 text-white pt-13.5">
        <div class="container">
          <nav class="flex gap-10">
            <NuxtLink to="/" class="py-3 transition"> Главная </NuxtLink>
            <NuxtLink to="/sneakers" class="py-3 transition"> Каталог </NuxtLink>
            <NuxtLink to="/about" class="py-3 transition"> О нас </NuxtLink>
          </nav>
        </div>
      </div>
    </header>
    <main class="flex-1">
      <slot />
    </main>
    <footer class="bg-black text-white">
      <div class="container mx-auto">
        <div class="flex justify-between items-center">
          <div>
            <p class="font-bold text-lg py-1"><Logo class="text-white h-12 w-40" /></p>
          </div>
          <nav class="flex gap-3 items-center">
            <NuxtLink
              to="https://github.com/yangbang74"
              class="hover:text-gray-500"
              target="_blank"
            >
              <Icon name="mdi:github" size="20" />
            </NuxtLink>
            <NuxtLink to="https://t.me/itisyang" class="hover:text-blue-500" target="_blank">
              <Icon name="mdi:telegram" size="20" />
            </NuxtLink>
            <NuxtLink
              to="https://www.instagram.com/yangbang74/"
              class="hover:text-gray-500"
              target="_blank"
            >
              <Icon name="mdi:instagram" size="20" />
            </NuxtLink>
          </nav>
        </div>
      </div>
    </footer>
  </div>
</template>
