import { Heart, Search, ShoppingCart, UserRound } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { itemCount } = useCart();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="header">
      <div className="promo-bar">Free shipping on orders over $50 <span>•</span> 30-day easy returns</div>
      <div className="header-main container">
        <Link to="/" className="brand">Traventia<span>Essentials for every journey</span></Link>
        <form className="search" onSubmit={submit}>
          <Search size={18} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search travel essentials..." />
          <button aria-label="Search"><Search size={20} /></button>
        </form>
        <div className="header-actions">
          <button className="icon-button" aria-label="Account"><UserRound /></button>
          <button className="icon-button" aria-label="Wishlist"><Heart /></button>
          <Link to="/cart" className="icon-button cart-button" aria-label="Cart"><ShoppingCart />{itemCount > 0 && <span>{itemCount}</span>}</Link>
        </div>
      </div>
      <nav className="nav container">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <a href="#categories">Categories</a>
        <a href="#deals">Deals</a>
        <a href="#about">About Us</a>
      </nav>
    </header>
  );
}
