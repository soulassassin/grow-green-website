import React from 'react';
import { Phone, Mail, MapPin, Heart, Leaf } from 'lucide-react';

export default function Footer({ setActivePage }) {
  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#0D4733', color: '#FFFFFF', paddingTop: '80px', paddingBottom: '36px', borderTop: '4px solid #8CB974' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '48px', marginBottom: '60px' }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <img src="/images/logo_v2.png" alt="Grow Green Logo" style={{ height: '80px', width: '80px', background: '#FFFFFF', padding: '6px', borderRadius: '50%', objectFit: 'contain' }} />
              <div>
                <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', fontWeight: 800 }}>GROW GREEN</h3>
                <p style={{ color: '#8CB974', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px' }}>LANDSCAPING & NURSERY</p>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.94rem', marginBottom: '24px', lineHeight: 1.6 }}>
              South Africa's premier eco-conscious landscape architecture and indigenous plant nursery. Transforming residential, commercial, and agricultural spaces into thriving green sanctuaries.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', padding: '10px 16px', borderRadius: '12px', border: '1px solid rgba(140,185,116,0.3)', width: 'fit-content' }}>
              <Leaf size={18} color="#8CB974" />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#8CB974' }}>100% Sustainable SA Sourced</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.15rem', marginBottom: '24px', position: 'relative', display: 'inline-block' }}>
              Quick Navigation
              <span style={{ display: 'block', height: '3px', width: '32px', background: '#8CB974', marginTop: '6px', borderRadius: '2px' }}></span>
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li>
                <button onClick={() => handleNav('home')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', cursor: 'pointer' }}>
                  Home & 3D Tree Experience
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', cursor: 'pointer' }}>
                  Services & Solutions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', cursor: 'pointer' }}>
                  About Our Team & Leadership
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', cursor: 'pointer' }}>
                  Nursery Catalog (30+ Plants)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', cursor: 'pointer' }}>
                  Contact Us & Location Map
                </button>
              </li>
            </ul>
          </div>

          {/* Plant Categories */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.15rem', marginBottom: '24px', position: 'relative', display: 'inline-block' }}>
              Plant Categories
              <span style={{ display: 'block', height: '3px', width: '32px', background: '#8CB974', marginTop: '6px', borderRadius: '2px' }}></span>
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'rgba(255,255,255,0.8)', fontSize: '0.92rem' }}>
              <li>• Indigenous Plants & Proteas</li>
              <li>• Drought-Resistant Succulents & Cacti</li>
              <li>• Air-Purifying Indoor Houseplants</li>
              <li>• Fruit Trees & Organic Culinary Herbs</li>
              <li>• Flowering Ground Cover & Clivias</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.15rem', marginBottom: '24px', position: 'relative', display: 'inline-block' }}>
              Direct Contact
              <span style={{ display: 'block', height: '3px', width: '32px', background: '#8CB974', marginTop: '6px', borderRadius: '2px' }}></span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <a href="tel:+27615046752" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.9)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(140,185,116,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={18} color="#8CB974" />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#8CB974', textTransform: 'uppercase', fontWeight: 600 }}>Phone / WhatsApp</span>
                  <span style={{ fontWeight: 600 }}>+27 61 504 6752</span>
                </div>
              </a>

              <a href="mailto:cullen@growgreensa.com" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.9)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(140,185,116,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={18} color="#8CB974" />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#8CB974', textTransform: 'uppercase', fontWeight: 600 }}>Email Address</span>
                  <span style={{ fontWeight: 600 }}>cullen@growgreensa.com</span>
                </div>
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.9)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(140,185,116,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={18} color="#8CB974" />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#8CB974', textTransform: 'uppercase', fontWeight: 600 }}>Service Regions</span>
                  <span style={{ fontSize: '0.88rem' }}>Johannesburg, South Africa</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)' }}>
          <p>© {new Date().getFullYear()} Grow Green (Pty) Ltd. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Crafted with <Heart size={14} color="#8CB974" fill="#8CB974" /> for South African Nature
          </p>
        </div>
      </div>
    </footer>
  );
}
