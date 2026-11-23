import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Menu, Plus, Search, ShoppingBag, Sparkles, Upload, X } from 'lucide-react';
import './styles.css';

const products = [
  { id: 1, name: 'Good Energy Tee', type: 'T-Shirts', price: 1800, tag: 'BESTSELLER', color: 'Cream', colors: ['#e9e3d8','#111111','#6d756b'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85', design: 'GOOD ENERGY', desc: 'An easy everyday tee, ready to wear as-is or make your own.' },
  { id: 2, name: 'Offline Hoodie', type: 'Hoodies', price: 4200, tag: 'NEW DROP', color: 'Black', colors: ['#171717','#e9e3d8','#87918a'], image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85', design: 'OFFLINE', desc: 'A relaxed heavyweight layer with room for your personal design.' },
  { id: 3, name: 'Everyday Tote', type: 'Accessories', price: 1200, tag: 'EASY CARRY', color: 'Natural', colors: ['#c9b99c','#111111'], image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85', design: 'TAKE IT EASY', desc: 'A durable canvas tote for everyday errands, books and everything in between.' },
  { id: 4, name: 'No Rules Tee', type: 'T-Shirts', price: 2000, tag: 'LIMITED', color: 'White', colors: ['#f2f0eb','#111111','#a5a5a5'], image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85', design: 'NO RULES', desc: 'A clean canvas for bold ideas and custom prints.' },
  { id: 5, name: 'Studio Crew', type: 'Sweatshirts', price: 3500, tag: 'STUDIO PICK', color: 'Grey', colors: ['#9b9b9b','#111111','#e7dfd2'], image: 'https://images.unsplash.com/photo-1578681994506-8f847a8f4e4b?auto=format&fit=crop&w=900&q=85', design: 'STAN STUDIO', desc: 'Your go-to layer for comfort and custom creativity.' },
  { id: 6, name: 'Made Different Tote', type: 'Accessories', price: 1400, tag: 'NEW', color: 'Natural', colors: ['#c9b99c','#111111'], image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85', design: 'MADE DIFFERENT', desc: 'A simple canvas tote made to carry your artwork.' },
  { id: 7, name: 'Weekend Oversized Tee', type: 'T-Shirts', price: 2400, tag: 'OVERSIZED FIT', color: 'Washed Black', colors: ['#252525','#d8d2c8','#6d756b'], image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=85', design: 'WEEKEND', desc: 'A relaxed oversized tee with extra room and a streetwear-inspired fit.' },
  { id: 8, name: 'Studio Graphic Tee', type: 'T-Shirts', price: 2200, tag: 'GRAPHIC DROP', color: 'White', colors: ['#f2f0eb','#111111','#9b9b9b'], image: 'https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=900&q=85', design: 'STUDIO', desc: 'A graphic-ready tee for your favourite artwork, phrase or idea.' },
  { id: 9, name: 'Classic Heavy Tee', type: 'T-Shirts', price: 2500, tag: 'PREMIUM COTTON', color: 'Natural', colors: ['#e9e3d8','#111111','#6d756b'], image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85', design: 'CLASSIC', desc: 'A heavier everyday tee with a clean shape and premium feel.' },
  { id: 10, name: 'Daily Zip Hoodie', type: 'Hoodies', price: 4800, tag: 'ZIP-UP', color: 'Grey', colors: ['#9b9b9b','#171717','#e9e3d8'], image: 'https://images.unsplash.com/photo-1578681994506-8f847a8f4e4b?auto=format&fit=crop&w=900&q=85&sat=-15', design: 'DAILY', desc: 'A versatile zip layer for your own logo, print or artwork.' },
  { id: 11, name: 'Heavyweight Hoodie', type: 'Hoodies', price: 5200, tag: 'HEAVYWEIGHT', color: 'Black', colors: ['#171717','#e9e3d8','#87918a'], image: 'https://images.unsplash.com/photo-1572495641004-28421ae2f7b5?auto=format&fit=crop&w=900&q=85', design: 'HEAVY', desc: 'A cosy heavyweight hoodie designed for custom prints and embroidery.' },
  { id: 12, name: 'Relaxed Crewneck', type: 'Sweatshirts', price: 3900, tag: 'RELAXED FIT', color: 'Cream', colors: ['#e9e3d8','#171717','#9b9b9b'], image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=85', design: 'RELAXED', desc: 'A simple crewneck sweatshirt that can be made personal with your design.' },
  { id: 13, name: 'Everyday Canvas Shopper', type: 'Accessories', price: 1600, tag: 'CANVAS CARRY', color: 'Natural', colors: ['#c9b99c','#111111'], image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85', design: 'EVERYDAY', desc: 'A practical canvas shopper for daily essentials and custom artwork.' },
  { id: 14, name: 'Mini Canvas Tote', type: 'Accessories', price: 1300, tag: 'SMALL FORMAT', color: 'Natural', colors: ['#c9b99c','#111111','#e9e3d8'], image: 'https://images.unsplash.com/photo-1597633125097-5a7a1d5b0a3f?auto=format&fit=crop&w=900&q=85', design: 'MINI', desc: 'A compact canvas tote with room for a simple custom design.' },
  { id: 15, name: 'Team & Event Tee Pack', type: 'Merchandise', price: 1800, tag: 'BULK ORDERS', color: 'White', colors: ['#f2f0eb','#111111','#6d756b'], image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85', design: 'TEAM', desc: 'Custom apparel for teams, events, clubs, and group celebrations. Bulk pricing available.' },
  { id: 16, name: 'Business Merch Starter', type: 'Merchandise', price: 2500, tag: 'BRAND MERCH', color: 'Black', colors: ['#171717','#e9e3d8','#6d756b'], image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85', design: 'BRAND', desc: 'A starting point for branded merchandise, staff apparel and promotional pieces.' },
];

const productFallback = (product) => {
  const isTote = product.type === 'Accessories';
  const isLayer = ['Hoodies','Sweatshirts'].includes(product.type);
  const garment = isTote ? '<path d="M34 45h132v145H34z" fill="#c7b89b" stroke="#82755e" stroke-width="3"/><path d="M61 52V28c0-28 78-28 78 0v24" fill="none" stroke="#82755e" stroke-width="9" stroke-linecap="round"/>' : isLayer ? '<path d="M65 40 40 52 12 95l32 20 19-24v106h76V91l19 24 32-20-28-43-25-12c-7 23-47 23-54 0z" fill="#737875" stroke="#454a47" stroke-width="3"/><path d="M88 42v38m24-38v38" stroke="#454a47" stroke-width="3"/>' : '<path d="M64 42 38 55 12 96l31 19 20-24v106h76V91l20 24 31-20-26-40-27-13c-8 24-47 24-55 0z" fill="#d8d2c8" stroke="#888177" stroke-width="3"/>';
  const label = (product.name || 'STAN CREATIVES').replace(/[&<>\"']/g, '');
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240"><rect width="200" height="240" fill="#e8e3da"/>' + garment + '<text x="100" y="218" font-family="Arial,sans-serif" font-size="10" font-weight="700" letter-spacing="1" text-anchor="middle" fill="#383630">' + label + '</text><text x="100" y="230" font-family="Arial,sans-serif" font-size="7" letter-spacing="2" text-anchor="middle" fill="#77736a">STAN CREATIVES</text></svg>';
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
};
const handleProductImageError = (product) => (e) => { e.currentTarget.onerror = null; e.currentTarget.src = productFallback(product); };

const money = (amount, currency) => currency === 'USD' ? `$${(amount / 130).toFixed(2)}` : `KSh ${amount.toLocaleString('en-KE')}`;

function App() {
  const [currency, setCurrency] = useState('KES');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(null);
  const [productQty, setProductQty] = useState(1);
  const [personalizeOpen, setPersonalizeOpen] = useState(false);
  const [personalText, setPersonalText] = useState('');
  const [personalPlacement, setPersonalPlacement] = useState('Front');
  const [personalArtwork, setPersonalArtwork] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [customFile, setCustomFile] = useState(null);
  const [customArtworkPreview, setCustomArtworkPreview] = useState('');
  const [customTextColor, setCustomTextColor] = useState('#111111');
  const [customQuoteName, setCustomQuoteName] = useState('');
  const [customQuoteEmail, setCustomQuoteEmail] = useState('');
  const [customQuotePhone, setCustomQuotePhone] = useState('');
  const [customProduct, setCustomProduct] = useState(products[0]);
  const [customColor, setCustomColor] = useState(products[0].colors[0]);
  const [customSize, setCustomSize] = useState('M');
  const [customText, setCustomText] = useState('YOUR DESIGN');
  const [customPlacement, setCustomPlacement] = useState('Front');
  const [customSubmitted, setCustomSubmitted] = useState(false);
  const railRef = useRef(null);
  const categories = ['All', 'T-Shirts', 'Hoodies', 'Sweatshirts', 'Accessories', 'Merchandise'];
  const filtered = useMemo(() => products.filter(p => (activeCategory === 'All' || p.type === activeCategory) && p.name.toLowerCase().includes(searchTerm.toLowerCase())), [activeCategory, searchTerm]);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const addToCart = (product, options = {}) => {
    const key = `${product.id}-${options.size || 'OS'}-${options.color || product.color}-${options.personalization?.text || ''}-${options.personalization?.placement || ''}`;
    setCart(prev => {
      const found = prev.find(x => x.key === key);
      if (found) return prev.map(x => x.key === key ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { key, ...product, qty: 1, size: options.size || 'OS', color: options.color || product.color, personalization: options.personalization || null }];
    });
    setSelected(null); setProductQty(1); setCartOpen(true);
  };
  const changeQty = (key, delta) => setCart(prev => prev.map(item => item.key === key ? { ...item, qty: item.qty + delta } : item).filter(item => item.qty > 0));
  const scrollRail = direction => railRef.current?.scrollBy({ left: direction * 430, behavior: 'smooth' });

  return <>
    <div className="announcement">CUSTOM MERCH, MADE PERSONAL. <span>YOUR IDEA STARTS HERE ↗</span></div>
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
      <section className="rail-hero">
        <div className="rail-hero-top"><p className="eyebrow"><span className="dot"/> STAN CREATIVES / CUSTOM MERCH STUDIO</p><div className="rail-hero-heading"><h1>Wear your<br/><em>own story.</em></h1><p>Find a piece. Make it yours.<br/>Custom tees, hoodies, totes and more.</p></div><div className="rail-hero-controls"><span>01 — COLLECTION RAIL</span><span>DRAG TO EXPLORE ↔</span></div></div>
        <div className="rail-showcase"><div className="rail-line"></div><div className="product-rail rail-products" ref={railRef}>{filtered.map(p=><article className="product-card rail-card" key={p.id}><div className="hanger"><span></span></div><button className="product-image rail-product-image" onClick={()=>{setSelected(p);setSelectedSize('M');setSelectedColor(p.colors[0]);setProductQty(1);setSizeGuideOpen(false);setPersonalizeOpen(false);setPersonalText('');setPersonalPlacement('Front');setPersonalArtwork(null)}}><img src={p.image} alt={p.name} onError={handleProductImageError(p)}/><span className="product-tag">{p.tag}</span><span className="quick-view">VIEW PIECE <ArrowUpRight size={14}/></span></button><div className="product-meta"><div><h3>{p.name}</h3><p>{p.type}</p></div><strong>{money(p.price,currency)}</strong></div><div className="product-colors">{p.colors.map((color,j)=><i key={j} style={{background:color}}/>)}</div></article>)}</div><button className="rail-arrow left" onClick={()=>scrollRail(-1)} aria-label="Previous pieces"><ChevronLeft/></button><button className="rail-arrow right" onClick={()=>scrollRail(1)} aria-label="Next pieces"><ChevronRight/></button></div>
        <div className="rail-hero-bottom"><button className="button button-dark" onClick={()=>setCustomOpen(true)}>CREATE YOUR OWN <Sparkles size={16}/></button><p>ONE PIECE OR A WHOLE COLLECTION.<br/>YOUR IDEA, OUR STUDIO.</p><div className="rail-pagination"><span>01</span><i></i><span>16</span></div></div>
      </section>
      <section className="marquee" aria-label="Brand message"><div>DESIGN IT YOUR WAY <span>✳</span> MAKE IT PERSONAL <span>✳</span> WEAR IT YOUR WAY <span>✳</span> DESIGN IT YOUR WAY <span>✳</span></div></section>

      <section className="product-category-rails" id="shop">
        <div className="category-rail-section">
          <div className="category-rail-heading"><div><p className="eyebrow">01 / THE TEE RAIL</p><h2>T-shirts <em>on the rail.</em></h2></div><p>Everyday pieces. Your design.<br/>Choose one and make it personal.</p></div>
          <div className="category-rail-track" id="tees-rail">{products.filter(p=>p.type==='T-Shirts').map(p=><article className="category-product" key={p.id}><div className="hanger"><span/></div><button className="category-product-image" onClick={()=>{setSelected(p);setSelectedSize('M');setSelectedColor(p.colors[0]);setProductQty(1);setSizeGuideOpen(false);setPersonalizeOpen(false);setPersonalText('');setPersonalPlacement('Front');setPersonalArtwork(null)}}><img src={p.image} alt={p.name} onError={handleProductImageError(p)}/><span className="quick-view">VIEW PIECE <ArrowUpRight size={14}/></span></button><div className="category-product-meta"><div><h3>{p.name}</h3><p>{p.tag}</p></div><strong>{money(p.price,currency)}</strong></div></article>)}</div>
          <div className="category-rail-controls"><span>TEE COLLECTION</span><div><button onClick={()=>document.getElementById('tees-rail')?.scrollBy({left:-360,behavior:'smooth'})} aria-label="Scroll tees left"><ChevronLeft/></button><button onClick={()=>document.getElementById('tees-rail')?.scrollBy({left:360,behavior:'smooth'})} aria-label="Scroll tees right"><ChevronRight/></button></div></div>
        </div>
        <div className="category-rail-section">
          <div className="category-rail-heading"><div><p className="eyebrow">02 / THE LAYER RAIL</p><h2>Layers <em>to live in.</em></h2></div><p>Soft, relaxed, and ready<br/>for a personal touch.</p></div>
          <div className="category-rail-track" id="layers-rail">{products.filter(p=>['Hoodies','Sweatshirts'].includes(p.type)).map(p=><article className="category-product" key={p.id}><div className="hanger"><span/></div><button className="category-product-image" onClick={()=>{setSelected(p);setSelectedSize('M');setSelectedColor(p.colors[0]);setProductQty(1);setSizeGuideOpen(false);setPersonalizeOpen(false);setPersonalText('');setPersonalPlacement('Front');setPersonalArtwork(null)}}><img src={p.image} alt={p.name} onError={handleProductImageError(p)}/><span className="quick-view">VIEW PIECE <ArrowUpRight size={14}/></span></button><div className="category-product-meta"><div><h3>{p.name}</h3><p>{p.tag}</p></div><strong>{money(p.price,currency)}</strong></div></article>)}</div>
          <div className="category-rail-controls"><span>HOODIES & SWEATSHIRTS</span><div><button onClick={()=>document.getElementById('layers-rail')?.scrollBy({left:-360,behavior:'smooth'})} aria-label="Scroll layers left"><ChevronLeft/></button><button onClick={()=>document.getElementById('layers-rail')?.scrollBy({left:360,behavior:'smooth'})} aria-label="Scroll layers right"><ChevronRight/></button></div></div>
        </div>
        <div className="category-rail-section">
          <div className="category-rail-heading"><div><p className="eyebrow">03 / THE TOTE RAIL</p><h2>Totes <em>for everywhere.</em></h2></div><p>Carry your ideas with you.<br/>A canvas for your creativity.</p></div>
          <div className="category-rail-track" id="totes-rail">{products.filter(p=>p.type==='Accessories').map(p=><article className="category-product" key={p.id}><div className="hanger"><span/></div><button className="category-product-image tote-product-image" onClick={()=>{setSelected(p);setSelectedSize('M');setSelectedColor(p.colors[0]);setProductQty(1);setSizeGuideOpen(false);setPersonalizeOpen(false);setPersonalText('');setPersonalPlacement('Front');setPersonalArtwork(null)}}><img src={p.image} alt={p.name} onError={handleProductImageError(p)}/><span className="quick-view">VIEW PIECE <ArrowUpRight size={14}/></span></button><div className="category-product-meta"><div><h3>{p.name}</h3><p>{p.tag}</p></div><strong>{money(p.price,currency)}</strong></div></article>)}</div>
          <div className="category-rail-controls"><span>TOTE COLLECTION</span><div><button onClick={()=>document.getElementById('totes-rail')?.scrollBy({left:-360,behavior:'smooth'})} aria-label="Scroll totes left"><ChevronLeft/></button><button onClick={()=>document.getElementById('totes-rail')?.scrollBy({left:360,behavior:'smooth'})} aria-label="Scroll totes right"><ChevronRight/></button></div></div>
        </div>
        <div className="category-rail-section">
          <div className="category-rail-heading"><div><p className="eyebrow">04 / THE MERCH RAIL</p><h2>For teams <em>& brands.</em></h2></div><p>Group orders, business merch<br/>and event-ready custom pieces.</p></div>
          <div className="category-rail-track" id="merch-rail">{products.filter(p=>p.type==='Merchandise').map(p=><article className="category-product" key={p.id}><div className="hanger"><span/></div><button className="category-product-image" onClick={()=>{setSelected(p);setSelectedSize('M');setSelectedColor(p.colors[0]);setProductQty(1);setSizeGuideOpen(false);setPersonalizeOpen(false);setPersonalText('');setPersonalPlacement('Front');setPersonalArtwork(null)}}><img src={p.image} alt={p.name} onError={handleProductImageError(p)}/><span className="quick-view">VIEW PIECE <ArrowUpRight size={14}/></span></button><div className="category-product-meta"><div><h3>{p.name}</h3><p>{p.tag}</p></div><strong>{money(p.price,currency)}</strong></div></article>)}</div>
          <div className="category-rail-controls"><span>TEAM, EVENT & BUSINESS</span><div><button onClick={()=>document.getElementById('merch-rail')?.scrollBy({left:-360,behavior:'smooth'})} aria-label="Scroll merch left"><ChevronLeft/></button><button onClick={()=>document.getElementById('merch-rail')?.scrollBy({left:360,behavior:'smooth'})} aria-label="Scroll merch right"><ChevronRight/></button></div></div>
        </div>
      </section>
      <section className="custom-banner" id="custom"><div className="custom-image"><img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85" alt="Custom printed apparel"/></div><div className="custom-copy"><p className="eyebrow">02 / MAKE IT YOURS</p><h2>Your idea.<br/><em>On a product.</em></h2><p>Choose what you want to customize, send us your artwork or inspiration, and our studio will help turn it into a finished piece.</p><ul><li><Check size={16}/> Artwork or inspiration welcome</li><li><Check size={16}/> Single pieces and small batches</li><li><Check size={16}/> Help from our design team</li></ul><button className="button button-dark" onClick={() => setCustomOpen(true)}>START YOUR DESIGN <ArrowUpRight size={16}/></button></div></section>

      <section className="section drop-section" id="drops"><div className="section-heading"><div><p className="eyebrow">03 / FIND YOUR FORMAT</p><h2>More than <em>just tees.</em></h2></div><span className="drop-note">EXPRESS YOURSELF.</span></div><div className="drop-grid"><div className="drop-tile tall"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1100&q=85" alt="Streetwear look"/><div><span>T-SHIRTS</span><h3>Your canvas.</h3></div></div><div className="drop-tile"><img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85" alt="Hoodie collection"/><div><span>HOODIES</span><h3>Comfort, customized.</h3></div></div><div className="drop-tile"><img src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85" alt="Tote bag"/><div><span>TOTE BAGS</span><h3>Take your design everywhere.</h3></div></div><div className="drop-tile"><img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85" alt="Custom group merchandise"/><div><span>TEAM & BUSINESS</span><h3>Make your mark together.</h3></div></div></div></section>

      <section className="story-section" id="story"><div className="story-mark">SC<span>✳</span></div><div><p className="eyebrow">04 / STAN CREATIVES</p><h2>Not just merch.<br/><em>Make it yours.</em></h2><p>Stan Creatives makes custom-designed clothing and merchandise for people, teams, businesses and creators. Start with one piece, or create a collection.</p><a href="#custom">LET'S MAKE SOMETHING <ArrowUpRight size={15}/></a></div><div className="story-side">CREATIVITY<br/>IS ALWAYS<br/>IN SEASON.</div></section>

      <section className="newsletter"><div><p className="eyebrow">STAY IN THE LOOP</p><h2>Fresh ideas<br/><em>on the way.</em></h2></div><form onSubmit={e => {e.preventDefault();alert('Thanks for your interest! Newsletter signup will be connected before launch.')}}><label htmlFor="email">GET UPDATES FROM THE STUDIO</label><div><input id="email" type="email" required placeholder="Your email address"/><button aria-label="Subscribe"><ArrowUpRight/></button></div><small>By signing up, you agree to receive occasional updates from Stan Creatives.</small></form></section>
    </main>
    <footer className="footer"><a href="#" className="wordmark">STAN<span>CREATIVES</span></a><p>CUSTOM MERCH. YOUR WAY.</p><div><a href="#shop">SHOP</a><a href="#custom">CUSTOM ORDERS</a><a href="#story">ABOUT</a><a href="mailto:hello@stancreatives.com">CONTACT</a></div><small>© 2026 STAN CREATIVES. MADE WITH INTENTION.</small></footer>

    {selected && (
      <div className="overlay" onClick={() => setSelected(null)}>
        <div className="modal product-modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setSelected(null)}><X /></button>
          <div className="product-modal-image-wrap"><img className="product-modal-image" src={selected.image} alt={selected.name} onError={handleProductImageError(selected)}/><span className="product-modal-tag">{selected.tag}</span><div className="product-modal-image-caption">STAN CREATIVES / PRODUCT NO. {String(selected.id).padStart(3,'0')}</div></div>
          <div className="modal-info product-modal-info">
            <p className="eyebrow">{selected.type.toUpperCase()} / MADE TO PERSONALIZE</p>
            <h2>{selected.name}</h2>
            <strong className="product-modal-price">{money(selected.price, currency)}</strong>
            <p className="product-modal-description">{selected.desc}</p>
            <div className="product-detail-pills"><span>DESIGNED FOR EVERYDAY</span><span>PERSONALIZE IT</span></div>
            <div className="product-option-head"><label>SIZE</label><button type="button" className="size-guide-link" onClick={()=>setSizeGuideOpen(!sizeGuideOpen)}>SIZE GUIDE +</button></div>
            <div className="size-options">{['S', 'M', 'L', 'XL', 'XXL'].map(size=><button key={size} className={'size-option '+(selectedSize===size?'chosen':'')} onClick={()=>setSelectedSize(size)}>{size}</button>)}</div>
            {sizeGuideOpen && <div className="size-guide-panel"><strong>SIZE GUIDE (APPROX.)</strong><table><thead><tr><th>SIZE</th><th>CHEST</th><th>LENGTH</th></tr></thead><tbody>{[['S','36–38','26'],['M','38–40','27'],['L','40–42','28'],['XL','42–44','29'],['XXL','44–46','30']].map(row=><tr key={row[0]}>{row.map(cell=><td key={cell}>{cell}</td>)}</tr>)}</tbody></table><small>Measurements are approximate and may vary by garment.</small></div>}
            <label className="product-color-label">COLOUR <span>{selectedColor || selected.color}</span></label>
            <div className="swatches product-modal-swatches">{selected.colors.map(color=><button key={color} style={{background:color}} aria-label={'Choose '+color} onClick={()=>setSelectedColor(color)} className={selectedColor===color?'chosen':''}/>)}</div>
            <div className="product-quantity"><label>QUANTITY</label><div><button onClick={()=>setProductQty(Math.max(1,productQty-1))} aria-label="Decrease quantity">−</button><span>{productQty}</span><button onClick={()=>setProductQty(productQty+1)} aria-label="Increase quantity">+</button></div></div>
            <button className="button button-dark full product-add-button" onClick={()=>{addToCart(selected,{size:selectedSize,color:selectedColor||selected.color,personalization:personalizeOpen?{text:personalText,placement:personalPlacement,artworkName:personalArtwork?.name||''}:null});for(let i=1;i<productQty;i++)addToCart(selected,{size:selectedSize,color:selectedColor||selected.color,personalization:personalizeOpen?{text:personalText,placement:personalPlacement,artworkName:personalArtwork?.name||''}:null});}}>ADD TO BAG — {money(selected.price*productQty,currency)} <ShoppingBag size={16}/></button>
            <div className="product-personalize">
              <button type="button" className="personalize-toggle" onClick={()=>setPersonalizeOpen(!personalizeOpen)}><span>ADD PERSONALIZATION</span><span>{personalizeOpen?'−':'+'}</span></button>
              {personalizeOpen && <div className="personalize-fields">
                <label>DESIGN TEXT<input value={personalText} maxLength={30} onChange={e=>setPersonalText(e.target.value)} placeholder="e.g. Your name or short phrase"/></label>
                <label>PRINT PLACEMENT<select value={personalPlacement} onChange={e=>setPersonalPlacement(e.target.value)}><option>Front</option><option>Back</option><option>Left chest</option><option>Full front</option></select></label>
                <label>ARTWORK (OPTIONAL)<div className="personalize-upload"><Upload size={16}/><span>{personalArtwork?personalArtwork.name:'Upload artwork'}</span><input type="file" accept=".png,.jpg,.jpeg,.svg,.pdf" onChange={e=>setPersonalArtwork(e.target.files?.[0]||null)}/></div></label>
                <small>Personalization details will be saved with your bag item. Artwork is not uploaded to the server yet.</small>
              </div>}
            </div>
            <p className="product-modal-footnote">Need a larger order or a special design? <button onClick={()=>{setCustomProduct(selected);setCustomColor(selectedColor||selected.color);setCustomOpen(true);setSelected(null)}}>Request a custom quote ↗</button></p>
          </div>
        </div>
      </div>
    )}

    {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><h2>YOUR BAG <span>({cartCount})</span></h2><button className="close-btn" onClick={() => setCartOpen(false)}><X/></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={32}/><h3>Your bag is waiting.</h3><p>Find something that feels like you.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>KEEP SHOPPING</button></div> : <><div className="cart-items">{cart.map(item=><div className="cart-item" key={item.key}><img src={item.image} alt={item.name} onError={handleProductImageError(item)}/><div><h3>{item.name}</h3><p>{item.color} · {item.size}</p>{item.personalization && <small className="cart-personalization">Custom: {item.personalization.text || 'Artwork'} · {item.personalization.placement}{item.personalization.artworkName ? ' · '+item.personalization.artworkName : ''}</small>}<strong>{money(item.price,currency)}</strong><div className="qty"><button onClick={()=>changeQty(item.key,-1)}>−</button><span>{item.qty}</span><button onClick={()=>changeQty(item.key,1)}>+</button></div></div></div>)}</div><div className="cart-total"><span>SUBTOTAL</span><strong>{money(cartTotal,currency)}</strong><small>Shipping and taxes are calculated at checkout.</small><button className="button button-dark full" onClick={()=>alert('Checkout is not connected yet. We will add secure payments before launch.')}>CONTINUE TO CHECKOUT <ArrowUpRight size={16}/></button></div></>}</aside></div>}

    {customOpen && <div className="overlay" onClick={() => setCustomOpen(false)}><div className="modal custom-modal customizer-modal" onClick={e => e.stopPropagation()}><button className="close-btn" onClick={() => setCustomOpen(false)}><X/></button>{customSubmitted ? <div className="custom-success"><div className="success-icon"><Check size={26}/></div><p className="eyebrow">REQUEST PREVIEW COMPLETE</p><h2>We have your<br/><em>idea in mind.</em></h2><p>This is a prototype. Your request has not been sent yet, but your selected design details are ready for our future ordering system.</p><button className="button button-dark" onClick={()=>{setCustomSubmitted(false);setCustomOpen(false)}}>DONE</button></div> : <><p className="eyebrow">STAN CREATIVES / CUSTOM STUDIO</p><h2>Make it<br/><em>your own.</em></h2><p className="form-intro">Build a quick preview of your custom piece. Choose a product, colour, size and design details.</p><div className="customizer-layout"><div className="custom-preview"><img src={customProduct.image} alt={customProduct.name} onError={handleProductImageError(customProduct)}/><div className={'preview-design placement-'+customPlacement.toLowerCase().replace(/[^a-z]+/g,'-')} style={{color:customTextColor}}>{customText && <span>{customText}</span>}{customArtworkPreview && <img className="preview-artwork" src={customArtworkPreview} alt="Uploaded design preview"/>}</div><span className="preview-label">{customPlacement.toUpperCase()} PRINT · LIVE PREVIEW</span></div><form onSubmit={e=>{e.preventDefault();setCustomSubmitted(true)}}><label>PRODUCT<select value={customProduct.id} onChange={e=>{const next=products.find(p=>p.id===Number(e.target.value));setCustomProduct(next);setCustomColor(next.colors[0]);}}>{products.map(p=><option value={p.id} key={p.id}>{p.name}</option>)}</select></label><label>COLOUR</label><div className="swatches custom-swatches">{customProduct.colors.map(color=><button type="button" key={color} style={{background:color}} className={customColor===color?'chosen':''} onClick={()=>setCustomColor(color)} aria-label={'Select '+color}/>)}</div><label>SIZE</label><div className="size-options">{['S','M','L','XL','XXL'].map(size=><button type="button" key={size} className={'size-option '+(customSize===size?'chosen':'')} onClick={()=>setCustomSize(size)}>{size}</button>)}</div><label>DESIGN TEXT<input value={customText} maxLength={24} onChange={e=>setCustomText(e.target.value)} placeholder="Type a short phrase"/></label><label>TEXT COLOUR<select value={customTextColor} onChange={e=>setCustomTextColor(e.target.value)}><option value="#111111">Black</option><option value="#ffffff">White</option><option value="#c83d2c">Red</option><option value="#2c569a">Blue</option><option value="#6d756b">Sage</option></select></label><label>PRINT PLACEMENT<select value={customPlacement} onChange={e=>setCustomPlacement(e.target.value)}><option>Front</option><option>Back</option><option>Left chest</option><option>Full front</option></select></label><label>ARTWORK (OPTIONAL)<div className="upload-box"><Upload size={19}/><span>{customFile ? customFile.name : 'UPLOAD YOUR ARTWORK'}</span><small>PNG, JPG or SVG for live preview · PDF can be included with quote</small><input type="file" accept=".png,.jpg,.jpeg,.svg,.pdf" onChange={e=>{const f=e.target.files?.[0]||null;setCustomFile(f);if(f && /image\/(png|jpeg|svg\+xml)/.test(f.type)){const reader=new FileReader();reader.onload=()=>setCustomArtworkPreview(String(reader.result||''));reader.readAsDataURL(f)}else setCustomArtworkPreview('')}}/></div>{customFile && <button type="button" className="clear-artwork" onClick={()=>{setCustomFile(null);setCustomArtworkPreview('')}}>REMOVE ARTWORK ×</button>}</label><div className="quote-contact-fields"><p className="eyebrow">QUOTE CONTACT DETAILS</p><label>YOUR NAME<input required value={customQuoteName} onChange={e=>setCustomQuoteName(e.target.value)} placeholder="Name"/></label><label>EMAIL<input required type="email" value={customQuoteEmail} onChange={e=>setCustomQuoteEmail(e.target.value)} placeholder="Email address"/></label><label>PHONE / WHATSAPP<input value={customQuotePhone} onChange={e=>setCustomQuotePhone(e.target.value)} placeholder="Optional"/></label></div><button className="button button-dark full">REQUEST CUSTOM QUOTE <ArrowUpRight size={16}/></button></form></div></>}</div></div>}
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
