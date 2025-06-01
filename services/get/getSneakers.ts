export default async function getSneakers() {
  try {
    const response = await fetch('https://175061237ca5525f.mokky.dev/snakers');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Что-то пошло не так');
    }

    return data;
  } catch (err: any) {
    console.error('Ошибка при загрузке сникеров:', err.message);
    throw err;
  }
}