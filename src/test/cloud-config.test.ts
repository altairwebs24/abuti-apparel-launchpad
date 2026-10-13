import { describe, expect, it } from 'vitest';
import { resolveCloudConfig } from '@/features/cloud-config';
describe('External store connection', () => {
  it('uses public build configuration when external runtime values are absent', () => {
    expect(resolveCloudConfig(undefined, undefined, 'https://store.example.com', 'sb_publishable_test')).toEqual({ url: 'https://store.example.com', key: 'sb_publishable_test' });
  });
  it('prefers runtime configuration when supplied', () => {
    expect(resolveCloudConfig('https://runtime.example.com', 'runtime-key', 'https://public.example.com', 'public-key')).toEqual({ url: 'https://runtime.example.com', key: 'runtime-key' });
  });
  it('refuses an incomplete connection', () => {
    expect(() => resolveCloudConfig(undefined, undefined, 'https://store.example.com', undefined)).toThrow('store connection is unavailable');
  });
});