export async function getWithFilter(filter: {
  priceFrom: number | null;
  priceTo: number | null;
  selectSize: number | null;
  selectStyle: string | null;
  selectBrand: string | null;
}) {
  const { priceFrom, priceTo, selectSize, selectStyle, selectBrand } = filter;
  try {
    const params = new URLSearchParams();
    if (priceFrom !== null) params.append('price[from]', String(priceFrom));
    if (priceTo !== null) params.append('price[to]', String(priceTo));
    if (selectSize !== null) params.append('sizes[]', String(selectSize));
    if (selectStyle !== null) params.append('style[]', selectStyle);
    if (selectBrand !== null) params.append('brand', selectBrand);

    const url = `https://175061237ca5525f.mokky.dev/snakers?${params.toString()}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Что-то пошло не так');

    return data;
  } catch (err: any) {
    return err.message;
  }
}
