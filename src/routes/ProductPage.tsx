import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { getProductBySlug, PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductGallery } from '../components/product/ProductGallery';
import { VariantSelector } from '../components/product/VariantSelector';
import { RelatedProducts } from '../components/product/RelatedProducts';
import { Accordion } from '../components/ui/Accordion';
import { Button } from '../components/ui/Button';
import { QtyStepper } from '../components/ui/QtyStepper';
import { PriceTag } from '../components/ui/PriceTag';
import { NumberedTag } from '../components/ui/NumberedTag';
import { useCartStore } from '../store/cartStore';
import type { ProductVariant } from '../types';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [variant, setVariant] = useState<ProductVariant | undefined>(
    product?.variants?.[0],
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  if (!product) return <Navigate to="/shop" replace />;

  const category = CATEGORIES.find((c) => c.slug === product.category);
  const productIndex = PRODUCTS.findIndex((p) => p.id === product.id) + 1;
  const effectivePrice = product.price + (variant?.priceModifier ?? 0);

  const onAdd = () => {
    addItem(product, variant, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const accordionItems = [
    {
      title: 'Dimensions',
      content: product.dimensions ? (
        <dl className="grid grid-cols-3 gap-4 caption">
          <div>
            <dt className="text-stone">Width</dt>
            <dd className="text-ink mt-1 tabular">
              {product.dimensions.width} cm
            </dd>
          </div>
          <div>
            <dt className="text-stone">Height</dt>
            <dd className="text-ink mt-1 tabular">
              {product.dimensions.height} cm
            </dd>
          </div>
          <div>
            <dt className="text-stone">Depth</dt>
            <dd className="text-ink mt-1 tabular">
              {product.dimensions.depth} cm
            </dd>
          </div>
        </dl>
      ) : (
        <p>Dimensions available on request.</p>
      ),
    },
    {
      title: 'What is included',
      content: (
        <ul className="space-y-2 list-disc pl-5 marker:text-stone">
          {product.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Shipping & Lead Time',
      content: (
        <p>
          Standard EU delivery in five to ten business days. Larger items ship
          via insured freight with assembly where possible. Contact us for
          tailored timelines on volume orders.
        </p>
      ),
    },
    {
      title: 'Materials & Care',
      content: (
        <p>
          Wipe with a soft, dry cloth. Avoid abrasive cleaners and direct
          sunlight where the material is finished.
          {product.tags.length > 0 && ` Tags: ${product.tags.join(' • ')}.`}
        </p>
      ),
    },
  ];

  return (
    <article className="px-6 lg:px-10 py-12 max-w-7xl mx-auto">
      <nav className="caption text-stone flex items-center gap-2 mb-12 flex-wrap">
        <Link to="/shop" className="hover:text-ink">
          Shop
        </Link>
        {category && (
          <>
            <ChevronRight size={12} />
            <Link to={`/shop/${category.slug}`} className="hover:text-ink">
              {category.name}
            </Link>
          </>
        )}
        <ChevronRight size={12} />
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} alt={product.name} />
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24 self-start flex flex-col gap-8">
          <div>
            <NumberedTag number={productIndex} />
            <h1 className="font-display text-4xl lg:text-5xl font-bold leading-tight mt-3">
              {product.name}
            </h1>
            {category && (
              <p className="caption text-stone mt-3">{category.name}</p>
            )}
          </div>

          <p className="text-lg text-stone leading-relaxed">
            {product.description}
          </p>

          <PriceTag amount={effectivePrice} size="lg" className="text-3xl" />

          {product.variants && product.variants.length > 0 && (
            <VariantSelector
              variants={product.variants}
              selectedId={variant?.id}
              onSelect={setVariant}
            />
          )}

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <QtyStepper value={qty} onChange={setQty} />
            <Button
              variant="rust"
              onClick={onAdd}
              disabled={!product.inStock}
              fullWidth
            >
              {added ? 'Added' : product.inStock ? 'Add to Cart' : 'Sold Out'}
            </Button>
          </div>

          <Accordion items={accordionItems} />
        </div>
      </div>

      <RelatedProducts current={product} />
    </article>
  );
}
