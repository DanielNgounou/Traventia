import { Minus, Plus, ShieldCheck, ShoppingCart, Truck } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === Number(productId));
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) return <div className="container page-space empty-state"><h1>Product not found</h1><Link to="/shop" className="button primary">Back to shop</Link></div>;

  return (
    <div className="container page-space">
      <div className="breadcrumb"><Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.name}</div>
      <section className="product-details">
        <div className="product-gallery"><img src={product.image} alt={product.name} /></div>
        <div className="product-info">
          <span className="badge">Bestseller</span>
          <h1>{product.name}</h1>
          <p className="rating">★★★★★ <span>{product.rating} ({product.reviews} reviews)</span></p>
          <p className="price">${product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <p><strong>Color:</strong> {product.color}</p>
          <div className="quantity-row"><span>Quantity</span><div><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={17} /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)}><Plus size={17} /></button></div></div>
          <p className="stock">{product.inStock ? 'In stock — ships within 24 hours' : 'Currently unavailable'}</p>
          <button className="button primary wide" disabled={!product.inStock} onClick={() => addToCart(product, quantity)}><ShoppingCart size={20} /> Add to Cart</button>
          <div className="trust-row"><span><Truck /> Free shipping over $50</span><span><ShieldCheck /> Secure checkout</span></div>
        </div>
      </section>
      <section className="section product-copy"><h2>Why you’ll love it</h2><div className="feature-grid"><article><h3>Carry-on approved</h3><p>Designed to fit most airline cabin requirements.</p></article><article><h3>Travel-ready materials</h3><p>Durable finishes made for repeated journeys.</p></article><article><h3>Smart organization</h3><p>Practical compartments keep essentials easy to reach.</p></article></div></section>
    </div>
  );
}
