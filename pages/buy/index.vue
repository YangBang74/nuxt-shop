<script setup lang="ts">
import { sendTelegramMessage } from '~/services/set/sendTelegramBot';
import ButtonLoader from '~/components/UI/ButtonLoader.vue';
const cart = useCartShop();
const name = ref('');
const phone = ref('+993 ');
const city = ref('');
const address = ref('');
const details = ref('');
const sumPrice = ref<number>(0);
const buttonLoader = ref<boolean>(false);

function CartToString() {
  if (!cart.sneakers || cart.sneakers.length === 0) {
    return 'Корзина пуста';
  }
  return cart.sneakers
    .map((item, index) => {
      return `Товар: ${index + 1}. ${item.title} — ${item.price}tmt - id: ${item.id}`;
    })
    .join('\n');
}

onMounted(() => {
  sumPrice.value = cart.sneakers.reduce((acc, item) => acc + item.price, 0);
});

const submitOrder = async () => {
  buttonLoader.value = true;
  try {
    const message = `
Новый заказ!
Имя: ${name.value}
Телефон: ${phone.value}
Город: ${city.value}
Адрес: ${address.value}
Комментарий: ${details.value || 'Без комментария'}
Количество товаров: ${cart.sneakers.length}
Общая сумма: ${sumPrice.value + 20}тмт
${CartToString()}`;
    await sendTelegramMessage(message);
    alert('Заказ отправлен! Спасибо за заказ');
    name.value = '';
    phone.value = '+993';
    city.value = '';
    address.value = '';
    details.value = '';
    cart.nullItems();
  } catch (err) {
    return err;
  } finally {
    buttonLoader.value = false;
  }
};
</script>
<template>
  <section class="my-10 mb-30">
    <div class="container">
      <div
        class="flex md:flex-nowrap flex-col md:flex-row flex-wrap my-10 gap-10 justify-evenly items-start"
        v-if="cart.sneakers.length"
      >
        <form @submit.prevent="submitOrder" class="order-form flex flex-col gap-3">
          <h1 class="font-bold text-3xl mb-5">Корзина</h1>
          <div class="flex gap-3 flex-wrap items-center">
            <label for="name" class="w-25">Ваше имя:</label>
            <input v-model="name" type="text" required class="border py-1 px-3 rounded" />
          </div>
          <div class="flex gap-3 flex-wrap items-center">
            <label for="phone" class="w-25">Телефон:</label>
            <input v-model="phone" type="text" required class="border py-1 px-3 rounded" />
          </div>
          <div class="flex gap-3 flex-wrap items-center">
            <label for="phone" class="w-25">Город:</label>
            <input v-model="city" type="text" required class="border py-1 px-3 rounded" />
          </div>
          <div class="flex gap-3 flex-wrap items-center">
            <label for="phone" class="w-25">Улица, дом:</label>
            <input v-model="address" type="text" required class="border py-1 px-3 rounded" />
          </div>
          <div>
            <label for="details">Комментарий к заказу</label><br />
            <textarea v-model="details" class="border w-92"></textarea>
          </div>
          <div class="my-5">
            <p>Итог : {{ sumPrice }} тмт</p>
            <p>Доставка : 20 тмт</p>
            <p>Общая сумма : {{ sumPrice + 20 }} тмт</p>
          </div>
          <button type="submit" class="py-1 px-3 h-8 bg-green-500 text-white rounded">
            <ButtonLoader v-if="buttonLoader" class="relative bottom-1" />
            <p v-else>Оформить заказ</p>
          </button>
        </form>
        <div class="flex flex-col gap-3">
          <!-- <div class="flex gap-3 items-center font-bold bg-black text-white">
            <p class="w-20 text-center">Фото</p>
            <p class="w-[120px]">Название</p>
            <p class="w-20">Размер</p>
            <p class="w-15">Цена</p>
          </div> -->
          <div
            v-for="(item, i) in cart.sneakers"
            :key="i"
            class="flex gap-3 items-center font-bold overflow-x-auto flex-wrap"
          >
            <NuxtImg :src="item.image" :alt="item.title" class="w-20 border border-gray-400" />
            <div class="text-ellipsis w-[140px]">
              {{ item.title }}
              <p class="w-20 text-center whitespace-nowrap">Размер: {{ item.size }}</p>
            </div>

            <div class="w-25 text-center flex items-center">
              <p class="whitespace-nowrap overflow-hidden">{{ item.price }} тмт</p>
              <button
                type="button"
                @click="cart.deleteItem(i)"
                class="border ml-3 border-gray-700 text-gray-700 hover:bg-red-500 hover:text-white rounded-sm h-6 flex justify-center items-center"
              >
                <Icon name="heroicons:x-mark" size="20" stroke="3" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex md:flex-nowrap flex-col md:flex-row flex-wrap my-10 gap-10 justify-evenly items-start"
      >
        <div class="">Ваша корзина пуста</div>
      </div>
    </div>
  </section>
</template>
