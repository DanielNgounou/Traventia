import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      <button className="wishlist" aria-label="Add to wishlist"><Heart size={19} /></button>
      <div className="product-card-body">
        <Link to={`/products/${product.id}`}><h3>{product.name}</h3></Link>
        <p className="rating">★★★★★ <span>({product.reviews})</span></p>
        <div className="product-card-footer">
          <strong>${product.price.toFixed(2)}</strong>
          <button onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}><ShoppingCart size={19} /></button>
        </div>
      </div>
    </article>
  );
}
