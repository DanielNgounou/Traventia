import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { categories, products } from '../data/products';

export default function Home() {
  return (
    <div className="container page-space">
      <section className="hero">
        <div className="hero-overlay">
          <p className="eyebrow">Designed for every journey</p>
          <h1>Smart gear.<br /><span>Better journeys.</span></h1>
          <p>High-quality travel essentials built for comfort, organization, and confidence.</p>
          <div className="hero-actions">
            <Link className="button primary" to="/shop">Shop Now</Link>
            <a className="button secondary" href="#categories">Explore Categories</a>
          </div>
        </div>
      </section>

      <section id="categories" className="section">
        <div className="section-heading"><h2>Shop by category</h2><Link to="/shop">View all</Link></div>
        <div className="category-grid">
          {categories.map((category) => <Link to={`/shop?category=${encodeURIComponent(category)}`} key={category}>{category}</Link>)}
        </div>
      </section>

      <section className="section">
        <div className="section-heading"><h2>Best sellers</h2><Link to="/shop">View all</Link></div>
        <div className="product-grid">
          {products.slice(0, 6).map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  );
}
