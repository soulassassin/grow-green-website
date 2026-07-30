import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Phone, Mail, Leaf } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, cartCount, openCart, openQuoteModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'shop', label: 'Shop Plants' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-header" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
      {/* 1. Integrated Sticky Top Contact Bar */}
      <div style={{ background: '#0D4733', color: '#8CB974', fontSize: '0.8rem', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={13} color="#8CB974" />
              <a href="tel:+27615046752" style={{ color: '#FFFFFF', fontWeight: 500 }}>+27 61 504 6752</a>
            </span>
            <span className="top-bar-email" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={13} color="#8CB974" />
              <a href="mailto:cullen@growgreensa.com" style={{ color: '#FFFFFF', fontWeight: 500 }}>cullen@growgreensa.com</a>
            </span>
          </div>
          <div className="top-bar-tagline" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFFFFF', fontWeight: 500 }}>
            <Leaf size={13} color="#8CB974" />
            <span>South Africa Premium Nursery & Landscaping</span>
          </div>
        </div>
      </div>

      {/* 2. Sticky Main Glass Navbar */}
      <div className="container navbar-container">
        {/* Brand Logo - Uses exact attached sprout & root emblem */}
        <div 
          className="brand-logo" 
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <img 
            src="/images/logo_header.png" 
            alt="Grow Green Landscaping & Nursery Logo" 
            style={{ height: '68px', width: 'auto', display: 'block', objectFit: 'contain' }} 
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#0D4733', fontSize: '1.25rem', fontWeight: 800, lineHeight: 1 }}>GROW GREEN</span>
            <span style={{ color: '#8CB974', fontSize: '0.62rem', letterSpacing: '1.2px', textTransform: 'uppercase', fontWeight: 700 }}>Landscaping & Nursery</span>
          </div>
        </div>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                style={{ background: 'none', border: 'none' }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="nav-actions" style={{ gap: '10px' }}>
          <button 
            className="btn" 
            onClick={openCart} 
            style={{ background: '#F4F7F4', color: '#0D4733', padding: '8px 14px', position: 'relative' }}
            aria-label="View Shopping Cart"
          >
            <ShoppingBag size={18} color="#0D4733" />
            <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Cart</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#8CB974',
                color: '#0D4733',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                fontSize: '0.72rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          <button className="btn btn-primary desktop-quote-btn" onClick={openQuoteModal} style={{ padding: '8px 20px', fontSize: '0.88rem' }}>
            Get a Quote
          </button>

          {/* Mobile Toggle */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none', background: '#F4F7F4', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} color="#0D4733" /> : <Menu size={22} color="#0D4733" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: '#FFFFFF',
          padding: '20px 24px 28px 24px',
          borderTop: '1px solid #E0E7E2',
          boxShadow: '0 16px 32px rgba(0,0,0,0.12)',
          animation: 'slideUp 0.25s ease-out'
        }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: activePage === item.id ? '#F4F7F4' : 'none',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '12px',
                    fontSize: '1.05rem',
                    fontWeight: activePage === item.id ? 700 : 500,
                    color: activePage === item.id ? '#0D4733' : '#1B2A23',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{item.label}</span>
                  {activePage === item.id && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8CB974' }}></span>}
                </button>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '16px', borderTop: '1px solid #F4F7F4' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => {
                setMobileMenuOpen(false);
                openQuoteModal();
              }}
              style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
            >
              Get a Free Quote
            </button>
            <a 
              href="https://wa.me/27615046752?text=Hello%20Cullen!%20I'd%20like%20to%20inquire%20about%20Grow%20Green%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ width: '100%', background: '#25D366', color: '#FFFFFF', padding: '12px', fontSize: '0.95rem' }}
            >
              WhatsApp Us (+27 61 504 6752)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
