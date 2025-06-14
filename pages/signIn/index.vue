<script setup lang="ts">
import { signIn } from '@/services/set/signIn';
import { useUserStore } from '~/stores/user';
import type { UserRole } from '~/stores/user';
import type { Sign } from '~/shared/types/sign';

definePageMeta({
  title: 'Вход — Nuxt Shop',
  layout: 'auth',
});

const user = useUserStore();
const router = useRouter();

const mail = ref('');
const pass = ref('');
const error = ref('');

const registerFunction = async (event: Event) => {
  event.preventDefault();
  error.value = '';
  try {
    const response = await signIn(mail.value, pass.value);
    if (typeof response === 'string') {
      error.value = response;
      return;
    }
    const data = response as Sign;
    const role = data.data.role as UserRole;
    user.setUser(data.data.fullName, data.data.email, data.token, role, data.data.id);

    await router.push('/');
  } catch (err: unknown) {
    console.error(err);
    error.value = 'Непредвиденная ошибка при входе';
  }
};
</script>

<template>
  <section
    class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
        <h1 class="text-center text-3xl font-extrabold text-gray-900">Войти</h1>
        <p class="mt-2 text-center text-sm text-gray-600">
          Введите свои данные для входа в аккаунт
        </p>
        <p v-if="error" class="mt-4 text-center text-red-500 font-medium">
          {{ error }}
        </p>
        <form class="mt-8 space-y-6" @submit="registerFunction">
          <div class="-space-y-px">
            <div class="mb-4">
              <InputSign label="Электронная почта" type="email" name="email" v-model="mail" />
            </div>
            <div>
              <InputSign label="Пароль" type="password" name="password" v-model="pass" />
            </div>
          </div>
          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              Войти
            </button>
          </div>
          <div class="text-sm text-center">
            <span class="text-gray-600">У вас нет аккаунта?</span>
            <NuxtLink to="/signUp" class="font-medium text-blue-600 hover:text-blue-800 ml-1">
              Зарегистрироваться
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
