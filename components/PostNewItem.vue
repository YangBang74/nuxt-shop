<script setup lang="ts">
import { addCart } from '~/services/set/addNewItem';

const cartName = ref<string | null>(null);
const cartPrice = ref<number | null>(null);
const cartBrand = ref<string | null>(null);
const cartImage = ref<string | null>(null);
const cartSizes = ref<number[] | null[]>([]);
const cartStyles = ref<string[] | null[]>([]);
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
  <article class="p-6 sm:p-10 bg-white shadow-xl rounded-xl max-w-150 my-10 mx-auto">
    <h1 class="font-bold text-2xl mb-6 text-center text-gray-800">Добавить новый товар</h1>
    <form class="flex flex-col gap-4" @submit="addItem">
      <InputSign label="Название товара" v-model="cartName" type="text" name="cartName" />
      <InputSign label="Цена" v-model="cartPrice" type="number" name="cartPrice" />
      <InputSign label="Бренд" v-model="cartBrand" type="text" name="cartBrand" />
      <InputSign label="Ссылка на изображение" v-model="cartImage" type="text" name="cartImage" />

      <div>
        <p class="text-gray-700 mb-2 font-medium">Размер</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(size, i) in sizes"
            :key="i"
            type="button"
            class="w-10 h-10 border rounded-full flex items-center justify-center text-sm transition-all duration-200 ease-in-out"
            :class="
              cartSizes.includes(size)
                ? 'bg-green-600 text-white border-green-600 shadow'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            "
            @click="selectSize(size)"
          >
            {{ size }}
          </button>
        </div>
      </div>

      <div>
        <p class="text-gray-700 mb-2 font-medium">Стили</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(style, i) in styles"
            :key="i"
            type="button"
            class="px-4 py-1.5 rounded-full text-sm transition-all duration-200 ease-in-out"
            :class="
              cartStyles.includes(style)
                ? 'bg-green-600 text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            "
            @click="selectStyles(style)"
          >
            {{ style }}
          </button>
        </div>
      </div>

      <button
        type="submit"
        class="mt-6 bg-green-600 text-white py-2.5 rounded-lg text-lg font-medium hover:bg-green-700 transition-all"
      >
        Добавить товар
      </button>
    </form>
  </article>

  <!-- Сообщение об успешном добавлении -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="messageIsActive"
        class="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
      >
        <div class="bg-white rounded-xl p-6 w-80 text-center shadow-lg animate-fade-in">
          <p class="text-lg font-semibold text-gray-800">Товар успешно добавлен!</p>
          <button
            @click="message"
            class="mt-4 bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition"
          >
            Хорошо
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
