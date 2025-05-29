<script setup lang="ts">
definePageMeta({
  title: 'Регистрация - Nuxt Shop',
  layout: 'auth',
});

import { useUserStore } from '~/stores/user';

const user = useUserStore();

// user.setUser({
//   fullName: 'Ян Бэнг',
//   email: 'yan@example.com',
// });

const name = ref('');
const mail = ref('');
const pass = ref('');
const error = ref('');
const handleSubmit = async (event: Event) => {
  event.preventDefault(); // предотвратить перезагрузку страницы

  try {
    const response = await fetch('https://175061237ca5525f.mokky.dev/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: name.value,
        email: mail.value,
        password: pass.value,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Ошибка регистрации');
    }

    user.setUser({
      fullName: data.data.fullName,
      email: data.data.email,
      token: data.token,
    });
    if (!response.ok) {
      throw new Error(data.message || 'Ошибка регистрации');
    }
    console.log('Успешная регистрация:', data);
  } catch (err: any) {
    console.error('Ошибка:', err.message);
    if (err.message === 'RESOURCE_USER_ALREADY_EXISTS') {
      error.value = 'Пользователь с такой почтой уже существует';
    } else {
      error.value = 'Произошла ошибка. Попробуйте ещё раз.';
    }
  }
};
</script>

<template>
  <section class="my-20">
    <div class="container">
      <div class="max-w-150 mx-auto">
        <h1 class="font-bold text-4xl">Регистрация</h1>
        <p class="text-gray-800 mt-5">Введите свои данные для регистрации</p>
        <p v-if="error" class="text-red-500 font-bold">{{ error }}</p>
        <form class="my-20 flex gap-5 flex-wrap" @submit="handleSubmit">
          <InputSign label="Полное имя" type="text" name="fullName" v-model="name" />
          <InputSign label="Электронная почта" type="email" name="email" v-model="mail" />
          <InputSign label="Пароль" type="password" name="password" v-model="pass" />
          <div class="flex items-center gap-1 w-full">
            <input type="checkbox" name="check" required />
            <label for="check">Принять правила соглашения</label>
          </div>
          <button
            type="submit"
            class="block py-3 bg-blue-400 text-white rounded font-bold w-full mt-15"
          >
            Регистрироваться
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
