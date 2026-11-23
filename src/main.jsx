import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Menu, Plus, Search, ShoppingBag, Sparkles, Upload, X } from 'lucide-react';
import './styles.css';

const products = [
  { id: 1, name: 'Good Energy Tee', type: 'T-Shirts', price: 1800, tag: 'BESTSELLER', color: 'Cream', colors: ['#e9e3d8','#111111','#6d756b'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85', design: 'GOOD ENERGY', desc: 'A relaxed everyday tee with a little reminder to keep your energy right.' },
  { id: 2, name: 'Offline Hoodie', type: 'Hoodies', price: 4200, tag: 'NEW DROP', color: 'Black', colors: ['#171717','#e9e3d8','#87918a'], image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85', design: 'OFFLINE', desc: 'Heavy, cozy and made for switching off.' },
  { id: 3, name: 'Everyday Tote', type: 'Accessories', price: 1200, tag: 'EASY CARRY', color: 'Natural', colors: ['#c9b99c','#111111'], image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85', design: 'TAKE IT EASY', desc: 'A sturdy canvas tote for all the things you carry.' },
  { id: 4, name: 'No Rules Tee', type: 'T-Shirts', price: 2000, tag: 'LIMITED', color: 'White', colors: ['#f2f0eb','#111111','#a5a5a5'], image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85', design: 'NO RULES', desc: 'For ideas that were never meant to fit in.' },
  { id: 5, name: 'Studio Crew', type: 'Sweatshirts', price: 3500, tag: 'STUDIO PICK', color: 'Grey', colors: ['#9b9b9b','#111111','#e7dfd2'], image: 'https://images.unsplash.com/photo-1578681994506-8f847a8f4e4b?auto=format&fit=crop&w=900&q=85', design: 'STAN STUDIO', desc: 'The soft layer you will keep reaching for.' },
  { id: 6, name: 'Made Different Tote', type: 'Accessories', price: 1400, tag: 'NEW', color: 'Natural', colors: ['#c9b99c','#111111'], image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85', design: 'MADE DIFFERENT', desc: 'Carry your personality everywhere.' },
];
const money = (amount, currency) => currency === 'USD' ? `$${(amount / 130).toFixed(2)}` : `KSh ${amount.toLocaleString('en-KE')}`;

function App() {
  const [currency, setCurrency] = useState('KES');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [customFile, setCustomFile] = useState(null);
  const railRef = useRef(null);
  const categories = ['All', 'T-Shirts', 'Hoodies', 'Sweatshirts', 'Accessories'];
  const filtered = useMemo(() => products.filter(p => (activeCategory === 'All' || p.type === activeCategory) && p.name.toLowerCase().includes(searchTerm.toLowerCase())), [activeCategory, searchTerm]);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const addToCart = (product, options = {}) => {
    const key = `${product.id}-${options.size || 'OS'}-${options.color || product.color}`;
    setCart(prev => {
      const found = prev.find(x => x.key === key);
      if (found) return prev.map(x => x.key === key ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { key, ...product, qty: 1, size: options.size || 'OS', color: options.color || product.color }];
    });
    setSelected(null); setCartOpen(true);
  };
  const changeQty = (key, delta) => setCart(prev => prev.map(item => item.key === key ? { ...item, qty: item.qty + delta } : item).filter(item => item.qty > 0));
  const scrollRail = direction => railRef.current?.scrollBy({ left: direction * 430, behavior: 'smooth' });

  return <>
    <div className="announcement">A little creativity goes a long way. <span>Worldwide shipping coming soon ↗</span></div>
    <header className="site-header">
      <button className="mobile-trigger icon-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu"><Menu size={21}/></button>
      <a href="#" className="wordmark">STAN<span>CREATIVES</span></a>
      <nav className={mobileMenu ? 'main-nav open' : 'main-nav'}>
        <a href="#shop" onClick={() => setMobileMenu(false)}>Shop</a><a href="#drops" onClick={() => setMobileMenu(false)}>New drops</a><a href="#custom" onClick={() => setMobileMenu(false)}>Custom design</a><a href="#story" onClick={() => setMobileMenu(false)}>Our story</a>
      </nav>
      <div className="header-actions">
        <button className="currency-switch" onClick={() => setCurrency(currency === 'KES' ? 'USD' : 'KES')}>{currency} <span>⌄</span></button>
        <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search size={19}/></button>
        <button className="bag-btn" onClick={() => setCartOpen(true)} aria-label="Open shopping bag"><ShoppingBag size={19}/><span>{cartCount}</span></button>
      </div>
    </header>
    {searchOpen && <div className="search-bar"><Search size={18}/><input autoFocus placeholder="Search designs and products..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/><button onClick={() => {setSearchOpen(false);setSearchTerm('')}}><X size={18}/></button></div>}
    <main>
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow"><span className="dot"/> INDEPENDENT CREATIVE GOODS · EST. 2026</p><h1>YOUR IDEAS.<br/><em>YOUR STYLE.</em><br/>YOUR PIECE.</h1><p className="hero-description">Wear something that means something. Shop original designs or create something uniquely yours.</p><div className="hero-ctas"><a className="button button-dark" href="#shop">SHOP THE COLLECTION <ArrowUpRight size={16}/></a><button className="button button-light" onClick={() => setCustomOpen(true)}>CREATE YOUR OWN <Sparkles size={16}/></button></div><div className="hero-footnote"><span>DESIGNED TO EXPRESS</span><span>MADE TO BE WORN ↗</span></div></div>
        <div className="hero-art"><div className="hero-stamp">SC<br/><small>STUDIO / 01</small></div><img src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1400&q=90" alt="Editorial streetwear collection"/><div className="hero-caption"><span>THE EVERYDAY<br/>IS YOUR CANVAS.</span><span>01 / 04</span></div></div>
        <a className="scroll-note" href="#shop"><ArrowDown size={15}/> SCROLL TO EXPLORE</a>
      </section>

      <section className="marquee" aria-label="Brand message"><div>MAKE IT PERSONAL <span>✳</span> WEAR IT LOUD <span>✳</span> MAKE IT PERSONAL <span>✳</span> WEAR IT LOUD <span>✳</span></div></section>

      <section className="section shop-section" id="shop">
        <div className="section-heading"><div><p className="eyebrow">01 / THE STORE</p><h2>Find your <em>thing.</em></h2></div><p className="section-intro">Original pieces for everyday expression. Find a design that feels like you.</p></div>
        <div className="category-row">{categories.map(cat => <button key={cat} className={activeCategory === cat ? 'category active' : 'category'} onClick={() => setActiveCategory(cat)}>{cat}</button>)}</div>
        <div className="product-rail-wrap"><button className="rail-arrow left" onClick={() => scrollRail(-1)} aria-label="Scroll products left"><ChevronLeft/></button><div className="product-rail" ref={railRef}>{filtered.map((p,i) => <article className="product-card" key={p.id}><button className="product-image" onClick={() => setSelected(p)}><img src={p.image} alt={p.name}/><span className="product-tag">{p.tag}</span><span className="quick-view">QUICK VIEW <ArrowUpRight size={14}/></span></button><div className="product-meta"><div><h3>{p.name}</h3><p>{p.type}</p></div><strong>{money(p.price,currency)}</strong></div><div className="product-colors">{p.colors.map((c,j)=><i key={j} style={{background:c}}/>)}</div></article>)}</div><button className="rail-arrow right" onClick={() => scrollRail(1)} aria-label="Scroll products right"><ChevronRight/></button></div>
        {filtered.length === 0 && <p className="empty-state">No products match that search. Try another name.</p>}
        <div className="center-link"><a href="#drops">EXPLORE THE COLLECTION <ArrowRight size={15}/></a></div>
      </section>

      <section className="custom-banner" id="custom"><div className="custom-image"><img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85" alt="Custom printed apparel"/></div><div className="custom-copy"><p className="eyebrow">02 / THE DESIGN STUDIO</p><h2>Got an idea?<br/><em>Put it on.</em></h2><p>Make your own wearable piece. Choose your product, share your artwork and tell us how you want it to look. We'll help bring it to life.</p><ul><li><Check size={16}/> Your artwork, your way</li><li><Check size={16}/> Small runs and one-offs welcome</li><li><Check size={16}/> Support from our creative team</li></ul><button className="button button-dark" onClick={() => setCustomOpen(true)}>START A CUSTOM ORDER <ArrowUpRight size={16}/></button></div></section>

      <section className="section drop-section" id="drops"><div className="section-heading"><div><p className="eyebrow">03 / FRESH FROM THE STUDIO</p><h2>New in. <em>Just dropped.</em></h2></div><span className="drop-note">SMALL RUNS. BIG PERSONALITY.</span></div><div className="drop-grid"><div className="drop-tile tall"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1100&q=85" alt="Streetwear look"/><div><span>THE NEW UNIFORM</span><h3>Not here to blend in.</h3></div></div><div className="drop-tile"><img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85" alt="Hoodie collection"/><div><span>THE COMFORT CLUB</span><h3>Soft, but make a statement.</h3></div></div><div className="drop-tile"><img src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85" alt="Tote bag"/><div><span>EVERYDAY OBJECTS</span><h3>Carry your point of view.</h3></div></div></div></section>

      <section className="story-section" id="story"><div className="story-mark">SC<span>✳</span></div><div><p className="eyebrow">04 / A LITTLE ABOUT US</p><h2>More than merch.<br/><em>A way to express.</em></h2><p>Stan Creatives is for people who see everyday things as a chance to say something. We bring original artwork and personal ideas onto the pieces you wear and carry.</p><a href="#custom">MAKE SOMETHING WITH US <ArrowUpRight size={15}/></a></div><div className="story-side">CREATIVITY<br/>IS ALWAYS<br/>IN SEASON.</div></section>

      <section className="newsletter"><div><p className="eyebrow">DON'T MISS THE NEXT DROP</p><h2>Good things<br/><em>are coming.</em></h2></div><form onSubmit={e => {e.preventDefault();alert('Thanks for your interest! Newsletter signup will be connected before launch.')}}><label htmlFor="email">GET STUDIO NEWS & FIRST ACCESS</label><div><input id="email" type="email" required placeholder="Your email address"/><button aria-label="Subscribe"><ArrowUpRight/></button></div><small>By signing up, you agree to receive occasional updates from Stan Creatives.</small></form></section>
    </main>
    <footer className="footer"><a href="#" className="wordmark">STAN<span>CREATIVES</span></a><p>YOUR IDEAS. YOUR STYLE. YOUR PIECE.</p><div><a href="#shop">SHOP</a><a href="#custom">CUSTOM ORDERS</a><a href="#story">ABOUT</a><a href="mailto:hello@stancreatives.com">CONTACT</a></div><small>© 2026 STAN CREATIVES. MADE WITH INTENTION.</small></footer>

    {selected && <div className="overlay" onClick={() => setSelected(null)}><div className="modal product-modal" onClick={e => e.stopPropagation()}><button className="close-btn" onClick={() => setSelected(null)}><X/></button><img src={selected.image} alt={selected.name}/><div className="modal-info"><p className="eyebrow">{selected.tag}</p><h2>{selected.name}</h2><strong>{money(selected.price,currency)}</strong><p>{selected.desc}</p><label>SIZE</label><div className="size-options">{['S','M','L','XL','XXL'].map(s=><button key={s} className="size-option" onClick={e => e.currentTarget.classList.toggle('chosen')}>{s}</button>)}</div><label>COLOUR</label><div className="swatches">{selected.colors.map((c,i)=><button key={c} style={{background:c}} aria-label={'Colour '+(i+1)} onClick={e => {e.currentTarget.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('chosen'));e.currentTarget.classList.add('chosen')}}/></div><button className="button button-dark full" onClick={() => {const size=document.querySelector('.size-option.chosen')?.textContent || 'M';addToCart(selected,{size})}}>ADD TO BAG — {money(selected.price,currency)} <ShoppingBag size={16}/></button></div></div></div>}

    {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><h2>YOUR BAG <span>({cartCount})</span></h2><button className="close-btn" onClick={() => setCartOpen(false)}><X/></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={32}/><h3>Your bag is waiting.</h3><p>Find something that feels like you.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>KEEP SHOPPING</button></div> : <><div className="cart-items">{cart.map(item=><div className="cart-item" key={item.key}><img src={item.image} alt={item.name}/><div><h3>{item.name}</h3><p>{item.color} · {item.size}</p><strong>{money(item.price,currency)}</strong><div className="qty"><button onClick={()=>changeQty(item.key,-1)}>−</button><span>{item.qty}</span><button onClick={()=>changeQty(item.key,1)}>+</button></div></div></div>)}</div><div className="cart-total"><span>SUBTOTAL</span><strong>{money(cartTotal,currency)}</strong><small>Shipping and taxes are calculated at checkout.</small><button className="button button-dark full" onClick={()=>alert('Checkout is not connected yet. We will add secure payments before launch.')}>CONTINUE TO CHECKOUT <ArrowUpRight size={16}/></button></div></>}</aside></div>}

    {customOpen && <div className="overlay" onClick={() => setCustomOpen(false)}><div className="modal custom-modal" onClick={e => e.stopPropagation()}><button className="close-btn" onClick={() => setCustomOpen(false)}><X/></button><p className="eyebrow">STAN CREATIVES / CUSTOM STUDIO</p><h2>Let's make<br/><em>your idea real.</em></h2><p className="form-intro">Tell us a little about what you have in mind. This request form is a prototype; submission will not yet send or store your details.</p><form onSubmit={e=>{e.preventDefault();alert('Thanks! Custom request submission will be connected before launch.')}}><div className="form-row"><label>YOUR NAME<input required placeholder="Name"/></label><label>EMAIL ADDRESS<input type="email" required placeholder="you@example.com"/></label></div><div className="form-row"><label>PRODUCT<select><option>T-shirt</option><option>Hoodie</option><option>Sweatshirt</option><option>Tote bag</option><option>Other</option></select></label><label>QUANTITY<input type="number" min="1" defaultValue="1"/></label></div><label>DESCRIBE YOUR IDEA<textarea rows="3" placeholder="Tell us about the design, colours, placement and anything else..."/></label><label className="upload-box"><Upload size={22}/><span>{customFile ? customFile.name : 'UPLOAD YOUR ARTWORK (OPTIONAL)'}</span><small>PNG, JPG, SVG or PDF</small><input type="file" accept=".png,.jpg,.jpeg,.svg,.pdf" onChange={e=>setCustomFile(e.target.files?.[0] || null)}/></label><button className="button button-dark full">SEND CUSTOM REQUEST <ArrowUpRight size={16}/></button></form></div></div>}
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
