import type { Comment } from '~/shared/types/Comment';

export const updateProductRating = async (id: number, comments: Comment[]) => {
  try {
    const productComments = comments.filter(
      (c) => c.productId === id && typeof c.rating === 'number'
    );
    if (productComments.length === 0) return;

    const sum = productComments.reduce((acc, c) => acc + c.rating, 0);
    const avgRating = Number((sum / productComments.length).toFixed(1));

    const res = await fetch(`https://175061237ca5525f.mokky.dev/sneakers/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating: avgRating }),
    });

    if (!res.ok) throw new Error('Ошибка при обновлении рейтинга товара');
  } catch (e) {
    console.error('Ошибка при пересчёте рейтинга:', e);
  }
};
