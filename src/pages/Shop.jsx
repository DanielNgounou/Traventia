import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { brands, categories, products } from '../data/products';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');
  const query = (searchParams.get('q') || '').toLowerCase();
  const [selectedCategories, setSelectedCategories] = useState(initialCategory ? [initialCategory] : []);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100);
  const [inStockOnly, setInStockOnly] = useState(false);

  const toggle = (value, setter) => setter((current) => current.includes(value) ? current.filter((x) => x !== value) : [...current, value]);

  const filtered = useMemo(() => products.filter((product) => {
    const queryMatch = !query || `${product.name} ${product.category} ${product.brand}`.toLowerCase().includes(query);
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const priceMatch = product.price <= maxPrice;
    const stockMatch = !inStockOnly || product.inStock;
    return queryMatch && categoryMatch && brandMatch && priceMatch && stockMatch;
  }), [query, selectedCategories, selectedBrands, maxPrice, inStockOnly]);

  const clearAll = () => { setSelectedCategories([]); setSelectedBrands([]); setMaxPrice(100); setInStockOnly(false); };

  return (
    <div className="container page-space shop-layout">
      <aside className="filters">
        <div className="filter-title"><h2>Filters</h2><button onClick={clearAll}>Clear all</button></div>
        <div className="filter-group"><h3>Category</h3>{categories.map((category) => <label key={category}><input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => toggle(category, setSelectedCategories)} />{category}</label>)}</div>
        <div className="filter-group"><h3>Price</h3><input type="range" min="10" max="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} /><p>Up to ${maxPrice}</p></div>
        <div className="filter-group"><h3>Brand</h3>{brands.map((brand) => <label key={brand}><input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggle(brand, setSelectedBrands)} />{brand}</label>)}</div>
        <div className="filter-group"><label><input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />In stock only</label></div>
      </aside>
      <section>
        <div className="shop-heading"><div><p className="eyebrow">Explore essentials</p><h1>Travel products</h1><p>{filtered.length} products found</p></div><select aria-label="Sort products"><option>Popularity</option><option>Price: Low to High</option><option>Price: High to Low</option></select></div>
        {filtered.length ? <div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><h2>No products found</h2><p>Try removing a filter or increasing the price range.</p></div>}
      </section>
    </div>
  );
}
