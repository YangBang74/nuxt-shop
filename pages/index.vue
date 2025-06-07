<script setup lang="ts">
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Navigation as CarouselNavigation, Pagination } from 'vue3-carousel';
import getSneakers from '~/services/get/getSneakers';
import { useUserStore } from '#imports';
import Loader from '~/components/UI/Loader.vue';

const user = useUserStore();

useSeoMeta({
  title: 'YangShop',
  description: 'Добро пожаловать в наш магазин!',
  ogTitle: 'Home Page – My Shop',
});

const snakers = ref([]);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  try {
    snakers.value = await getSneakers();
  } catch (err) {
    error.value = err.message || 'Ошибка при получении данных';
  } finally {
    loading.value = false;
  }
});

const heroSnake = [
  '/hero-snake-1.png',
  '/hero-snake-2.png',
  '/hero-snake-3.png',
  '/hero-snake-4.png',
];

const brands = [
  { name: 'nike', logo: '/brands/Nike-Logo-3.svg' },
  { name: 'adidas', logo: '/brands/adidas-logo-16.svg' },
  { name: 'puma', logo: '/brands/PUMA-Logo-2.svg' },
  { name: 'reebok', logo: '/brands/Reebok_logo-12.svg' },
  { name: 'convers', logo: '/brands/Converse-Logo-1.svg' },
];
</script>
<template>
  <div class="w-full h-[100vh] flex justify-center items-center" v-if="loading">
    <Loader />
  </div>
  <div class="wrap" v-else>
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="flex flex-col-reverse lg:flex-row items-center gap-12">
          <div class="w-full lg:w-1/2">
            <h1 class="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Кроссовки известных брендов
            </h1>
            <p class="text-gray-700 mb-6 leading-relaxed">
              Мы продаем кроссовки брендов Nike, Adidas, Puma, Reebok, Converse и многие другие по
              низким ценам.
            </p>
            <NuxtLink
              to="/sneakers"
              class="inline-block bg-blue-600 text-white text-lg font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Перейти к покупкам
            </NuxtLink>
          </div>
          <Carousel
            :autoplay="4000"
            :wrap-around="true"
            slideEffect="fade"
            :perPage="1"
            class="md:w-1/2 w-full"
          >
            <Slide v-for="snake in heroSnake" :key="snake">
              <NuxtImg
                :src="snake"
                alt="Hero Snake"
                class="w-full h-96 object-contain rounded-lg"
                loading="lazy"
              />
            </Slide>
          </Carousel>
        </div>
      </div>
    </section>
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl lg:text-4xl font-extrabold text-center text-gray-900 mb-12">Бренды</h2>
        <Carousel :wrap-around="true" :gap="32" itemsToShow="auto" class="relative">
          <Slide v-for="(brand, i) in brands" :key="i">
            <div class="flex justify-center items-center p-4">
              <NuxtLink
                :to="`/brands/${brand.name}`"
                class="flex justify-center items-center w-40 h-40 bg-white rounded-lg shadow hover:shadow-lg transition"
              >
                <NuxtImg
                  :src="brand.logo"
                  alt="Brand Logo"
                  class="w-28 h-28 object-contain"
                  loading="lazy"
                />
              </NuxtLink>
            </div>
          </Slide>
          <template #addons>
            <CarouselNavigation>
              <template #prev>
                <span
                  class="left-2 top-1/2 h-10 w-10 flex justify-center items-center transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                >
                  <Icon name="lucide:chevron-left" class="w-6 h-6 text-gray-800" />
                </span>
              </template>
              <template #next>
                <span
                  class="right-2 top-1/2 h-10 w-10 flex justify-center items-center transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                >
                  <Icon name="lucide:chevron-right" class="w-6 h-6 text-gray-800" />
                </span>
              </template>
            </CarouselNavigation>
            <Pagination class="mt-8" />
          </template>
        </Carousel>
      </div>
    </section>
    <section class="my-40">
      <div class="container">
        <h1 class="font-bold text-center text-4xl mb-20">Новое поступлание</h1>
        <div class="flex justify-between items-center relative">
          <Carousel
            :wrap-around="true"
            :gap="50"
            :loop="true"
            itemsToShow="auto"
            class="w-full"
            snapAlign="start"
          >
            <Slide v-for="(snake, i) in snakers.slice(0, 10)" :key="i">
              <CartItems :item="snake" />
            </Slide>
            <template #addons>
              <CarouselNavigation class="items">
                <template #prev>
                  <button
                    class="bg-white px-2 h-10 w-10 flex justify-center items-center rounded-full shadow hover:bg-gray-100 transition"
                  >
                    <Icon name="lucide:chevron-left" class="w-6 h-6 text-gray-800" />
                  </button>
                </template>
                <template #next>
                  <button
                    type="button"
                    class="bg-white px-2 h-10 w-10 flex justify-center items-center rounded-full shadow hover:bg-gray-100 transition"
                  >
                    <Icon name="lucide:chevron-right" class="w-8 h-8" />
                  </button>
                </template>
              </CarouselNavigation>
              <Pagination />
            </template>
          </Carousel>
        </div>
      </div>
    </section>
    <section class="about text-white">
      <div class="container">
        <div class="flex md:flex-row items-center flex-col-reverse gap-5">
          <div class="md:w-1/2 w-full">
            <h1 class="text-3xl font-bold">Пара слов о нас</h1>
            <p class="my-5">
              Спорт держит нас в форме. Учит дисциплине. Объединяет нас. Через спорт мы можем менять
              жизни. В том числе с помощью воодушевляющих историй спортсменов. Чтобы помочь тебе
              подняться и двигаться вперед.
            </p>
            <p class="font-bold text-right text-xl">- NuxtShop</p>
          </div>
          <div class="md:w-1/2 w-full text-center flex justify-center">
            <NuxtImg
              src="/about/about.jpg"
              alt="Sneaker"
              class="about-img object-contain max-h-100"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style>
.items.carousel__next,
.items.carousel__prev {
  position: absolute;
  top: -25px;
}
.items.carousel__next {
  left: 55px;
}
.carousel__pagination {
  bottom: -30px;
  left: 50%;
}
.about {
  background: url('/about/about-vector.svg') no-repeat left top #484283;
}
.about-img {
  clip-path: polygon(37% 0, 100% 0, 68% 100%, 0% 100%);
}
</style>
