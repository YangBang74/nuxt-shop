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
  <section class="py-20 bg-gray-100 min-h-screen">
    <div class="container">
      <div class="mx-auto max-w-xl bg-white rounded-2xl shadow-xl p-10">
        <h1 class="text-4xl font-bold mb-8 text-gray-800">Профиль</h1>

        <div v-if="user">
          <p class="mb-4 text-gray-700"><strong>ID:</strong> {{ user.id }}</p>

          <div class="mb-6">
            <label class="block text-gray-700 font-semibold mb-2">Имя:</label>
            <div class="flex items-center gap-3">
              <span class="text-gray-800 text-lg">{{ user.fullName }}</span>
            </div>
          </div>

          <p class="mb-6 text-gray-700"><strong>Email:</strong> {{ user.email }}</p>

          <button
            @click="logout"
            class="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Выйти
          </button>
        </div>

        <div v-else class="text-center text-gray-600">
          <p>Вы не авторизованы.</p>
          <NuxtLink to="/signin" class="text-blue-500 underline">Войти</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
