export async function updateSneakerRating(id: number, rating: number) {
  const res = await fetch(`https://175061237ca5525f.mokky.dev/snakers/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rating }),
  });

  if (!res.ok) throw new Error('Ошибка при обновлении рейтинга');
  return res.json();
}
