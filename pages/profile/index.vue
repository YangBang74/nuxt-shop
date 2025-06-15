<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '#imports';
import type { Sneaker } from '~/shared/types/sneaker';
import { getUser } from '~/services/get/getUserDates';
import { fetchMultipleSneakers } from '~/services/get/getSneakersManyId';
import Loader from '~/components/UI/Loader.vue';

definePageMeta({
  layout: 'default',
});

const user = ref<{ fullName: string; email: string } | null>(null);
const userStore = useUserStore();

const loading = ref<boolean>(false);
const sneakers = ref<Sneaker[]>([]);

onMounted(async () => {
  loading.value = true;
  try {
    const userData = await getUser();
    user.value = userData;
    console.log(user.value);

    const cartIds = Array.isArray(userData?.cart)
      ? userData.cart.map((item: { id: string; size: number }) => item.id)
      : [];
    if (cartIds.length) {
      await fetchMultipleSneakers(sneakers, cartIds);
    }
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
});

const router = useRouter();

const logout = () => {
  userStore.logout();
  router.push('/');
};
</script>
<template>
  <div class="w-full h-[100vh] flex justify-center items-center" v-if="loading">
    <Loader />
  </div>
  <div v-else>
    <section class="py-10">
      <div class="container">
        <div class="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-6 items-start">
          <NuxtImg src="user.jpg" loading="lazy" class="w-32 h-32 object-cover rounded-xl" />
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-gray-900 mb-6">Профиль пользователя</h1>

            <div v-if="user" class="space-y-3">
              <div class="text-gray-700">
                <span class="font-semibold">Имя:</span>
                <span class="ml-1 text-gray-900">{{ user.fullName }}</span>
              </div>
              <div class="text-gray-700">
                <span class="font-semibold">Email:</span>
                <span class="ml-1 text-gray-900">{{ user.email }}</span>
              </div>
            </div>

            <div v-else class="text-center text-gray-600">
              <p>Вы не авторизованы.</p>
              <NuxtLink to="/signin" class="text-blue-500 underline">Войти</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="my-10">
      <div class="container">
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Мои покупки</h2>

          <div v-if="sneakers.length" class="flex items-start justify-start gap-10">
            <div
              v-for="(sneak, i) in sneakers"
              :key="sneak.id"
              class="group border border-gray-200 rounded-xl p-4 bg-gray-50 hover:bg-white shadow-sm hover:shadow-md transition"
            >
              <NuxtImg
                :src="sneak.image"
                alt="sneaker image"
                class="w-30 aspect-[1/1] mx-auto object-contain rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
              />
              <h3 class="text-lg font-semibold text-gray-900 mb-1 whitespace-nowrap line-clamp-1">
                {{ sneak.title }}
              </h3>
              <p class="text-gray-700 mb-1">{{ sneak.price }} TMT</p>
              <p class="text-sm text-gray-500">
                Размер:
                {{ user?.cart.find((item) => Number(item.id) === sneak.id)?.size || 'неизвестен' }}
              </p>
            </div>
          </div>

          <p v-else class="text-gray-600">У вас пока нет покупок.</p>
        </div>
      </div>
    </section>
    <section class="my-10">
      <div class="container">
        <button
          @click="logout"
          class="w-full sm:w-auto mx-auto block px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  </div>
</template>
