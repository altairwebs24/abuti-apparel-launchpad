import { createFileRoute, notFound, Link } from '@tanstack/react-router';
import { PageError } from '@/features/page-error';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { listProducts } from '@/features/products.functions';
import { ProductView } from '@/features/product-view';
import { pageHead } from '@/lib/page-head';
import { Button } from '@/components/ui/button';
const productsQuery=queryOptions({queryKey:['public-products'],queryFn:()=>listProducts()});
export const Route=createFileRoute('/shop_/$productId')({
 codeSplitGroupings:[['component']],
 loader:async({params,context})=>{const products=await context.queryClient.ensureQueryData(productsQuery);const product=products.find(p=>p.id===params.productId);if(!product)throw notFound();return product;},
 head:({loaderData})=>{const product=loaderData;const head=pageHead(product?.name||'Product unavailable',product?.description||'Discover the Abuti Apparel collection.');const image=product?.image_url;return {meta:[...head.meta,...(image?.startsWith('https://')?[{property:'og:image',content:image},{name:'twitter:image',content:image}]:[])]};},
 component:Product,
 errorComponent:PageError,
 notFoundComponent:()=> <section className="section"><h1 className="page-title">PRODUCT UNAVAILABLE.</h1><Button asChild variant="outline"><Link to="/shop">Back to collection</Link></Button></section>,
});
function Product(){const {productId}=Route.useParams();const {data}=useSuspenseQuery(productsQuery);const product=data.find(p=>p.id===productId);if(!product)throw notFound();return <ProductView key={product.id} product={product}/>;}