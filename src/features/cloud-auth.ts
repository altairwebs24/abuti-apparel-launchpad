import { createMiddleware } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { resolveCloudConfig } from './cloud-config';

// Build-time public connection values keep external deployments connected;
// the bearer is independently validated by Cloud and all queries retain RLS.
export const requireStoreAuth = createMiddleware({ type: 'function' }).server(async ({ next }) => {
  const { url, key } = resolveCloudConfig(process.env['SUPABASE_URL'], process.env['SUPABASE_PUBLISHABLE_KEY'], import.meta.env['VITE_SUPABASE_URL'], import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY']);
  const header = getRequest().headers.get('authorization');
  if (!header?.startsWith('Bearer ')) throw new Error('Please sign in to continue.');
  const token = header.slice(7);
  const supabase = createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` }, fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      headers.set('apikey', key);
      return fetch(input, { ...init, headers });
    } },
  });
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) throw new Error('Your sign-in has expired. Please sign in again.');
  return next({ context: { supabase, userId: data.user.id } });
});