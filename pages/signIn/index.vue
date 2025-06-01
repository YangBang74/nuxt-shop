<script setup lang="ts">
import { signIn } from '@/services/set/signIn';
import { useUserStore } from '~/stores/user';

definePageMeta({
  title: 'Регистрация - Nuxt Shop',
  layout: 'auth',
});

const user = useUserStore();

const registerFunction = async (event: Event) => {
  event.preventDefault();
  error.value = '';
  try {
    const data = await signIn(mail.value, pass.value);
    if (typeof data === 'string') {
      error.value = data;
      return;
    }
    console.log(data);
    user.setUser(data.data.fullName, data.data.email, data.token);
    if (user.email === 'yangproger@gmail.com' && user.token === '123123') {
      navigateTo('/admin');
    } else navigateTo('/');
  } catch (err: any) {
    console.error(err);
    error.value = 'Непредвиденная ошибка при регистрации';
  }
};

const name = ref('');
const mail = ref('');
const pass = ref('');
const error = ref('');
</script>

<template>
  <section class="my-20">
    <div class="container">
      <div class="max-w-150 mx-auto">
        <h1 class="font-bold text-4xl">Войти</h1>
        <p class="text-gray-800 mt-5">Введите свои данные для входа в свой аккаунт</p>
        <p v-if="error" class="text-red-500 font-bold">{{ error }}</p>
        <form class="my-20 flex gap-5 flex-wrap" @submit="registerFunction">
          <InputSign label="Электронная почта" type="email" name="email" v-model="mail" />
          <InputSign label="Пароль" type="password" name="password" v-model="pass" />
          <div class="flex items-center gap-1 w-full">
            <input type="checkbox" name="check" required />
            <label for="check">Принять правила соглашения</label>
          </div>
          <button
            type="submit"
            class="block py-3 bg-blue-400 text-white rounded font-bold w-full mt-5"
          >
            Регистрироваться
          </button>
          <div class="mx-auto my-5">
            У вас нету аккаунта? <NuxtLink to="signUp" class="text-blue-500">Регистрация</NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
