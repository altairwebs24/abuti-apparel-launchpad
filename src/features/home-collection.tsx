import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { listProducts } from '@/features/products.functions';
import { HOME_PRODUCT_COUNT, selectHomeProducts } from '@/features/home-products';

export function HomeCollection() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['public-products'],
    queryFn: () => listProducts(),
  });

  return (
    <section className="section" aria-label="Featured products">
      <div className="section-heading home-collection-heading">
        <div>
          <span className="eyebrow">The collection</span>
          <h2>MAKE IT YOURS.</h2>
        </div>
        <Button asChild variant="link" className="text-xs">
          <Link to="/shop">Shop all <ArrowUpRight /></Link>
        </Button>
      </div>
      {isPending ? (
        <div className="product-grid home-product-grid" aria-label="Loading products" aria-busy="true">
          {Array.from({ length: HOME_PRODUCT_COUNT }, (_, index) => (
            <div key={index} className="product-photo animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <div role="status" className="py-8">
          <p className="mb-4 text-muted-foreground">The collection could not load.</p>
          <Button variant="outline" onClick={() => void refetch()}>Try again</Button>
        </div>
      ) : data?.length ? (
        <div className="product-grid home-product-grid">
          {selectHomeProducts(data).map(product => (
            <article key={product.id} className="min-w-0">
              <Link to="/shop/$productId" params={{ productId: product.id }} aria-label={`View ${product.name}`}>
                <img src={product.image_url} alt={product.name} className="product-photo" loading="lazy" />
              </Link>
              <p className="eyebrow mt-4 text-muted-foreground">{product.category}</p>
              <h3 className="home-product-name">{product.name}</h3>
              <p className="my-2 text-sm">
                {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: product.currency }).format(product.price)}
              </p>
              <Button asChild variant="link" className="px-0">
                <Link to="/shop/$productId" params={{ productId: product.id }}>View details <ArrowUpRight /></Link>
              </Button>
            </article>
          ))}
        </div>
      ) : (
        <p className="py-8 text-muted-foreground">The next collection is coming soon.</p>
      )}
    </section>
  );
}