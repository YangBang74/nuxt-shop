<script setup lang="ts">
import { addCart } from '~/services/set/addNewItem';

const cartName = ref<string | null>(null);
const cartPrice = ref<number | null>(null);
const cartBrand = ref<string | null>(null);
const cartImage = ref<string | null>(null);
const cartSizes = ref<number[]>([]);
const cartStyles = ref<string[]>([]);
const sizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
const styles = ['running', 'casual', 'basketball', 'skate', 'minimal'];
const messageIsActive = ref<boolean>(false);

const selectSize = (item: number) => {
  const idx = cartSizes.value.indexOf(item);
  if (idx === -1) {
    cartSizes.value.push(item);
  } else {
    cartSizes.value.splice(idx, 1);
  }
};

const selectStyles = (item: string) => {
  const idx = cartStyles.value.indexOf(item);
  if (idx === -1) {
    cartStyles.value.push(item);
  } else {
    cartStyles.value.splice(idx, 1);
  }
};

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const message = () => {
  if (!messageIsActive) {
    messageIsActive.value = true;
    setTimeout(() => {
      messageIsActive.value = false;
    }, 2000);
  } else {
    messageIsActive.value = false;
  }
};

const addItem = (event: Event) => {
  event.preventDefault();
  // prettier-ignore
  const newProduct = {
    'title': cartName.value,
    'image': cartImage.value,
    'sizes': cartSizes.value,
    'style': cartStyles.value,
    'price': Number(cartPrice.value),
    'brand': cartBrand.value,
    'rating': 0,
  //
  };
  try {
    const data = addCart(newProduct);
    cartName.value = null;
    cartPrice.value = null;
    cartBrand.value = null;
    cartImage.value = null;
    cartSizes.value = [];
    cartStyles.value = [];
    message();
  } catch (err) {
    return err?.message;
  }
};
</script>

<template>
  <article class="p-5 px-10 rounded-sm max-w-150 mx-auto">
    <h1 class="font-bold text-lg mb-4 text-center">Добавить новый товар</h1>
    <form class="flex flex-col gap-4" @submit="addItem">
      <InputSign label="Название товара" v-model="cartName" type="text" name="cartName" />
      <InputSign label="Цена" v-model="cartPrice" type="text" name="cartPrice" />
      <InputSign label="Бренд" v-model="cartBrand" type="text" name="cartBrand" />
      <InputSign label="Ссылка на изображение" v-model="cartImage" type="text" name="cartImage" />
      <div>
        <p class="text-gray-900 mb-2">Размер</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(size, i) in sizes"
            :key="i"
            type="button"
            class="w-8 h-8 border border-gray-400 flex items-center justify-center rounded"
            @click="selectSize(size)"
            :class="cartSizes.includes(size) ? 'bg-green-500 text-white' : ''"
          >
            {{ size }}
          </button>
        </div>
      </div>
      <div>
        <p class="text-gray-900 mb-2">Стили</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(style, i) in styles"
            :key="i"
            type="button"
            class="px-3 py-1 border border-gray-400 rounded"
            @click="selectStyles(style)"
            :class="cartStyles.includes(style) ? 'bg-green-500 text-white' : ''"
          >
            {{ style }}
          </button>
        </div>
      </div>
      <button type="submit" class="mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Добавить товар
      </button>
    </form>
  </article>
  <Teleport to="body">
    <Transition name="modal">
      <div
        class="w-full h-full left-0 top-0 bg-black/80 justify-center items-center overflow-auto"
        :class="messageIsActive ? 'flex' : 'hidden'"
      >
        <div class="bg-white py-5 px-10 rounded-lg font-medium">
          <p>Товар успешно добавлен</p>
          <button
            @click="message()"
            type="button"
            class="bg-green-500 rounded-sm text-white block py-1 w-full mt-5"
          >
            хорошо
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style scoped></style>
