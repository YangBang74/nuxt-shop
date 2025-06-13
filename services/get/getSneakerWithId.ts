export async function fetchData(loader: Ref<boolean>, snake: Ref<string[]>, id: string) {
  loader.value = true;
  try {
    const response = await fetch(`https://175061237ca5525f.mokky.dev/snakers/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Ошибка при получении данных');
    }
    snake.value = data;
  } catch (err: any) {
    return err.message || 'Что-то пошло не так';
  } finally {
    loader.value = false;
  }
}
