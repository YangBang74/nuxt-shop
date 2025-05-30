<template>
  <div class="relative flex">
    <span class="inline-flex">
      <svg
        v-for="i in maxRating"
        :key="i"
        fill="#E0E0E0"
        width="20px"
        height="20px"
        viewBox="0 0 1920 1920"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#E0E0E0"
        @click="voteRating(i, props.rating)"
        class="cursor-pointer"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0" />

        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

        <g id="SVGRepo_iconCarrier">
          <path
            d="M1915.918 737.475c-10.955-33.543-42.014-56.131-77.364-56.131h-612.029l-189.063-582.1v-.112C1026.394 65.588 995.335 43 959.984 43c-35.237 0-66.41 22.588-77.365 56.245L693.443 681.344H81.415c-35.35 0-66.41 22.588-77.365 56.131-10.955 33.544.79 70.137 29.478 91.03l495.247 359.831-189.177 582.212c-10.955 33.657 1.13 70.25 29.817 90.918 14.23 10.278 30.946 15.487 47.66 15.487 16.716 0 33.432-5.21 47.775-15.6l495.134-359.718 495.021 359.718c28.574 20.781 67.087 20.781 95.662.113 28.687-20.668 40.658-57.261 29.703-91.03l-189.176-582.1 495.36-359.83c28.574-20.894 40.433-57.487 29.364-91.03"
            fill-rule="evenodd"
          />
        </g>
      </svg>
      <div class="absolute z-10 overflow-hidden inset-0" :style="{ width: ratingWidthStyle }">
        <span class="inline-flex">
          <svg
            v-for="i in maxRating"
            :key="i"
            fill="#FFD700"
            width="20px"
            height="20px"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#FFD700"
            @click="voteRating(i, props.rating)"
            class="cursor-pointer"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

            <g id="SVGRepo_iconCarrier">
              <path
                d="M1915.918 737.475c-10.955-33.543-42.014-56.131-77.364-56.131h-612.029l-189.063-582.1v-.112C1026.394 65.588 995.335 43 959.984 43c-35.237 0-66.41 22.588-77.365 56.245L693.443 681.344H81.415c-35.35 0-66.41 22.588-77.365 56.131-10.955 33.544.79 70.137 29.478 91.03l495.247 359.831-189.177 582.212c-10.955 33.657 1.13 70.25 29.817 90.918 14.23 10.278 30.946 15.487 47.66 15.487 16.716 0 33.432-5.21 47.775-15.6l495.134-359.718 495.021 359.718c28.574 20.781 67.087 20.781 95.662.113 28.687-20.668 40.658-57.261 29.703-91.03l-189.176-582.1 495.36-359.83c28.574-20.894 40.433-57.487 29.364-91.03"
                fill-rule="evenodd"
              />
            </g>
          </svg>
        </span>
      </div>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    rating?: number;
    maxRating?: number;
    id: number;
    canVote?: boolean;
  }>(),
  {
    rating: 0,
    maxRating: 5,
    canVote: false,
  }
);

const emit = defineEmits(['update:rating']);

const newRating = ref<Number>(0);

const ratingWidth = computed(() => {
  return (props.rating / props.maxRating) * 100;
});

const ratingWidthStyle = computed(() => {
  return `${ratingWidth.value}%`;
});

const ChangeRating = (i: number, rating: number) => {
  if (props.rating === 0) {
    newRating.value = i;
  } else {
    newRating.value = (rating + i) / 2;
  }
};

async function voteRating(i: number, rating: number) {
  if (props.canVote) {
    ChangeRating(i, rating);
    const res = await fetch(`https://175061237ca5525f.mokky.dev/snakers/${props.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating: newRating.value }),
    });
    emit('update:rating', Number(newRating.value.toFixed(1)));
    if (!res.ok) throw new Error('Ошибка при обновлении рейтинга');
    return res.json();
  }
}
</script>
