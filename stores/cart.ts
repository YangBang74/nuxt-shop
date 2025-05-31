import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartShop = defineStore(
  'cart',
  () => {
    const sneakers = ref<any[]>([]);

    function addToCart(item: any, size: number) {
      if (!item || typeof size !== 'number') {
        console.warn('Неверные данные для добавления в корзину');
        return;
      }

      const exists = sneakers.value.find((i) => i.id === item.id && i.size === size);

      if (!exists) {
        sneakers.value.push({ ...item, size });
      }
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

      sneakers.value.splice(index, 1);
    }

    function nullItems() {
      sneakers.value = [];
    }

    return {
      sneakers,
      addToCart,
      deleteItem,
      nullItems,
    };
  },
  {
    persist: true,
  }
);
