import { Headphones, PackageCheck, ShieldCheck, Truck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer container">
      <div><Truck /><span><strong>Free Shipping</strong><small>On orders over $50</small></span></div>
      <div><PackageCheck /><span><strong>30-Day Returns</strong><small>Hassle-free returns</small></span></div>
      <div><ShieldCheck /><span><strong>Secure Payments</strong><small>Protected checkout</small></span></div>
      <div><Headphones /><span><strong>Customer Support</strong><small>We’re here to help</small></span></div>
    </footer>
  );
}
