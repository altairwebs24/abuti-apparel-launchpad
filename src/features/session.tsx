import { createContext,useContext,useEffect,useState,type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
const SessionContext=createContext<{session:Session|null;ready:boolean}>({session:null,ready:false});
export const useSession=()=>useContext(SessionContext);
export function SessionProvider({children}:{children:ReactNode}) {
 const [session,setSession]=useState<Session|null>(null);const [ready,setReady]=useState(false);const queryClient=useQueryClient();const router=useRouter();
 useEffect(()=>{supabase.auth.getSession().then(({data})=>{setSession(data.session);setReady(true)});const {data:{subscription}}=supabase.auth.onAuthStateChange((event,next)=>{setSession(next);setReady(true);if(['SIGNED_IN','SIGNED_OUT','USER_UPDATED'].includes(event)){router.invalidate();if(event!=='SIGNED_OUT')queryClient.invalidateQueries();}});return()=>subscription.unsubscribe();},[queryClient,router]);
 return <SessionContext.Provider value={{session,ready}}>{children}</SessionContext.Provider>;
}
