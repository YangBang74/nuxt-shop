export const addComment = async (comments: Comment) => {
  try {
    const response = await fetch('https://175061237ca5525f.mokky.dev/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comments),
    });
    if (!response.ok) throw new Error('Ошибка при отправке комментария');
  } catch (e) {
    console.error(e);
    alert('Не удалось отправить комментарий');
  }
};
