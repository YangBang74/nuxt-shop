import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartShop = defineStore(
  'cart',
  () => {
    const sneakers = ref<any[]>([]);
    const totalPrice = ref<number>(0);

    function addToCart(item: any, size: number) {
      sneakers.value.push({ ...item, size });
      totalPrice.value += item.price;
    }

    function deleteItem(index: number) {
      if (!Array.isArray(sneakers.value)) {
        console.warn('sneakers is not an array');
        return;
      }

      if (index < 0 || index >= sneakers.value.length) {
        console.warn(`Индекс ${index} вне допустимого диапазона`);
        return;
      }

      const removedItem = sneakers.value[index];
      totalPrice.value -= removedItem.price;
      sneakers.value.splice(index, 1);
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
