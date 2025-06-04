export const addCart = async (product: any) => {
  //
  try {
    const response = await fetch('https://175061237ca5525f.mokky.dev/snakers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error('Ошибка добавление');
    }
    return response.json();
  } catch (err: any) {
    console.log(err.message);
  }
};
