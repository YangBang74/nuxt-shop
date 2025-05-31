export const sendTelegramMessage = async (text: string) => {
  try {
    const res = await $fetch('/api/send-message', {
      method: 'POST',
      body: { text },
    });
    if (!res.ok) {
      console.error('Ошибка Telegram:', res);
      alert('Ошибка при отправке');
    }
  } catch (err) {
    console.error('Ошибка сети:', err);
    alert('Ошибка при отправке');
  }
};
