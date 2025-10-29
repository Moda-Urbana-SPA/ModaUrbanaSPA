import { useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { CATEGORIES, MODA_PRODUCTS } from '../data/moda.mock';
import Filters from '../components/products/Filters';
import ProductGrid from '../components/products/ProductGrid';

export default function Products() {
  const [filter, setFilter] = useState('all');

  const list = useMemo(() => {
    return filter === 'all'
      ? MODA_PRODUCTS
      : MODA_PRODUCTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <main>
      <Container>
        <h2 className="mb-2">Catálogo Moda Urbana</h2>
        <p className="text-muted mb-3">Pantalones, polerones y más!</p>

        <Filters
          current={filter}
          onChange={setFilter}
          options={CATEGORIES}
          total={MODA_PRODUCTS.length}
        />

        <ProductGrid items={list} />
      </Container>
    </main>
  );
}
