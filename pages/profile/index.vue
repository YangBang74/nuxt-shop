<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '#imports';

definePageMeta({
  layout: 'default',
  middleware: 'auth',
});

const userStore = useUserStore();
const user = computed(() => userStore);

const router = useRouter();

const logout = () => {
  userStore.logout();
  router.push('/');
};
</script>

<template>
  <section class="py-20 min-h-screen">
    <div class="container">
      <div
        class="flex items-start bg-white rounded-2xl shadow-xl p-8 justify-center gap-5 md:flex-nowrap flex-wrap"
      >
        <div>
          <NuxtImg src="user.jpg" loading="lazy" class="max-w-50 aspect-[1/1]" />
        </div>
        <div class="w-full">
          <h1 class="text-4xl font-bold mb-8 text-gray-800">Профиль</h1>

          <div v-if="user">
            <div class="mb-6 flex items-center gap-2">
              <span class="block text-gray-700 font-semibold">Имя:</span>
              <span class="text-gray-800 text-lg">{{ user.fullName }}</span>
            </div>

            <p class="mb-6 text-gray-700"><strong>Email:</strong> {{ user.email }}</p>
          </div>

          <div v-else class="text-center text-gray-600">
            <p>Вы не авторизованы.</p>
            <NuxtLink to="/signin" class="text-blue-500 underline">Войти</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="">
    <div class="container">
      .
    </div>
  </section>
  <section class="my-5">
    <div class="container">
      <button
        @click="logout"
        class="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Выйти
      </button>
    </div>
  </section>
</template>
