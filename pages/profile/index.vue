<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'default',
  middleware: 'auth',
});

const userStore = useUserStore();
const user = computed(() => userStore);

const router = useRouter();
const editing = ref(false);
const fullName = ref(user.value.fullName);

const startEdit = () => {
  fullName.value = user.value.fullName;
  editing.value = true;
};

const saveName = async () => {
  try {
    await userStore.updateUser({ fullName: fullName.value });
    editing.value = false;
  } catch (error) {
    console.error('Ошибка при обновлении имени:', error);
  }
};

const logout = () => {
  userStore.logout();
  router.push('/');
};
</script>

<template>
  <section class="py-20 bg-gray-50 min-h-screen">
    <div class="container">
      <div class="mx-auto max-w-xl bg-white rounded-2xl shadow-lg p-10">
        <h1 class="text-4xl font-bold mb-8 text-gray-800">Профиль</h1>

        <div v-if="user">
          <p class="mb-4 text-gray-700"><strong>ID:</strong> {{ user.id }}</p>
          <p class="mb-6 text-gray-700">
            <strong>Имя:</strong>
            <span v-if="!editing">{{ user.fullName }}</span>
            <input
              v-else
              v-model="fullName"
              class="border rounded px-3 py-2 w-full mt-2"
              placeholder="Введите новое имя"
            />
          </p>

          <div class="flex gap-3">
            <button
              v-if="!editing"
              @click="startEdit"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Изменить имя
            </button>
            <button
              v-else
              @click="saveName"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Сохранить
            </button>
            <button
              @click="logout"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Выйти
            </button>
          </div>
        </div>

        <div v-else class="text-center text-gray-600">
          <p>Вы не авторизованы.</p>
          <NuxtLink to="/signin" class="text-blue-500 underline">Войти</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
