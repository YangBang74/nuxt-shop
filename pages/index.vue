<script setup lang="ts">
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'default',
  title: 'Home Page',
  meta: [
    { name: 'description', content: 'Добро пожаловать в наш магазин!' },
    { property: 'og:title', content: 'Home Page – My Shop' },
    { property: 'og:image', content: '/og-image-home.png' },
  ],
});



<template>
  <section>
    <div class="container mx-auto">
      <div class="flex items-start gap-10">
        <Filter />
        <div class="flex justify-between items-start gap-5">
          <Card
            v-for="(sneaker, i) in snakers"
            :key="i"
            :title="sneaker.title"
            :sizes="sneaker.sizes"
            :price="sneaker.price"
            :image="sneaker.image"
            :id="sneaker.id"
          />
        </div>
      </div>
    </div>
  </section>
</template>
