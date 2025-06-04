<script setup lang="ts">
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Navigation as CarouselNavigation, Pagination } from 'vue3-carousel';
import getSneakers from '~/services/get/getSneakers';
import { useUserStore } from '#imports';

const user = useUserStore();

definePageMeta({
  layout: 'default',
  title: 'Home Page',
  meta: [
    { name: 'description', content: 'Добро пожаловать в наш магазин!' },
    { property: 'og:title', content: 'Home Page – My Shop' },
    { property: 'og:image', content: '/og-image-home.png' },
  ],
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
  <section class="md:my-20 my-10">
    <div class="container">
      <div class="flex items-center justify-between md:flex-row flex-col-reverse gap-y-10">
        <div class="md:w-1/2 w-full">
          <h1 class="font-bold text-4xl">Кроссовки известных брендов</h1>
          <p class="mt-3 mb-13">
            Мы продаем кроссовки брендов Nike, Adidas, Puma, Reebok, Converse и многие другие по
            низким ценам
          </p>
          <NuxtLink
            to="/sneakers"
            class="bg-blue-950 text-white px-10 py-3 rounded hover:bg-blue-800 transition"
            >Перейти к покупкам</NuxtLink
          >
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
  <section class="my-20">
    <div class="container">
      <h1 class="font-bold text-center text-4xl mb-20">Бренды</h1>
      <div class="flex justify-between items-center">
        <Carousel :wrap-around="true" :gap="50" itemsToShow="auto" class="w-full">
          <Slide v-for="(brand, i) in brands" :key="i">
            <NuxtLink :to="`/brands/${brand.name}`" class="w-60 h-40 flex justify-center">
              <NuxtImg
                :src="brand.logo"
                class="w-32 h-32 object-contain rounded-lg"
                loading="lazy"
              />
            </NuxtLink>
          </Slide>
          <template #addons>
            <CarouselNavigation />
            <Pagination />
          </template>
        </Carousel>
      </div>
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
          <Slide v-for="(snake, i) in snakers" :key="snake.id">
            <CartItems
              :image="snake.image"
              :id="snake.id"
              :title="snake.title"
              :price="snake.price"
            />
          </Slide>
          <template #addons>
            <CarouselNavigation class="items">
              <template #prev>
                <button
                  type="button"
                  class="bg-white px-2 h-10 w-10 flex justify-center items-center rounded-full shadow hover:bg-gray-100 transition"
                >
                  <Icon name="lucide:chevron-left" class="w-6 h-6" />
                </button>
              </template>
              <template #next>
                <button
                  type="button"
                  class="bg-white px-2 h-10 w-10 flex justify-center items-center rounded-full shadow hover:bg-gray-100 transition"
                >
                  <Icon name="lucide:chevron-right" class="w-8 h-8" />
                </span>
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
          <NuxtImg src="/about/about.jpg" alt="Sneaker" class="about-img object-cover max-h-100" />
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.items.carousel__next,
.items.carousel__prev {
  position: absolute;
  top: -20px;
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
