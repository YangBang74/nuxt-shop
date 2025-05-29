export const useCardShop = defineStore('card', () => {
  const sneakers = ref<any[]>([]);

  function addToCard(item: any) {
    sneakers.value.push(item);
    console.log(sneakers.value);
  }

  function deleteItem(index: number) {
    sneakers.value.splice(index, 1);
  }

  return {
    sneakers,
    addToCard,
    deleteItem,
  };
});
