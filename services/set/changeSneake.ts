export async function updateSneaker(
  id: number,
  payload: {
    title: string;
    brand: string;
    price: number;
    rating: number;
    sizes: number[];
    styles: string[];
  }
) {
  const res = await fetch(`https://175061237ca5525f.mokky.dev/sneakers/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Ошибка обновления: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

export async function deleteSneaker(id: number) {
  const res = await fetch(`https://175061237ca5525f.mokky.dev/sneakers/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`Ошибка обновления: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}
