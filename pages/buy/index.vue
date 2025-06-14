<script setup lang="ts">
import { useCartShop } from '~/stores/cart';
import { sendTelegramMessage } from '~/services/set/sendTelegramBot';
import ButtonLoader from '~/components/UI/ButtonLoader.vue';
import OkButton from '~/components/UI/OkButton.vue';
import { userBuy } from '~/services/set/savePurchasedItems';

const cart = useCartShop();
const name = ref('');
const phone = ref('+993 ');
const city = ref('');
const address = ref('');
const details = ref('');
const sumPrice = ref<number>(0);
const buttonLoader = ref<boolean>(false);
const allGood = ref<boolean>(false);

function cartToString() {
  if (!cart.sneakers || cart.sneakers.length === 0) {
    return 'Корзина пуста';
  }
  return cart.sneakers
    .map((item, ix) => {
      return `Товар ${ix + 1}: ${item.title} — ${item.price} тмт (id: ${item.id})`;
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
Общая сумма: ${sumPrice.value + 20} тмт
${cartToString()}`;
    await sendTelegramMessage(message);
    userBuy();
    allGood.value = true;
    setTimeout(() => {
      allGood.value = false;
    }, 5000);
    name.value = '';
    phone.value = '+993 ';
    city.value = '';
    address.value = '';
    details.value = '';
    cart.nullItems();
  } catch (err) {
    console.error(err);
    alert('Ошибка при отправке заказа');
  } finally {
    buttonLoader.value = false;
  }
};
</script>

<template>
  <section class="py-16 bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4">
      <div v-if="cart.sneakers.length === 0" class="flex justify-center items-center py-20">
        <p class="text-xl text-gray-600 font-medium">Ваша корзина пуста</p>
      </div>
      <div v-else class="flex flex-col lg:flex-row gap-12">
        <form
          @submit.prevent="submitOrder"
          class="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6 space-y-6"
        >
          <h2 class="text-2xl font-extrabold text-gray-900">Оформление заказа</h2>

          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1"
                >Ваше имя</label
              >
              <input
                id="name"
                v-model="name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Иван Иванов"
              />
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1"
                >Телефон</label
              >
              <input
                id="phone"
                v-model="phone"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="+993 123 456 78"
              />
            </div>

            <div>
              <label for="city" class="block text-sm font-medium text-gray-700 mb-1">Город</label>
              <input
                id="city"
                v-model="city"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Ashgabat"
              />
            </div>

            <div>
              <label for="address" class="block text-sm font-medium text-gray-700 mb-1"
                >Улица, дом</label
              >
              <input
                id="address"
                v-model="address"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="ул. Мира, д. 10"
              />
            </div>

            <div>
              <label for="details" class="block text-sm font-medium text-gray-700 mb-1"
                >Комментарий к заказу</label
              >
              <textarea
                id="details"
                v-model="details"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Дополнительная информация"
              ></textarea>
            </div>
          </div>

          <div class="bg-gray-100 rounded-md p-4 space-y-2">
            <p class="text-gray-800 font-medium">
              Итоговая сумма: <span class="font-bold">{{ sumPrice }} тмт</span>
            </p>
            <p class="text-gray-800 font-medium">Доставка: <span class="font-bold">20 тмт</span></p>
            <p class="text-gray-900 font-semibold text-lg">
              К оплате: <span>{{ sumPrice + 20 }} тмт</span>
            </p>
          </div>

          <button
            type="submit"
            class="w-full flex items-center justify-center py-px h-10 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition"
          >
            <Transition name="fade" mode="out-in">
              <ButtonLoader v-if="buttonLoader" class="mx-auto" />
              <span v-else class="w-full">Оформить заказ</span>
            </Transition>
          </button>
        </form>
        <div class="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6 space-y-6">
          <h2 class="text-2xl font-extrabold text-gray-900">Товары в корзине</h2>
          <ul class="space-y-4 max-h-[500px] overflow-y-auto">
            <li
              v-for="(item, i) in cart.sneakers"
              :key="i"
              class="flex items-center justify-between bg-gray-50 rounded-md"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-16 h-16 bg-gray-100 rounded-md overflow-hidden border border-gray-200"
                >
                  <NuxtImg
                    :src="item.image"
                    :alt="item.title"
                    class="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div class="min-w-0">
                  <h3 class="text-sm font-medium text-gray-800 line-clamp-2">{{ item.title }}</h3>
                  <p class="text-xs text-gray-600 mt-1">Размер: {{ item.size }}</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <span class="text-sm font-semibold text-gray-900">{{ item.price }} тмт</span>
                <button
                  type="button"
                  @click="cart.deleteItem(i)"
                  class="p-1 flex justify-center items-center h-7 w-7 rounded-full border border-gray-300 hover:bg-red-500 hover:border-red-500 transition"
                >
                  <Icon name="heroicons:x-mark" class="w-4 h-4 text-gray-600 hover:text-white" />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <Teleport to="body">
    <div
      v-if="allGood"
      class="fixed left-0 top-0 w-full h-full z-100 bg-black/40 flex justify-center items-center"
    >
      <div class="bg-white p-10 rounded-lg">
        <h1 class="font-medium text-lg">Ваш заказ успешно оформлен</h1>
        <OkButton class="mt-5" @click="allGood = false" />
      </div>
    </div>
  </Teleport>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
