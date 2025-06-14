import { useUserStore } from '#imports';

export const getUser = async () => {
  const user = useUserStore();
  try {
    const res = await fetch(`https://175061237ca5525f.mokky.dev/users/${user.id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};
