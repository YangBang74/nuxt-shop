export interface FilterParams {
  priceFrom?: number | null;
  priceTo?: number | null;
  selectSize?: number | null;
  selectStyle?: string | null;
  selectBrand?: string | null;
  page?: number;
  limit?: number;
}

export interface SneakersResponse {
  items: any[];
  total: number;
}

export async function getWithFilter(params: FilterParams): Promise<SneakersResponse> {
  const { page = 1, limit = 12, priceFrom, priceTo, selectSize, selectStyle, selectBrand } = params;

  const query = new URLSearchParams();
  query.append('page', String(page));
  query.append('limit', String(limit));

  if (priceFrom !== null && priceFrom !== undefined) {
    query.append('price[from]', String(priceFrom));
  }

  if (priceTo !== null && priceTo !== undefined) {
    query.append('price[to]', String(priceTo));
  }

  if (selectSize !== null && selectSize !== undefined) {
    query.append('sizes[]', String(selectSize));
  }

  if (selectStyle !== null && selectStyle !== undefined) {
    query.append('style[]', selectStyle);
  }

  if (selectBrand !== null && selectBrand !== undefined) {
    query.append('brand', selectBrand);
  }

  const res = await fetch(`https://175061237ca5525f.mokky.dev/snakers?${query}`);
  if (!res.ok) throw new Error(`Ошибка ${res.status}`);

  const json = await res.json() as {
    meta: { total_items: number; total_pages: number; current_page: number };
    items: any[];
  };

  return {
    items: json.items,
    total: json.meta.total_items,
  };
}
