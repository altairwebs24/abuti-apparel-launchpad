import {createClient} from '@supabase/supabase-js';
import {describe,it,expect} from 'vitest';
const client=createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init)=>{const headers=new Headers(init?.headers);const key=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;if(headers.get('Authorization')===`Bearer ${key}`)headers.delete('Authorization');headers.set('apikey',key);return fetch(input,{...init,headers});}}});
describe('External catalog permissions',()=>{
 it('allows signed-out visitors to read published products',async()=>{const {error,status}=await client.from('products').select('id').eq('published',true);expect(error).toBeNull();expect(status).toBe(200);});
 it('does not allow signed-out visitors to check private administrator roles',async()=>{const {error}=await client.rpc('has_role',{_user_id:'00000000-0000-0000-0000-000000000000',_role:'admin'});expect(error).not.toBeNull();expect(error?.code).toBe('42501');});
});
