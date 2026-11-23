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
  { id: 6, name: 'Made Different Tote', type: 'Accessories', price: 1400, tag: 'NEW', color: 'Natural', colors: ['#c9b99c','#111111'], image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85', design: 'MADE DIFFERENT', desc: 'A simple canvas tote made to carry your artwork.' },
];
const money = (amount, currency) => currency === 'USD' ? `$${(amount / 130).toFixed(2)}` : `KSh ${amount.toLocaleString('en-KE')}`;

function App() {
  const [currency, setCurrency] = useState('KES');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [customFile, setCustomFile] = useState(null);
  const [customProduct, setCustomProduct] = useState(products[0]);
  const [customColor, setCustomColor] = useState(products[0].colors[0]);
  const [customSize, setCustomSize] = useState('M');
  const [customText, setCustomText] = useState('YOUR DESIGN');
  const [customPlacement, setCustomPlacement] = useState('Front');
  const [customSubmitted, setCustomSubmitted] = useState(false);
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
        <div className="rail-showcase"><div className="rail-line"></div><div className="product-rail rail-products" ref={railRef}>{filtered.map(p=><article className="product-card rail-card" key={p.id}><div className="hanger"><span></span></div><button className="product-image rail-product-image" onClick={()=>{setSelected(p);setSelectedSize('M');setSelectedColor(p.color)}}><img src={p.image} alt={p.name}/><span className="product-tag">{p.tag}</span><span className="quick-view">VIEW PIECE <ArrowUpRight size={14}/></span></button><div className="product-meta"><div><h3>{p.name}</h3><p>{p.type}</p></div><strong>{money(p.price,currency)}</strong></div><div className="product-colors">{p.colors.map((color,j)=><i key={j} style={{background:color}}/>)}</div></article>)}</div><button className="rail-arrow left" onClick={()=>scrollRail(-1)} aria-label="Previous pieces"><ChevronLeft/></button><button className="rail-arrow right" onClick={()=>scrollRail(1)} aria-label="Next pieces"><ChevronRight/></button></div>
        <div className="rail-hero-bottom"><button className="button button-dark" onClick={()=>setCustomOpen(true)}>CREATE YOUR OWN <Sparkles size={16}/></button><p>ONE PIECE OR A WHOLE COLLECTION.<br/>YOUR IDEA, OUR STUDIO.</p><div className="rail-pagination"><span>01</span><i></i><span>06</span></div></div>
      </section>
      <section className="marquee" aria-label="Brand message"><div>DESIGN IT YOUR WAY <span>✳</span> MAKE IT PERSONAL <span>✳</span> WEAR IT YOUR WAY <span>✳</span> DESIGN IT YOUR WAY <span>✳</span></div></section>

      <section className="product-category-rails" id="shop">
        <div className="category-rail-section">
          <div className="category-rail-heading"><div><p className="eyebrow">01 / THE TEE RAIL</p><h2>T-shirts <em>on the rail.</em></h2></div><p>Everyday pieces. Your design.<br/>Choose one and make it personal.</p></div>
          <div className="category-rail-track" id="tees-rail">{products.filter(p=>p.type==='T-Shirts').map(p=><article className="category-product" key={p.id}><div className="hanger"><span/></div><button className="category-product-image" onClick={()=>{setSelected(p);setSelectedSize('M');setSelectedColor(p.color)}}><img src={p.image} alt={p.name}/><span className="quick-view">VIEW PIECE <ArrowUpRight size={14}/></span></button><div className="category-product-meta"><div><h3>{p.name}</h3><p>{p.tag}</p></div><strong>{money(p.price,currency)}</strong></div></article>)}</div>
          <div className="category-rail-controls"><span>TEE COLLECTION</span><div><button onClick={()=>document.getElementById('tees-rail')?.scrollBy({left:-360,behavior:'smooth'})} aria-label="Scroll tees left"><ChevronLeft/></button><button onClick={()=>document.getElementById('tees-rail')?.scrollBy({left:360,behavior:'smooth'})} aria-label="Scroll tees right"><ChevronRight/></button></div></div>
        </div>
        <div className="category-rail-section">
          <div className="category-rail-heading"><div><p className="eyebrow">02 / THE LAYER RAIL</p><h2>Layers <em>to live in.</em></h2></div><p>Soft, relaxed, and ready<br/>for a personal touch.</p></div>
          <div className="category-rail-track" id="layers-rail">{products.filter(p=>['Hoodies','Sweatshirts'].includes(p.type)).map(p=><article className="category-product" key={p.id}><div className="hanger"><span/></div><button className="category-product-image" onClick={()=>{setSelected(p);setSelectedSize('M');setSelectedColor(p.color)}}><img src={p.image} alt={p.name}/><span className="quick-view">VIEW PIECE <ArrowUpRight size={14}/></span></button><div className="category-product-meta"><div><h3>{p.name}</h3><p>{p.tag}</p></div><strong>{money(p.price,currency)}</strong></div></article>)}</div>
          <div className="category-rail-controls"><span>HOODIES & SWEATSHIRTS</span><div><button onClick={()=>document.getElementById('layers-rail')?.scrollBy({left:-360,behavior:'smooth'})} aria-label="Scroll layers left"><ChevronLeft/></button><button onClick={()=>document.getElementById('layers-rail')?.scrollBy({left:360,behavior:'smooth'})} aria-label="Scroll layers right"><ChevronRight/></button></div></div>
        </div>
        <div className="category-rail-section">
          <div className="category-rail-heading"><div><p className="eyebrow">03 / THE TOTE RAIL</p><h2>Totes <em>for everywhere.</em></h2></div><p>Carry your ideas with you.<br/>A canvas for your creativity.</p></div>
          <div className="category-rail-track" id="totes-rail">{products.filter(p=>p.type==='Accessories').map(p=><article className="category-product" key={p.id}><div className="hanger"><span/></div><button className="category-product-image tote-product-image" onClick={()=>{setSelected(p);setSelectedSize('M');setSelectedColor(p.color)}}><img src={p.image} alt={p.name}/><span className="quick-view">VIEW PIECE <ArrowUpRight size={14}/></span></button><div className="category-product-meta"><div><h3>{p.name}</h3><p>{p.tag}</p></div><strong>{money(p.price,currency)}</strong></div></article>)}</div>
          <div className="category-rail-controls"><span>TOTE COLLECTION</span><div><button onClick={()=>document.getElementById('totes-rail')?.scrollBy({left:-360,behavior:'smooth'})} aria-label="Scroll totes left"><ChevronLeft/></button><button onClick={()=>document.getElementById('totes-rail')?.scrollBy({left:360,behavior:'smooth'})} aria-label="Scroll totes right"><ChevronRight/></button></div></div>
        </div>
      </section>
      <section className="custom-banner" id="custom"><div className="custom-image"><img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85" alt="Custom printed apparel"/></div><div className="custom-copy"><p className="eyebrow">02 / MAKE IT YOURS</p><h2>Your idea.<br/><em>On a product.</em></h2><p>Choose what you want to customize, send us your artwork or inspiration, and our studio will help turn it into a finished piece.</p><ul><li><Check size={16}/> Artwork or inspiration welcome</li><li><Check size={16}/> Single pieces and small batches</li><li><Check size={16}/> Help from our design team</li></ul><button className="button button-dark" onClick={() => setCustomOpen(true)}>START YOUR DESIGN <ArrowUpRight size={16}/></button></div></section>

      <section className="section drop-section" id="drops"><div className="section-heading"><div><p className="eyebrow">03 / FIND YOUR FORMAT</p><h2>More than <em>just tees.</em></h2></div><span className="drop-note">EXPRESS YOURSELF.</span></div><div className="drop-grid"><div className="drop-tile tall"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1100&q=85" alt="Streetwear look"/><div><span>T-SHIRTS</span><h3>Your canvas.</h3></div></div><div className="drop-tile"><img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85" alt="Hoodie collection"/><div><span>HOODIES</span><h3>Comfort, customized.</h3></div></div><div className="drop-tile"><img src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85" alt="Tote bag"/><div><span>TOTE BAGS</span><h3>Take your design everywhere.</h3></div></div></div></section>

      <section className="story-section" id="story"><div className="story-mark">SC<span>✳</span></div><div><p className="eyebrow">04 / STAN CREATIVES</p><h2>Not just merch.<br/><em>Make it yours.</em></h2><p>Stan Creatives makes custom-designed clothing and merchandise for people, teams, businesses and creators. Start with one piece, or create a collection.</p><a href="#custom">LET'S MAKE SOMETHING <ArrowUpRight size={15}/></a></div><div className="story-side">CREATIVITY<br/>IS ALWAYS<br/>IN SEASON.</div></section>

      <section className="newsletter"><div><p className="eyebrow">STAY IN THE LOOP</p><h2>Fresh ideas<br/><em>on the way.</em></h2></div><form onSubmit={e => {e.preventDefault();alert('Thanks for your interest! Newsletter signup will be connected before launch.')}}><label htmlFor="email">GET UPDATES FROM THE STUDIO</label><div><input id="email" type="email" required placeholder="Your email address"/><button aria-label="Subscribe"><ArrowUpRight/></button></div><small>By signing up, you agree to receive occasional updates from Stan Creatives.</small></form></section>
    </main>
    <footer className="footer"><a href="#" className="wordmark">STAN<span>CREATIVES</span></a><p>CUSTOM MERCH. YOUR WAY.</p><div><a href="#shop">SHOP</a><a href="#custom">CUSTOM ORDERS</a><a href="#story">ABOUT</a><a href="mailto:hello@stancreatives.com">CONTACT</a></div><small>© 2026 STAN CREATIVES. MADE WITH INTENTION.</small></footer>

    {selected && (
      <div className="overlay" onClick={() => setSelected(null)}>
        <div className="modal product-modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setSelected(null)}><X /></button>
          <img src={selected.image} alt={selected.name} />
          <div className="modal-info">
            <p className="eyebrow">{selected.tag}</p>
            <h2>{selected.name}</h2>
            <strong>{money(selected.price, currency)}</strong>
            <p>{selected.desc}</p>
            <label>SIZE</label>
            <div className="size-options">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button key={size} className={'size-option '+(selectedSize===size?'chosen':'')} onClick={() => setSelectedSize(size)}>{size}</button>
              ))}
            </div>
            <label>COLOUR</label>
            <div className="swatches">
              {selected.colors.map((color) => (
                <button key={color} style={{ background: color }} aria-label="Choose colour" onClick={() => setSelectedColor(color)} className={selectedColor===color?'chosen':''} />
              ))}
            </div>
            <button className="button button-dark full" onClick={() => { addToCart(selected, { size: selectedSize, color: selectedColor || selected.color }); }}>
              ADD TO BAG — {money(selected.price, currency)} <ShoppingBag size={16} />
            </button>
          </div>
        </div>
      </div>
    )}

    {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><h2>YOUR BAG <span>({cartCount})</span></h2><button className="close-btn" onClick={() => setCartOpen(false)}><X/></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={32}/><h3>Your bag is waiting.</h3><p>Find something that feels like you.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>KEEP SHOPPING</button></div> : <><div className="cart-items">{cart.map(item=><div className="cart-item" key={item.key}><img src={item.image} alt={item.name}/><div><h3>{item.name}</h3><p>{item.color} · {item.size}</p><strong>{money(item.price,currency)}</strong><div className="qty"><button onClick={()=>changeQty(item.key,-1)}>−</button><span>{item.qty}</span><button onClick={()=>changeQty(item.key,1)}>+</button></div></div></div>)}</div><div className="cart-total"><span>SUBTOTAL</span><strong>{money(cartTotal,currency)}</strong><small>Shipping and taxes are calculated at checkout.</small><button className="button button-dark full" onClick={()=>alert('Checkout is not connected yet. We will add secure payments before launch.')}>CONTINUE TO CHECKOUT <ArrowUpRight size={16}/></button></div></>}</aside></div>}

    {customOpen && <div className="overlay" onClick={() => setCustomOpen(false)}><div className="modal custom-modal customizer-modal" onClick={e => e.stopPropagation()}><button className="close-btn" onClick={() => setCustomOpen(false)}><X/></button>{customSubmitted ? <div className="custom-success"><div className="success-icon"><Check size={26}/></div><p className="eyebrow">REQUEST PREVIEW COMPLETE</p><h2>We have your<br/><em>idea in mind.</em></h2><p>This is a prototype. Your request has not been sent yet, but your selected design details are ready for our future ordering system.</p><button className="button button-dark" onClick={()=>{setCustomSubmitted(false);setCustomOpen(false)}}>DONE</button></div> : <><p className="eyebrow">STAN CREATIVES / CUSTOM STUDIO</p><h2>Make it<br/><em>your own.</em></h2><p className="form-intro">Build a quick preview of your custom piece. Choose a product, colour, size and design details.</p><div className="customizer-layout"><div className="custom-preview"><img src={customProduct.image} alt={customProduct.name}/><div className="preview-design" style={{color:customColor==='#111111'?'#f4f1eb':'#171715'}}>{customText || 'YOUR DESIGN'}</div><span className="preview-label">{customPlacement.toUpperCase()} PRINT · PREVIEW</span></div><form onSubmit={e=>{e.preventDefault();setCustomSubmitted(true)}}><label>PRODUCT<select value={customProduct.id} onChange={e=>{const next=products.find(p=>p.id===Number(e.target.value));setCustomProduct(next);setCustomColor(next.colors[0]);}}>{products.map(p=><option value={p.id} key={p.id}>{p.name}</option>)}</select></label><label>COLOUR</label><div className="swatches custom-swatches">{customProduct.colors.map(color=><button type="button" key={color} style={{background:color}} className={customColor===color?'chosen':''} onClick={()=>setCustomColor(color)} aria-label={'Select '+color}/>)}</div><label>SIZE</label><div className="size-options">{['S','M','L','XL','XXL'].map(size=><button type="button" key={size} className={'size-option '+(customSize===size?'chosen':'')} onClick={()=>setCustomSize(size)}>{size}</button>)}</div><label>DESIGN TEXT<input value={customText} maxLength={24} onChange={e=>setCustomText(e.target.value)} placeholder="Type a short phrase"/></label><label>PRINT PLACEMENT<select value={customPlacement} onChange={e=>setCustomPlacement(e.target.value)}><option>Front</option><option>Back</option><option>Left chest</option><option>Full front</option></select></label><label>ARTWORK (OPTIONAL)<div className="upload-box"><Upload size={19}/><span>{customFile ? customFile.name : 'UPLOAD YOUR ARTWORK'}</span><small>PNG, JPG, SVG or PDF</small><input type="file" accept=".png,.jpg,.jpeg,.svg,.pdf" onChange={e=>setCustomFile(e.target.files?.[0]||null)}/></div></label><button className="button button-dark full">SAVE DESIGN PREVIEW <ArrowUpRight size={16}/></button></form></div></>}</div></div>}
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
