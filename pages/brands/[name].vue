<script setup lang="ts">
definePageMeta({
  layout: 'default',
});
const route = useRoute();
const name = route.params.name;
const loading = ref<boolean>(true);
const snakers = ref([]);
const error = ref<string | null>(null);

async function fetchData() {
  try {
    loading.value = true;
    const response = await fetch(`https://175061237ca5525f.mokky.dev/snakers?brand=${name}`);
    const data = await response.json();
    snakers.value = data;
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    snakers.value = data;
    console.log(snakers);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
onMounted(fetchData);
</script>
<template>
  <section class="my-20">
    <div class="container">
      <div class="flex justify-between items-start flex-wrap">
        <Card
          v-for="snake in snakers"
          :key="snake.id"
          :image="snake.image"
          :title="snake.title"
          :price="snake.price"
        />
      </div>
    </div>
  </section>
</template>
