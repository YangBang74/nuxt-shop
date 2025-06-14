import type { Ref } from 'vue';
import type { Sneaker } from '~/shared/types/sneaker';

export async function fetchData(
  loader: Ref<boolean>,
  sneaker: Ref<Sneaker | null>,
  id: string
): Promise<void | string> {
  loader.value = true;
  try {
    const res = await fetch(`https://175061237ca5525f.mokky.dev/snakers/${id}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Ошибка при получении данных');
    }
    sneaker.value = data;
  } catch (err: unknown) {
    if (err instanceof Error) return err.message;
    return 'Что-то пошло не так';
  } finally {
    loader.value = false;
  }
}
