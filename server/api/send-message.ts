export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const token = config.TELEGRAM_BOT_TOKEN;
  const chatId = config.TELEGRAM_BOT_ID;
  const text = body.text;
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;
  const res = await $fetch(url);
  return res;
});
