import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const steps = ['Shipping', 'Payment', 'Review', 'Confirmation'];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const shipping = subtotal >= 50 ? 0 : 8.99;
  const tax = subtotal * 0.13;
  const total = subtotal + shipping + tax;

  if (!items.length && step < 3) return <div className="container page-space empty-state"><h1>No items to checkout</h1><Link className="button primary" to="/shop">Go to shop</Link></div>;

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const confirm = () => { clearCart(); setStep(3); };

  return (
    <div className="container page-space checkout-page">
      <div className="stepper">{steps.map((label, index) => <div key={label} className={index <= step ? 'active' : ''}><span>{index + 1}</span><small>{label}</small></div>)}</div>
      {step === 3 ? <section className="confirmation"><div className="confirmation-icon">✓</div><h1>Thank you! Your order has been placed.</h1><p>Order number: <strong>#TRV-2026-05214</strong></p><div className="confirmation-actions"><button className="button primary" onClick={() => navigate('/survey')}>Share feedback</button><Link className="button secondary" to="/shop">Continue shopping</Link></div></section> : <div className="checkout-layout"><section className="checkout-card">
        {step === 0 && <><h1>Shipping information</h1><div className="form-grid"><label>Full name<input defaultValue="Daniel Ngounou" /></label><label>Phone number<input defaultValue="+1 (613) 123-4567" /></label><label className="full">Address<input defaultValue="90 University Private" /></label><label>City<input defaultValue="Ottawa" /></label><label>Province<select defaultValue="Ontario"><option>Ontario</option><option>Quebec</option></select></label><label>Postal code<input defaultValue="K1N 6N5" /></label><label>Country<select defaultValue="Canada"><option>Canada</option><option>United States</option></select></label></div></>}
        {step === 1 && <><h1>Payment method</h1><div className="payment-options"><label><input type="radio" name="payment" defaultChecked /> Credit / Debit Card</label><label><input type="radio" name="payment" /> PayPal</label><label><input type="radio" name="payment" /> Apple Pay</label></div><div className="form-grid"><label className="full">Card number<input placeholder="1234 5678 9012 3456" /></label><label>Name on card<input placeholder="Daniel Ngounou" /></label><label>Expiry date<input placeholder="MM / YY" /></label><label>CVV<input placeholder="123" /></label></div></>}
        {step === 2 && <><h1>Review your order</h1><div className="review-block"><h3>Shipping address</h3><p>Daniel Ngounou<br />90 University Private<br />Ottawa, ON K1N 6N5</p></div><div className="review-block"><h3>Payment</h3><p>Visa ending in 4242</p></div><div className="review-block"><h3>Items</h3>{items.map((item) => <p key={item.id}>{item.name} × {item.quantity}</p>)}</div></>}
        <div className="checkout-actions"><button className="button secondary" onClick={back} disabled={step === 0}>Back</button>{step < 2 ? <button className="button primary" onClick={next}>Continue</button> : <button className="button primary" onClick={confirm}>Place order securely</button>}</div>
      </section><aside className="summary-card"><h2>Order summary</h2>{items.map((item) => <p key={item.id}><span>{item.name} × {item.quantity}</span><strong>${(item.price * item.quantity).toFixed(2)}</strong></p>)}<p><span>Shipping</span><strong>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</strong></p><p><span>Tax</span><strong>${tax.toFixed(2)}</strong></p><p className="summary-total"><span>Total</span><strong>${total.toFixed(2)}</strong></p></aside></div>}
    </div>
  );
}
