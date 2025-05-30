// ~/composables/useSearch.js
import { ref, nextTick } from 'vue';
import { useRouter, useRoute } from '#imports';

export function useSearch() {
  const query = ref('');
  const router = useRouter();
  const route = useRoute();

  function submit() {
    const q = query.value.trim();
    if (!q) return;

    // Если уже на /search → просто обновляем query, иначе — переходим
    if (route.path === '/search') {
      router.replace({ query: { q } });
    } else {
      router.push({ path: '/search', query: { q } });
    }
  }

  return { query, submit };
}
