import type { Sneaker } from '~/shared/types/sneaker';

export async function fetchMultipleSneakers(
  sneakers: Ref<Sneaker[]>,
  ids: string[]
): Promise<void | string> {
  try {
    const requests = ids.map((id) =>
      fetch(`https://175061237ca5525f.mokky.dev/sneakers/${id}`).then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || `Ошибка при получении данных ID ${id}`);
        }
        return data as Sneaker;
      })
    );

    sneakers.value = await Promise.all(requests);
  } catch (err: unknown) {
    if (err instanceof Error) return err.message;
    return 'Что-то пошло не так';
  }
}
