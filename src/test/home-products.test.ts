import { describe, expect, it } from 'vitest';
import { selectHomeProducts } from '@/features/home-products';

describe('Homepage product selection', () => {
  it('displays four products when the catalog has at least four', () => {
    expect(selectHomeProducts(['latest', 'second', 'third', 'fourth', 'fifth'])).toEqual([
      'latest', 'second', 'third', 'fourth',
    ]);
  });

  it('does not fabricate products when fewer than four are published', () => {
    expect(selectHomeProducts(['real-product'])).toEqual(['real-product']);
  });
});