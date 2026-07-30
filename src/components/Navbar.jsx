import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Phone, Mail, Leaf, Home, Wrench, Users, Sprout, PhoneCall, MessageCircle, ChevronRight } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, cartCount, openCart, openQuoteModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'services', label: 'Services', icon: <Wrench size={20} /> },
    { id: 'about', label: 'About Us', icon: <Users size={20} /> },
    { id: 'shop', label: 'Shop Plants & Nursery', icon: <Sprout size={20} /> },
    { id: 'contact', label: 'Contact', icon: <PhoneCall size={20} /> }
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
        {/* Mobile Toggle Button (Far Left on Mobile) */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} color="#0D4733" /> : <Menu size={24} color="#0D4733" />}
        </button>

        {/* Brand Logo - Centered on Mobile */}
        <div 
          className="brand-logo" 
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <img 
            src="/images/logo_header.png" 
            alt="Grow Green Landscaping & Nursery Logo" 
            className="brand-logo-img"
            style={{ height: '64px', width: 'auto', display: 'block', objectFit: 'contain' }} 
          />
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <span className="brand-title" style={{ color: '#0D4733', fontSize: '1.25rem', fontWeight: 800, lineHeight: 1 }}>GROW GREEN</span>
            <span className="brand-subtitle" style={{ color: '#8CB974', fontSize: '0.62rem', letterSpacing: '1.2px', textTransform: 'uppercase', fontWeight: 700 }}>Landscaping & Nursery</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
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

        {/* Navigation Actions (Far Right) */}
        <div className="nav-actions" style={{ gap: '10px' }}>
          <button 
            className="btn cart-btn" 
            onClick={openCart} 
            style={{ background: '#F4F7F4', color: '#0D4733', padding: '8px 14px', position: 'relative' }}
            aria-label="View Shopping Cart"
          >
            <ShoppingBag size={18} color="#0D4733" />
            <span className="cart-text" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Cart</span>
            {cartCount > 0 && (
              <span className="cart-badge" style={{
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
        </div>
      </div>

      {/* 3. Spacious Mobile Overlay Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '76px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          zIndex: 999,
          overflowY: 'auto',
          padding: '24px 20px 48px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          animation: 'fadeIn 0.25s ease-out'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #EAEFEA' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8CB974' }}>
                Main Navigation
              </span>
              <span style={{ fontSize: '0.78rem', color: '#4A5D54' }}>
                Grow Green SA
              </span>
            </div>

            {/* Spacious Navigation List */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        background: isActive ? '#0D4733' : '#F8FAF8',
                        color: isActive ? '#FFFFFF' : '#0D4733',
                        border: '1px solid',
                        borderColor: isActive ? '#0D4733' : '#EAEFEA',
                        padding: '16px 20px',
                        borderRadius: '16px',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: isActive ? '0 8px 20px rgba(13,71,51,0.2)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <span style={{ color: isActive ? '#8CB974' : '#0D4733' }}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight size={18} color={isActive ? '#8CB974' : '#4A5D54'} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Actions & Contact Section in Mobile Menu */}
          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #EAEFEA', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => {
                setMobileMenuOpen(false);
                openQuoteModal();
              }}
              style={{ width: '100%', padding: '15px', fontSize: '1rem', fontWeight: 700, borderRadius: '16px' }}
            >
              Get a Free Project Quote
            </button>

            <a 
              href="https://wa.me/27615046752?text=Hello%20Cullen!%20I'd%20like%20to%20inquire%20about%20Grow%20Green%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ width: '100%', background: '#25D366', color: '#FFFFFF', padding: '14px', fontSize: '0.98rem', fontWeight: 700, borderRadius: '16px' }}
            >
              <MessageCircle size={20} color="#FFFFFF" fill="#FFFFFF" />
              <span>WhatsApp Us (+27 61 504 6752)</span>
            </a>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '6px' }}>
              <a 
                href="tel:+27615046752"
                style={{ background: '#F4F7F4', color: '#0D4733', padding: '12px', borderRadius: '12px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Phone size={14} color="#0D4733" />
                <span>Call Us</span>
              </a>
              <a 
                href="mailto:cullen@growgreensa.com"
                style={{ background: '#F4F7F4', color: '#0D4733', padding: '12px', borderRadius: '12px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Mail size={14} color="#0D4733" />
                <span>Email Us</span>
              </a>
            </div>

            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.78rem', color: '#4A5D54', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Leaf size={14} color="#8CB974" />
              <span>South Africa Premium Nursery & Landscaping</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
