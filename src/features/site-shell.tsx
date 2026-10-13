import { Link } from '@tanstack/react-router';
import { useState,type ReactNode } from 'react';
import { ArrowUpRight,Menu,X,ShoppingBag,User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { media } from './media';
import { useSession } from './session';
const links=[['/','Home'],['/shop','Shop'],['/story','Our story'],['/the-bees','The Bees FC'],['/contact','Contact']] as const;
export function SiteShell({children}:{children:ReactNode}){
 const [open,setOpen]=useState(false);const {session}=useSession();
 return <><header className="site-header"><Link to="/" className="brand" aria-label="Abuti Apparel home"><img src={media.logo} alt="Abuti monogram"/><span>ABUTI</span></Link><nav className="nav-links" aria-label="Main navigation">{links.map(([to,label])=><Link key={to} to={to}>{label}</Link>)}</nav><div className="flex items-center gap-2"><Button asChild variant="ghost" size="icon" title={session?'Your account':'Admin sign in'}><Link to="/admin" aria-label={session?'Your account':'Admin sign in'}><User/></Link></Button><Button asChild variant="ghost" size="icon" title="Shop"><Link to="/shop" aria-label="Shop collection"><ShoppingBag/></Link></Button><Button className="mobile-menu" variant="ghost" size="icon" onClick={()=>setOpen(!open)} aria-label={open?'Close menu':'Open menu'}>{open?<X/>:<Menu/>}</Button></div></header>{open&&<nav className="mobile-nav" aria-label="Mobile navigation">{links.map(([to,label])=><Link key={to} to={to} onClick={()=>setOpen(false)}>{label}</Link>)}</nav>}<main>{children}</main><footer className="site-footer"><div className="footer-top"><div><Link to="/" className="footer-word">ABUTI.</Link><p className="mt-3 text-xs opacity-70">More than what you wear. Who you are.</p></div><div className="footer-links">{links.slice(1).map(([to,label])=><Link key={to} to={to}>{label}</Link>)}<Link to="/admin">Admin <ArrowUpRight className="inline size-3"/></Link></div></div><div className="footer-bottom"><span>© 2026 Abuti Apparel.</span><span>IDENTITY. CULTURE. COMMUNITY.</span></div></footer></>;
}
