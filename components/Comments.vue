<script setup lang="ts">
import Rating from '@/components/Rating.vue';
import { getComment } from '~/services/get/getComments';
import { addComment } from '~/services/set/addComment';
import { updateProductRating } from '~/services/updateRating';
import type { NewComment, Comment } from '~/shared/types/Comment';
import { useUserStore } from '#imports';
import { getUser } from '~/services/get/getUserDates';

const route = useRoute();
const productId = Number(route.params.id);
const userLocal = useUserStore();

const addCommentIsActive = ref(false);
const author = ref<string>('');
const text = ref<string>('');
const rating = ref<number>(0);
const messageIsActive = ref<boolean>(false);
const commentIsError = ref<boolean>(false);
const commentErrorMessage = ref<string | null>(null);
const userCanVote = ref<boolean>(false);
const comments = ref<Comment[]>([]);

const getComments = async (productId: number) => {
  try {
    comments.value = await getComment(productId);
  } catch (e) {
    console.error(e);
  }
};

const emit = defineEmits<{
  (e: 'updated'): void;
}>();

const updateRating = async () => {
  try {
    await updateProductRating(productId, comments.value);
    emit('updated');
  } catch (e) {
    console.log(e);
  }
};

const addNewComment = async () => {
  if (!author.value.trim() || !text.value.trim() || rating.value === 0) {
    commentErrorMessage.value = 'Заполните все поля и поставьте оценку';
    return;
  }
  const newComment: NewComment = {
    productId,
    author: author.value,
    authorId: userLocal.id,
    text: text.value,
    createdAt: new Date().toISOString(),
    rating: rating.value,
  };
  try {
    await addComment(newComment);
    author.value = '';
    text.value = '';
    rating.value = 0;
    addCommentIsActive.value = false;
    messageIsActive.value = true;
    setTimeout(() => {
      messageIsActive.value = false;
    }, 5000);

    await getComments(productId);
    await updateRating();
  } catch (e) {
    commentIsError.value = true;
    console.log(e);
  }
};

const cancelForm = () => {
  addCommentIsActive.value = false;
};

onMounted(() => {
  getComments(productId);
});

const closeMessage = () => {
  messageIsActive.value = false;
  commentIsError.value = false;
};

const isCommented = computed(() =>
  comments.value.some((comment) => comment.authorId === userLocal.id)
);

type CartItem = {
  id: number | string;
  size: number;
};

onMounted(async () => {
  try {
    const userDate = await getUser();
    const isAlreadyInCart = userDate?.cart?.some((item: CartItem) => Number(item.id) === productId);
    if (isAlreadyInCart) {
      userCanVote.value = true;
    }
  } catch (e) {
    console.error('Ошибка при получении пользователя:', e);
  }
});
</script>

<template>
  <section class="mb-20">
    <div class="container">
      <div class="flex justify-between items-center">
        <h1 class="font-bold text-3xl">Отзывы к товару</h1>
        <button
          type="button"
          @click="addCommentIsActive = !addCommentIsActive"
          :disabled="(isCommented, !userCanVote)"
        >
          <span v-if="isCommented">Вы уже оставили отзыв</span>
          <span v-else-if="!userCanVote"></span>
          <span v-else>Добавить отзыв</span>
        </button>
      </div>

      <Transition name="fade">
        <article
          v-if="addCommentIsActive"
          class="p-4 bg-white rounded-2xl shadow-md flex flex-col gap-4 w-full max-w-xl my-5"
        >
          <p class="text-red-500 font-medium" v-if="commentErrorMessage">
            {{ commentErrorMessage }}
          </p>
          <Rating v-model:rating="rating" :can-vote="true" class="mt-2" />
          <InputSign label="Введите ваше имя" v-model="author" name="name" type="text" />
          <textarea
            v-model="text"
            placeholder="Оставьте комментарий..."
            class="w-full p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>

          <div class="flex justify-end gap-2">
            <button
              @click="addNewComment"
              :disabled="isCommented"
              class="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Отправить
            </button>
            <button
              @click="cancelForm"
              class="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              Отмена
            </button>
          </div>
        </article>
      </Transition>

      <div class="flex flex-col gap-5 mt-10" v-if="comments.length">
        <div v-for="(comment, i) in comments" :key="i" class="bg-white shadow p-4 rounded-xl">
          <div class="flex justify-between items-center gap-5">
            <div class="flex gap-2 items-center">
              <h3 class="font-bold">{{ comment.author }}</h3>
              <Rating :rating="comment.rating" :can-vote="false" />
            </div>

            <span class="text-sm text-gray-500">{{
              new Date(comment.createdAt).toLocaleString()
            }}</span>
          </div>

          <p class="mt-3">{{ comment.text }}</p>
        </div>
      </div>
      <div v-else><p class="my-10 text-center">Отзывов пока нету</p></div>
    </div>
  </section>
  <!-- Modal messages -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="messageIsActive || commentIsError"
        class="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
      >
        <div class="bg-white rounded-xl p-6 w-80 text-center shadow-lg animate-fade-in">
          <p class="text-lg font-semibold text-gray-800">
            {{
              commentIsError
                ? 'Что-то пошло не так, попробуйте заново!'
                : 'Комментарий успешно добавлен!'
            }}
          </p>
          <button
            @click="closeMessage"
            class="mt-4 w-full py-2 rounded text-white transition"
            :class="
              commentIsError ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            "
          >
            Хорошо
          </button>
        </div>
      </div>
    </Transition>
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
