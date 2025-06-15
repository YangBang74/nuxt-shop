import { useUserStore } from '#imports';
import { useCartShop } from '#imports';
import { getUser } from '../get/getUserDates';

export const userBuy = async () => {
  const user = useUserStore();
  const cart = useCartShop();
  try {
    const userData = await getUser();
    console.log(userData);

    const oldCart = userData.cart || [];

    const newCart = cart.sneakers.map((item) => ({
      id: item.id,
      size: item.size,
    }));

    const mergedCart = [...oldCart, ...newCart];

    const response = await fetch(`https://175061237ca5525f.mokky.dev/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart: mergedCart }),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log('Ошибка при обновлении корзины:', err);
  }
};
