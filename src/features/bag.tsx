import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
export type BagItem = { id:string; name:string; image_url:string; price:number; currency:string; size:string; quantity:number };
const BagContext = createContext<{ items:BagItem[]; add:(item:BagItem)=>void; remove:(id:string,size:string)=>void }>({ items:[], add:()=>{}, remove:()=>{} });
export const useBag = () => useContext(BagContext);
export function BagProvider({children}:{children:ReactNode}) {
 const [items,setItems]=useState<BagItem[]>([]);
 const [ready,setReady]=useState(false);
 useEffect(()=>{try{const raw=JSON.parse(localStorage.getItem('abuti-bag')||'[]');if(Array.isArray(raw))setItems(raw.filter(i=>typeof i?.id==='string'&&typeof i?.name==='string'&&typeof i?.price==='number'&&typeof i?.quantity==='number'&&i.quantity>0));}catch{}setReady(true);},[]);
 useEffect(()=>{if(ready)localStorage.setItem('abuti-bag',JSON.stringify(items));},[items,ready]);
 function add(item:BagItem){setItems(previous=>{const existing=previous.find(i=>i.id===item.id&&i.size===item.size);return existing?previous.map(i=>i===existing?{...i,quantity:i.quantity+item.quantity}:i):[...previous,item];});}
 return <BagContext.Provider value={{items,add,remove:(id,size)=>setItems(previous=>previous.filter(i=>i.id!==id||i.size!==size))}}>{children}</BagContext.Provider>;
}