<script setup lang="ts">
import { ref } from 'vue';
import { signUp } from '@/services/set/signUp';
import { useUserStore } from '~/stores/user';
import { useRouter } from 'vue-router';

definePageMeta({
  title: 'Регистрация — Nuxt Shop',
  layout: 'auth',
});

const user = useUserStore();
const router = useRouter();

const name = ref('');
const mail = ref('');
const pass = ref('');
const error = ref('');

const registerFunction = async (event: Event) => {
  event.preventDefault();
  error.value = '';
  try {
    const data = await signUp(name.value, mail.value, pass.value);
    if (typeof data === 'string') {
      error.value = data;
      return;
    }
    user.setUser(data.data.fullName, data.data.email, data.token, data.data.role, data.data.id);
    await router.push('/');
  } catch (err: any) {
    console.error(err);
    error.value = 'Непредвиденная ошибка при регистрации';
  }
};
</script>

<template>
  <section
    class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
        <h1 class="text-center text-3xl font-extrabold text-gray-900">Регистрация</h1>
        <p class="mt-2 text-center text-sm text-gray-600">Введите свои данные для регистрации</p>
        <p v-if="error" class="mt-4 text-center text-red-500 font-medium">
          {{ error }}
        </p>
        <form class="mt-8 space-y-6" @submit="registerFunction">
          <div class="space-y-4">
            <div>
              <InputSign label="Полное имя" type="text" name="fullName" v-model="name" />
            </div>
            <div>
              <InputSign label="Электронная почта" type="email" name="email" v-model="mail" />
            </div>
            <div>
              <InputSign label="Пароль" type="password" name="password" v-model="pass" />
            </div>
            <div class="flex items-center">
              <input
                id="terms"
                type="checkbox"
                required
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="terms" class="ml-2 block text-sm text-gray-700">
                Принять правила соглашения
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              Зарегистрироваться
            </button>
          </div>

          <div class="text-sm text-center">
            <span class="text-gray-600">У вас есть аккаунт?</span>
            <NuxtLink to="/signIn" class="font-medium text-blue-600 hover:text-blue-800 ml-1">
              Войти
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Все стили заданы через TailwindCSS */
</style>
