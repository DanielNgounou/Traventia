import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();
  const shipping = subtotal >= 50 ? 0 : 8.99;

  if (!items.length) return <div className="container page-space empty-state"><h1>Your cart is empty</h1><p>Add a few essentials before your next journey.</p><Link className="button primary" to="/shop">Start shopping</Link></div>;

  return (
    <div className="container page-space cart-layout">
      <section><h1>Your cart</h1>{items.map((item) => <article className="cart-item" key={item.id}><img src={item.image} alt={item.name} /><div><h3>{item.name}</h3><p>{item.color}</p><button onClick={() => removeFromCart(item.id)}>Remove</button></div><div className="cart-qty"><button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button></div><strong>${(item.price * item.quantity).toFixed(2)}</strong></article>)}</section>
      <aside className="summary-card"><h2>Order summary</h2><p><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></p><p><span>Shipping</span><strong>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</strong></p><p className="summary-total"><span>Total</span><strong>${(subtotal + shipping).toFixed(2)}</strong></p><Link className="button primary wide" to="/checkout">Proceed to checkout</Link></aside>
    </div>
  );
}
