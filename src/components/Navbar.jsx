import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Leaf, 
  Home, 
  Wrench, 
  Users, 
  Sprout, 
  PhoneCall, 
  MessageCircle, 
  ChevronRight, 
  BookOpen 
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, cartCount, openCart, openQuoteModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={18} /> },
    { id: 'services', label: 'Services', icon: <Wrench size={18} /> },
    { id: 'about', label: 'About Us', icon: <Users size={18} /> },
    { id: 'shop', label: 'Shop Plants & Nursery', icon: <Sprout size={18} /> },
    { id: 'blog', label: 'Blog & Guides', icon: <BookOpen size={18} /> },
    { id: 'contact', label: 'Contact', icon: <PhoneCall size={18} /> }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-header">
      {/* 1. Integrated Sticky Top Contact Bar */}
      <div className="navbar-top-bar">
        <div className="navbar-top-bar-container">
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={13} color="#8CB974" />
              <a href="tel:+27615046752" style={{ color: '#FFFFFF', fontWeight: 500 }}>+27 61 504 6752</a>
            </span>
            <span className="top-bar-email" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={13} color="#8CB974" />
              <a href="mailto:cullen@growgreensa.com" style={{ color: '#FFFFFF', fontWeight: 500 }}>cullen@growgreensa.com</a>
            </span>
          </div>
          <div className="top-bar-tagline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#FFFFFF', fontWeight: 500 }}>
            <Leaf size={13} color="#8CB974" />
            <span>South Africa Premium Nursery & Landscaping</span>
          </div>
        </div>
      </div>

      {/* 2. Sticky Main Glass Navbar */}
      <div className="navbar-container">
        {/* Brand Logo (Left) */}
        <div 
          className="brand-logo" 
          onClick={() => handleNavClick('home')}
          aria-label="Grow Green Home"
        >
          <img 
            src="/images/logo_header.png" 
            alt="Grow Green Landscaping & Nursery" 
            className="brand-logo-img"
          />
          <div className="brand-text-group">
            <span className="brand-title">GROW GREEN</span>
            <span className="brand-subtitle">Landscaping & Nursery</span>
          </div>
        </div>

        {/* Desktop Navigation Links (Center) */}
        <ul className="nav-links">
          {navItems.map((item) => {
            const isActive = activePage === item.id || (item.id === 'blog' && activePage === 'blog-post');
            return (
              <li key={item.id}>
                <button
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Navigation Actions (Right) */}
        <div className="nav-actions">
          {/* Cart Button */}
          <button 
            className="btn cart-btn" 
            onClick={openCart} 
            aria-label="View Shopping Cart"
          >
            <ShoppingBag size={18} color="#0D4733" />
            <span className="cart-text">Cart</span>
            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </button>

          {/* Desktop Primary CTA */}
          <button 
            className="btn btn-primary desktop-quote-btn" 
            onClick={openQuoteModal}
          >
            Get a Quote
          </button>

          {/* Mobile Menu Toggle Button (Visible only on <=992px) */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} color="#0D4733" /> : <Menu size={22} color="#0D4733" />}
          </button>
        </div>
      </div>

      {/* 3. Luxury Mobile Menu Drawer & Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="mobile-menu-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="mobile-menu-header">
              <div 
                className="brand-logo" 
                onClick={() => handleNavClick('home')}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src="/images/logo_header.png" 
                  alt="Grow Green" 
                  style={{ height: '42px', width: 'auto', objectFit: 'contain' }} 
                />
                <div className="brand-text-group">
                  <span className="brand-title" style={{ fontSize: '1.1rem' }}>GROW GREEN</span>
                  <span className="brand-subtitle" style={{ fontSize: '0.55rem' }}>Landscaping & Nursery</span>
                </div>
              </div>
              <button 
                className="mobile-menu-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} color="#0D4733" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="mobile-menu-content">
              <div className="mobile-menu-section-tag">Explore Grow Green</div>

              {/* Navigation List */}
              <ul className="mobile-nav-list">
                {navItems.map((item) => {
                  const isActive = activePage === item.id || (item.id === 'blog' && activePage === 'blog-post');
                  return (
                    <li key={item.id}>
                      <button
                        className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => handleNavClick(item.id)}
                      >
                        <div className="mobile-nav-item-left">
                          <span className="mobile-nav-icon">{item.icon}</span>
                          <span className="mobile-nav-label">{item.label}</span>
                        </div>
                        <ChevronRight size={18} className="mobile-nav-chevron" />
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Action Buttons & Quick Contacts */}
              <div className="mobile-menu-actions">
                <button 
                  className="btn btn-primary mobile-quote-cta"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openQuoteModal();
                  }}
                >
                  Get a Free Project Quote
                </button>

                <a 
                  href="https://wa.me/27615046752?text=Hello%20Cullen!%20I'd%20like%20to%20inquire%20about%20Grow%20Green%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-whatsapp-cta"
                >
                  <MessageCircle size={18} fill="#FFFFFF" color="#FFFFFF" />
                  <span>WhatsApp Cullen (+27 61 504 6752)</span>
                </a>

                <div className="mobile-quick-contacts">
                  <a href="tel:+27615046752" className="mobile-contact-pill">
                    <Phone size={14} color="#0D4733" />
                    <span>Call Us</span>
                  </a>
                  <a href="mailto:cullen@growgreensa.com" className="mobile-contact-pill">
                    <Mail size={14} color="#0D4733" />
                    <span>Email Us</span>
                  </a>
                </div>

                <div className="mobile-menu-tagline">
                  <Leaf size={14} color="#8CB974" />
                  <span>Transforming Spaces, Growing Life</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
