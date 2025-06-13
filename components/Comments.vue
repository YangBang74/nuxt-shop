<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import Rating from '@/components/Rating.vue';
import InputSign from '@/components/InputSign.vue';
import { getComment } from '~/services/get/getComments';
import { addComment } from '~/services/set/addComment';
const route = useRoute();
const productId = Number(route.params.id);
const user = useUserStore();

const addCommentIsActive = ref(false);
const author = ref<string>('');
const text = ref<string>('');
const rating = ref<number>(0);
const messageIsActive = ref<boolean>(false);
const commentIsError = ref<boolean>(false);
const commentErrorMessage = ref<string | null>(null);

interface Comment {
  id: number;
  productId: number;
  author: string;
  authorId: number;
  text: string;
  createdAt: string;
  rating: number;
}

const comments = ref<Comment[]>([]);

const getComments = async (productId: number) => {
  try {
    comments.value = await getComment(productId);
  } catch (e) {
    console.error(e);
  }
};

const updateProductRating = async () => {
  try {
    const productComments = comments.value.filter(
      (c) => c.productId === productId && typeof c.rating === 'number'
    );
    if (productComments.length === 0) return;

    const sum = productComments.reduce((acc, c) => acc + c.rating, 0);
    const avgRating = Number((sum / productComments.length).toFixed(1));

    const res = await fetch(`https://175061237ca5525f.mokky.dev/snakers/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating: avgRating }),
    });

    if (!res.ok) throw new Error('Ошибка при обновлении рейтинга товара');
  } catch (e) {
    console.error('Ошибка при пересчёте рейтинга:', e);
  }
};

const addNewComment = async () => {
  if (!author.value.trim() || !text.value.trim() || rating.value === 0) {
    commentErrorMessage.value = 'Заполните все поля и поставьте оценку';
    return;
  }
  const newComment = {
    productId,
    author: author.value,
    authorId: user.id,
    text: text.value,
    createdAt: new Date().toISOString(),
    rating: rating.value,
  };
  try {
    const response = await addComment(newComment);
    author.value = '';
    text.value = '';
    rating.value = 0;
    addCommentIsActive.value = false;
    messageIsActive.value = true;
    setTimeout(() => {
      messageIsActive.value = false;
    }, 5000);

    await getComments(productId);
    await updateProductRating();
  } catch (e) {
    commentIsError.value = true;
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
</script>

<template>
  <section class="mb-20">
    <div class="container">
      <div class="flex justify-between items-center">
        <h1 class="font-bold text-3xl">Отзывы к товару</h1>
        <button type="button" @click="addCommentIsActive = !addCommentIsActive">
          Добавить отзыв
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

      <div class="flex flex-col gap-5 mt-10">
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
