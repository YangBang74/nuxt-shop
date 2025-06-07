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
  items: any[];
  total: number;
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
  if (!res.ok) {
    throw new Error(`Ошибка запроса: ${res.status}`);
  }

  const data = await res.json();
  // Берём общее число из заголовка X-Total-Count
  const total = Number(res.headers.get('X-Total-Count') ?? data.length);

  return { items: data, total };
}
