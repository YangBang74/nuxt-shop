import { ref } from 'vue';
import { useRouter, useRoute } from '#imports';

export function useSearch() {
  const query = ref('');
  const router = useRouter();
  const route = useRoute();

  function submit() {
    const q = query.value.trim();
    if (!q) return;
    if (route.path === '/search') {
      router.replace({ query: { q } });
      location.reload();
    } else {
      router.push({ path: '/search', query: { q } });
    }
  }

  return { query, submit };
}
