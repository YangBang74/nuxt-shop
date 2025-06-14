import { useUserStore } from '#imports';
import { useCartShop } from '#imports';

const user = useUserStore();
const cart = useCartShop();

export const userBuy = async () => {
  try {
    const res = await fetch(`https://175061237ca5525f.mokky.dev/users/${user.id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const userData = await res.json();

    const oldCart = userData.cart || [];

    const newCart = cart.sneakers.map((item) => ({
      id: item.id,
      size: item.size,
    }));

    const mergedCart = [...oldCart, ...newCart];
    const uniqueCart = Array.from(
      new Map(mergedCart.map((item) => [`${item.id}_${item.size}`, item])).values()
    );

    const response = await fetch(`https://175061237ca5525f.mokky.dev/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart: uniqueCart }),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log('Ошибка при обновлении корзины:', err);
  }
};
