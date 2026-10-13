import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import type { Database } from '@/integrations/supabase/types';
import { z } from 'zod';
export const productSchema = z.object({ id:z.string().uuid().optional(), name:z.string().trim().min(1), description:z.string(), price:z.number().nonnegative(), currency:z.string().length(3), category:z.string().min(1), sizes:z.array(z.string()), image_url:z.string().url(), published:z.boolean() });
export const listProducts = createServerFn({method:'GET'}).handler(async()=>{
 const url=process.env['SUPABASE_URL']; const key=process.env['SUPABASE_PUBLISHABLE_KEY'];
 if(!url || !key) throw new Error('Store connection unavailable');
 const client=createClient<Database>(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init)=>{const h=new Headers(init?.headers);if(key.startsWith('sb_')&&h.get('Authorization')===`Bearer ${key}`)h.delete('Authorization');h.set('apikey',key);return fetch(input,{...init,headers:h});}}});
 const {data,error}=await client.from('products').select('id,name,description,price,currency,image_url,category,sizes').eq('published',true).order('created_at',{ascending:false});
 if(error)throw new Error(error.message); return data;
});
export const adminProducts=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).handler(async({context})=>{
 const {data:allowed,error:roleError}=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'});
 if(roleError)throw new Error(roleError.message);if(!allowed)throw new Error('Administrator access has not been assigned to this account.');
 const {data,error}=await context.supabase.from('products').select('*').order('created_at',{ascending:false});if(error)throw new Error(error.message);return data;
});
export const saveProduct=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator((input:unknown)=>productSchema.parse(input)).handler(async({context,data})=>{
 const {data:allowed}=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'});if(!allowed)throw new Error('Administrator access required');
 const {id,...values}=data;
 const {error}=await context.supabase.from('products').upsert(id?{...values,id}:values);if(error)throw new Error(error.message);return {success:true};
});
export const deleteProduct=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator((input:unknown)=>z.object({id:z.string().uuid()}).parse(input)).handler(async({context,data})=>{
 const {data:allowed}=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'});if(!allowed)throw new Error('Administrator access required');
 const {error}=await context.supabase.from('products').delete().eq('id',data.id);if(error)throw new Error(error.message);return {success:true};
});
