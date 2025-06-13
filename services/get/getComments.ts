export const getComment = async (id: number) => {
  try {
    const response = await fetch(`https://175061237ca5525f.mokky.dev/comments?productId=${id}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
