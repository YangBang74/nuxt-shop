export const sendTelegramMessage = async (text: string) => {
  try {
    await $fetch('/api/send-message', {
      method: 'POST',
      body: { text },
    });
  } catch (err) {
    console.error('Ошибка при отправке сообщения в Telegram:', err);
    alert('Ошибка при отправке');
  }
};
