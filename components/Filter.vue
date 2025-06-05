<script setup lang="ts">
const modelValue = defineModel<{
  priceFrom: number | null;
  priceTo: number | null;
  selectSize: number | null;
  selectStyle: string | null;
  selectBrand: string | null;
}>();

const sizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
const styles = ['running', 'casual', 'basketball', 'skate', 'minimal'];
const brands = ['nike', 'converse', 'vans', 'puma', 'adidas'];

const resetValues = () => {
  modelValue.value.priceFrom = null;
  modelValue.value.priceTo = null;
  modelValue.value.selectSize = null;
  modelValue.value.selectStyle = null;
  modelValue.value.selectBrand = null;
};

function selectItem<T extends keyof typeof modelValue.value>(item: any, field: T) {
  modelValue.value[field] = modelValue.value[field] === item ? null : item;
}
</script>

<template>
  <article class="bg-white rounded-lg shadow-md p-6 w-full sm:w-72 flex-shrink-0">
    <h3 class="text-2xl font-semibold text-gray-800">Подбор по параметрам</h3>
    <div class="mt-6">
      <p class="text-gray-700 mb-2">Цена, тмт</p>
      <div class="flex gap-2 flex-wrap">
        <input
          type="number"
          v-model.number="modelValue.priceFrom"
          placeholder="От"
          class="w-full flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="number"
          v-model.number="modelValue.priceTo"
          placeholder="До"
          class="w-full flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
    </div>
    <div class="mt-6">
      <p class="text-gray-700 mb-2">Размер</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(size, i) in sizes"
          :key="i"
          type="button"
          @click="selectItem(size, 'selectSize')"
          :class="[
            'px-2 py-1 border rounded-md text-sm font-medium transition',
            modelValue.selectSize === size
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200',
          ]"
        >
          {{ size }}
        </button>
      </div>
    </div>
    <div class="mt-6">
      <p class="text-gray-700 mb-2">Стиль</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(style, i) in styles"
          :key="i"
          type="button"
          @click="selectItem(style, 'selectStyle')"
          :class="[
            'px-3 py-1 border rounded-md text-sm font-medium transition capitalize',
            modelValue.selectStyle === style
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200',
          ]"
        >
          {{ style }}
        </button>
      </div>
    </div>
    <div class="mt-6">
      <p class="text-gray-700 mb-2">Бренд</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(brand, i) in brands"
          :key="i"
          type="button"
          @click="selectItem(brand, 'selectBrand')"
          :class="[
            'px-3 py-1 border rounded-md text-sm font-medium transition capitalize',
            modelValue.selectBrand === brand
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200',
          ]"
        >
          {{ brand }}
        </button>
      </div>
    </div>
    <button
      type="button"
      @click="resetValues"
      class="mt-8 w-full bg-red-500 text-white py-2 rounded-md font-medium hover:bg-red-600 transition"
    >
      Сбросить
    </button>
  </article>
</template>
