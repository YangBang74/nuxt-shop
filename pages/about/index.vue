<script setup lang="ts">
useSeoMeta({
  title: 'О нас – YangShop',
  description: 'Узнайте больше о команде YangShop и нашей миссии.',
  ogTitle: 'О нас – YangShop',
});

const team = [
  {
    name: 'Ян',
    role: 'Основатель и разработчик',
    photo: '/user.jpg',
  },
  {
    name: 'Алиса',
    role: 'Дизайнер UI/UX',
    photo: '/user.jpg',
  },
  {
    name: 'Максим',
    role: 'Менеджер по продукту',
    photo: '/user.jpg',
  },
];
</script>

<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="flex flex-col-reverse md:flex-row items-center gap-12">
        <div class="w-full">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">О YangShop</h1>
          <p class="text-gray-700 leading-relaxed mb-6">
            Мы — команда энтузиастов, которые любят спорт, стиль и технологии. YangShop был создан с
            целью сделать модную обувь доступной каждому. Мы следим за последними трендами и
            предлагаем только лучшие бренды.
          </p>
          <p class="text-gray-700 leading-relaxed">
            Наша миссия — вдохновлять двигаться вперёд, быть активными и не терять стиль. Мы верим,
            что каждый заслуживает качественную и красивую обувь.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Наша команда</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <div
          v-for="member in team"
          :key="member.name"
          class="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-center"
        >
          <NuxtImg
            :src="member.photo"
            alt="Team member"
            class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 class="text-xl font-bold text-gray-800">{{ member.name }}</h3>
          <p class="text-gray-600">{{ member.role }}</p>
        </div>
      </div>
    </div>
  </section>
  <section class="about text-white py-20">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold mb-6">Что делает нас особенными?</h2>
        <p class="text-lg leading-relaxed">
          Мы стремимся предложить лучший пользовательский опыт, быструю доставку и персональный
          подход к каждому клиенту. Наш магазин — это не просто покупки, это стиль жизни.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: url('/about/about-vector.svg') no-repeat left top #484283;
}
</style>
