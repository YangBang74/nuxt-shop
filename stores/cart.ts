import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Sneaker } from '~/shared/types/sneaker';
export const useCartShop = defineStore(
  'cart',
  () => {
    const sneakers = ref<Sneaker[]>([]);
    const totalPrice = ref<number>(0);

    function addToCart(item: Sneaker, size: number) {
      sneakers.value.push({ ...item, size });
      totalPrice.value += item.price;
    }

    function deleteItem(ix: number) {
      if (!Array.isArray(sneakers.value)) {
        console.warn('sneakers is not an array');
        return;
      }

      if (ix < 0 || ix >= sneakers.value.length) {
        console.warn(`Индекс ${ix} вне допустимого диапазона`);
        return;
      }

      const removedItem = sneakers.value[ix];
      totalPrice.value -= removedItem.price;
      sneakers.value.splice(ix, 1);
    }

    function nullItems() {
      sneakers.value = [];
      totalPrice.value = 0;
    }

    return {
      sneakers,
      totalPrice,
      addToCart,
      deleteItem,
      nullItems,
    };
  },
  {
    persist: true,
  }
);
