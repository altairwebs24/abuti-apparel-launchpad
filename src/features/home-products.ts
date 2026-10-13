export const HOME_PRODUCT_COUNT = 4;

export function selectHomeProducts<T>(products: readonly T[]): T[] {
  return products.slice(0, HOME_PRODUCT_COUNT);
}