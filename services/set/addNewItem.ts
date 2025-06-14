export const addCart = async (product: unknown) => {
  try {
    const response = await fetch('https://175061237ca5525f.mokky.dev/snakers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error('Ошибка добавления');
    }
    return await response.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log('Неизвестная ошибка');
    }
  }
};
