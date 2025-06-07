// services/get/filterForSneakers.ts

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
  items: any[]; // только массив
  total: number; // общее число записей
}

export async function getWithFilter(params: FilterParams): Promise<SneakersResponse> {
  const { page = 1, limit = 12, ...filters } = params;
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(filters.priceFrom != null && { price_gte: String(filters.priceFrom) }),
    ...(filters.priceTo != null && { price_lte: String(filters.priceTo) }),
    ...(filters.selectSize != null && { size: String(filters.selectSize) }),
    ...(filters.selectStyle && { style: filters.selectStyle }),
    ...(filters.selectBrand && { brand: filters.selectBrand }),
  } as Record<string, string>);

  const res = await fetch(`https://175061237ca5525f.mokky.dev/snakers?${query}`);
  if (!res.ok) throw new Error(`Ошибка ${res.status}`);

  // Mokky отдаёт { meta: { total_items, total_pages, ... }, items: [...] }
  const json = (await res.json()) as {
    meta: { total_items: number; total_pages: number; current_page: number };
    items: any[];
  };

  return {
    items: json.items,
    total: json.meta.total_items, // или json.meta.total_pages, если нужны страницы
  };
}
