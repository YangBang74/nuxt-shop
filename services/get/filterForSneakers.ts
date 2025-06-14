import type { Sneaker } from '~/shared/types/sneaker';

export interface FilterParams {
  priceFrom?: number | null;
  priceTo?: number | null;
  selectSize?: number | null;
  selectStyle?: string | null;
  selectBrand?: string | null;
  page: number;
  limit: number;
}

export interface SneakersResponse {
  items: Sneaker[];
  total: number;
}

export async function getWithFilter(params: FilterParams): Promise<SneakersResponse> {
  const { page = 1, limit = 12, priceFrom, priceTo, selectSize, selectStyle, selectBrand } = params;

  const query = new URLSearchParams();
  query.append('page', String(page));
  query.append('limit', String(limit));

  if (priceFrom != null) query.append('price[from]', String(priceFrom));
  if (priceTo != null) query.append('price[to]', String(priceTo));
  if (selectSize != null) query.append('sizes[]', String(selectSize));
  if (selectStyle != null) query.append('style[]', selectStyle);
  if (selectBrand != null) query.append('brand', selectBrand);

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
