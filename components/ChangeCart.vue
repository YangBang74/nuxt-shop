<script setup lang="ts">
import { updateSneaker, deleteSneaker } from '~/services/set/changeSneake';
import type { Sneaker } from '~/shared/types/sneaker';

const props = defineProps<{
  item: Sneaker;
}>();
const emit = defineEmits<{
  (e: 'deleted', id: number): void;
}>();

const isEditing = ref(false);
const isSaving = ref(false);
const isDeleting = ref(false);
const saveStatus = ref<'idle' | 'saving' | 'saved' | 'error'>('idle');
const deleteStatus = ref<'idle' | 'deleting' | 'deleted' | 'error'>('idle');

const currentTitle = ref(props.item.title);
const currentBrand = ref(props.item.brand);
const currentPrice = ref(props.item.price);
const currentRating = ref(props.item.rating);
const currentSizes = ref<number[]>([...(props.item.sizes ?? [])]);
const currentStyles = ref<string[]>([...(props.item.styles ?? [])]);

const editTitle = ref(currentTitle.value);
const editBrand = ref(currentBrand.value);
const editPrice = ref(currentPrice.value);
const editRating = ref(currentRating.value);
const editSizesString = ref(currentSizes.value.join(','));
const editStylesString = ref(currentStyles.value.join(','));

const resetEdits = () => {
  editTitle.value = currentTitle.value;
  editBrand.value = currentBrand.value;
  editPrice.value = currentPrice.value;
  editRating.value = currentRating.value;
  editSizesString.value = currentSizes.value.join(',');
  editStylesString.value = currentStyles.value.join(',');
};

const startEditing = () => {
  isEditing.value = true;
  saveStatus.value = 'idle';
};

const saveChanges = async () => {
  isSaving.value = true;
  saveStatus.value = 'saving';
  const newSizes = editSizesString.value
    .split(',')
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const newStyles = editStylesString.value
    .split(',')
    .map((s) => s.trim())
    .filter((str) => str.length > 0);
  const payload = {
    title: editTitle.value.trim(),
    brand: editBrand.value.trim(),
    price: Number(editPrice.value),
    rating: Number(editRating.value),
    sizes: newSizes,
    styles: newStyles,
  };
  try {
    await updateSneaker(props.item.id, payload);
    currentTitle.value = payload.title;
    currentBrand.value = payload.brand;
    currentPrice.value = payload.price;
    currentRating.value = payload.rating;
    currentSizes.value = [...newSizes];
    currentStyles.value = [...newStyles];
    saveStatus.value = 'saved';
    setTimeout(() => {
      isEditing.value = false;
      saveStatus.value = 'idle';
    }, 1000);
  } catch (err) {
    console.error('Ошибка при обновлении товара:', err);
    saveStatus.value = 'error';
  } finally {
    isSaving.value = false;
  }
};

const deleteItem = async () => {
  if (!confirm('Вы уверены, что хотите удалить этот товар?')) return;
  isDeleting.value = true;
  deleteStatus.value = 'deleting';
  try {
    await deleteSneaker(props.item.id);
    deleteStatus.value = 'deleted';
    emit('deleted', props.item.id);
  } catch (err) {
    console.error('Ошибка при удалении товара:', err);
    deleteStatus.value = 'error';
  } finally {
    isDeleting.value = false;
  }
};
</script>

<template>
  <div v-if="!item"><NewLoader /></div>
  <div class="px-5" v-else>
    <div
      class="flex flex-col sm:flex-row justify-center sm:items-center sm:justify-between gap-4 border p-4 rounded-lg shadow-sm w-full bg-white hover:shadow-md transition-all"
    >
      <div class="flex items-center gap-4 flex-1">
        <p class="text-gray-500 font-semibold min-w-[24px]">#{{ props.item.id }}</p>
        <NuxtImg
          :src="props.item.image"
          alt="Product"
          loading="lazy"
          class="h-20 w-20 object-contain rounded border"
        />
        <div
          class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 overflow-hidden"
        >
          <div class="w-full sm:w-32">
            <template v-if="!isEditing">
              <div class="text-sm font-medium truncate">{{ currentTitle }}</div>
            </template>
            <template v-else>
              <input
                v-model="editTitle"
                type="text"
                class="w-full px-2 py-1 border rounded text-sm"
                placeholder="Название"
              />
            </template>
          </div>
          <div class="w-full sm:w-32">
            <template v-if="!isEditing">
              <div class="uppercase text-gray-600 truncate">{{ currentBrand }}</div>
            </template>
            <template v-else>
              <input
                v-model="editBrand"
                type="text"
                class="w-full px-2 py-1 border rounded text-sm uppercase"
                placeholder="Бренд"
              />
            </template>
          </div>
          <div class="w-full sm:w-28">
            <template v-if="!isEditing">
              <div class="flex flex-wrap gap-1 text-xs text-gray-700">
                <span
                  v-for="sz in currentSizes"
                  :key="sz"
                  class="px-2 py-1 border rounded bg-gray-50"
                >
                  {{ sz }}
                </span>
              </div>
            </template>
            <template v-else>
              <input
                v-model="editSizesString"
                type="text"
                placeholder="Размеры, через запятую"
                class="w-full px-2 py-1 border rounded text-xs"
              />
            </template>
          </div>
          <div class="w-full sm:w-28">
            <template v-if="!isEditing">
              <div class="flex flex-wrap gap-1 text-xs text-gray-700 capitalize">
                <span
                  v-for="st in currentStyles"
                  :key="st"
                  class="px-2 py-1 border rounded bg-gray-50"
                >
                  {{ st }}
                </span>
              </div>
            </template>
            <template v-else>
              <input
                v-model="editStylesString"
                type="text"
                placeholder="Стили, через запятую"
                class="w-full px-2 py-1 border rounded text-xs capitalize"
              />
            </template>
          </div>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto">
        <div class="w-full sm:w-16 text-center">
          <template v-if="!isEditing">
            <p class="font-semibold text-gray-700">⭐ {{ currentRating }}</p>
          </template>
        </div>
        <div class="w-full sm:w-20 text-center">
          <template v-if="!isEditing">
            <p class="font-semibold text-green-600">{{ currentPrice }} тмт</p>
          </template>
          <template v-else>
            <input
              v-model.number="editPrice"
              type="number"
              min="0"
              class="w-full px-2 py-1 border rounded text-center text-green-600"
              placeholder="Цена"
            />
          </template>
        </div>
        <div class="flex items-center gap-2">
          <template v-if="!isEditing">
            <button
              type="button"
              @click="startEditing"
              class="text-blue-500 hover:text-blue-700 transition-colors"
              aria-label="Редактировать"
            >
              <Icon name="mdi:pencil" class="w-5 h-5" />
            </button>
          </template>
          <template v-else>
            <template v-if="isEditing">
              <button
                type="button"
                @click="deleteItem"
                :disabled="isDeleting"
                class="flex items-center justify-center w-8 rounded-lg hover:text-red-600 h-8 bg-gray-200 transition-colors ml-2"
                aria-label="Удалить"
              >
                <Icon name="mdi:delete" class="w-5 h-5" />
              </button>
            </template>
            <button
              type="button"
              @click="saveChanges"
              :disabled="isSaving"
              class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {{ isSaving ? 'Сохраняю…' : 'Сохранить' }}
            </button>
            <button
              type="button"
              @click="
                () => {
                  resetEdits();
                  isEditing = false;
                }
              "
              class="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              Отмена
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
