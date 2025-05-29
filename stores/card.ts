import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCardShop = defineStore(
  'card',
  () => {
    const sneakers = ref<any[]>([]);

    function addToCard(item: any) {
      const exists = sneakers.value.find((i) => i.id === item.id);
      if (!exists) {
        sneakers.value.push(item);
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

    return {
      sneakers,
      addToCard,
      deleteItem,
    };
  },
  {
    persist: true,
  }
);
