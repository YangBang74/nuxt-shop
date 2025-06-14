<script setup lang="ts">
import { useUserStore } from '~/stores/user';

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
  <section class="py-16">
    <div class="container">
      <div class="mx-auto p-8 max-w-2xl bg-white rounded-xl shadow">
        <h1 class="text-3xl font-bold mb-6">Профиль пользователя</h1>

        <div v-if="user">
          <p class="mb-4"><strong>ID:</strong> {{ user.id }}</p>
          <p class="mb-4"><strong>Имя:</strong> {{ user.fullName }}</p>
          <p class="mb-4"><strong>Email:</strong> {{ user.email }}</p>

          <button
            @click="logout"
            class="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Выйти из аккаунта
          </button>
        </div>
        <div v-else>
          <p>Вы не авторизованы.</p>
          <NuxtLink to="/signin" class="text-blue-500 underline">Войти</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
