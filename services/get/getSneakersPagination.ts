import type { Sneaker } from '~/shared/types/sneaker';

export interface SneakersResponse {
  items: Sneaker[];
  total: number;
}

export async function getSneakers(page = 1, limit = 10): Promise<SneakersResponse> {
  const query = new URLSearchParams();
  query.append('page', String(page));
  query.append('limit', String(limit));

  const res = await fetch(`https://175061237ca5525f.mokky.dev/sneakers?${query.toString()}`);

  if (!res.ok) throw new Error(`Ошибка ${res.status}`);

  const json = (await res.json()) as {
    meta: { total_items: number; total_pages: number; current_page: number };
    items: Sneaker[];
  };

  return {
    items: json.items,
    total: json.meta.total_items,
  };
}
