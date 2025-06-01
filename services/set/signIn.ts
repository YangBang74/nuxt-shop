export const signIn = async (mail: string, pass: string): Promise<any> => {
  try {
    const response = await fetch('https://175061237ca5525f.mokky.dev/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: mail,
        password: pass,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Ошибка регистрации');
    }
    return data;
  } catch (err: any) {
    console.error('Ошибка:', err.message);
    if (err.message === 'RESOURCE_USER_ALREADY_EXISTS') {
      return 'Пользователь с такой почтой уже существует';
    } else {
      return 'Произошла ошибка. Попробуйте ещё раз.';
    }
  }
};
