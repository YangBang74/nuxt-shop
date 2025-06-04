<script setup lang="ts">
import getSneakers from '@/services/get/getSneakers';

definePageMeta({
  layout: 'auth',
});

const activeModule = useCookie<'home' | 'add' | 'change'>('activeModule', {
  default: () => 'home',
});

const addIsActive = computed(() => activeModule.value === 'add');
const changeIsActive = computed(() => activeModule.value === 'change');

const setModule = (module: 'home' | 'add' | 'change') => {
  activeModule.value = module;
};

const sneakers = ref([]);
const loading = ref(false);
const fetchSneakersList = async () => {
  loading.value = true;
  try {
    const data = await getSneakers();
    sneakers.value = data;
  } catch (err: any) {
    return err?.message || 'Ошибка при получении данных';
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  fetchSneakersList();
});

watch(addIsActive, (now) => {
  if (!now) {
    fetchSneakersList();
  }
});
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <header class="relative bg-black/70 text-white w-full z-50 border-b border-black/30">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center gap-10">
          <div class="font-medium text-lg py-3"><Logo class="h-10 w-40 text-white" /></div>
          <p>Admin</p>
        </div>
      </div>
    </header>
    <main class="flex-1 w-full flex h-full">
      <aside class="flex flex-col text-white bg-black/70 h-full w-65 gap-3 py-3 pr-5">
        <button
          type="button"
          class="flex items-center py-2 pl-10 pr-7 gap-3 rounded-r-2xl"
          @click="setModule('home')"
          :class="{ 'bg-white text-black/70': activeModule === 'home' }"
        >
          <Icon name="fa6-solid:house" size="20" />
          Главная
        </button>
        <button
          type="button"
          class="flex items-center py-2 pl-10 pr-7 gap-3 rounded-r-2xl"
          @click="setModule('add')"
          :class="{ 'bg-white text-black/70': activeModule === 'add' }"
        >
          <Icon name="fa6-solid:circle-plus" size="20" />
          Добавить новый
        </button>
        <button
          type="button"
          class="flex items-center py-2 pl-10 pr-7 gap-3 rounded-r-2xl"
          @click="setModule('change')"
          :class="{ 'bg-white text-black/70': activeModule === 'change' }"
        >
          <Icon name="mdi:pencil" class="w-5 h-5" />
          Изменить товар
        </button>
      </aside>
      <div v-if="activeModule === 'home'">
        <div class="flex justify-start gap-5 items-start flex-wrap p-5">
          <CartItems v-for="(item, i) in sneakers" :key="i" :item="item" />
        </div>
      </div>
      <PostNewItem v-if="activeModule === 'add'" @close="setModule('home')" />
      <div v-if="activeModule === 'change'">
        <div class="flex flex-col py-5 gap-3">
          <ChangeCart
            v-for="(item, i) in sneakers"
            :key="i"
            :title="item.title"
            :price="item.price"
            :rating="item.rating"
            :image="item.image"
            :sizes="item.sizes"
            :styles="item.styles"
            :brand="item.brand"
            :id="item.id"
          />
        </div>
      </div>
    </main>
    <footer class="bg-black text-white text-center">Footer</footer>
  </div>
</template>
