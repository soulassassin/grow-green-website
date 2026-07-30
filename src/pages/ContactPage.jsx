import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Clock } from 'lucide-react';

export default function ContactPage({ showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Residential Landscaping & Garden Architecture',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast("Message sent to Cullen Hettema & Grow Green team!");
  };

  return (
    <div style={{ paddingTop: '100px' }}>
      {/* Header Banner */}
      <section style={{ background: '#0D4733', color: '#FFFFFF', padding: '60px 0 40px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span style={{ color: '#8CB974', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.82rem' }}>
            We'd Love to Hear From You
          </span>
          <h1 style={{ color: '#FFFFFF', fontSize: '2.5rem', marginTop: '8px', marginBottom: '12px', fontFamily: "'Montserrat', sans-serif" }}>
            Get in Touch with Grow Green
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem' }}>
            Whether you need bespoke estate landscaping or bulk nursery plant orders, Cullen Hettema & our team are here to assist.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="responsive-grid-2">
            
            {/* 1. Contact Form */}
            <div>
              <h2 style={{ fontSize: '1.7rem', color: '#0D4733', marginBottom: '8px', fontFamily: "'Montserrat', sans-serif" }}>Send Us a Message</h2>
              <p style={{ color: '#4A5D54', fontSize: '0.95rem', marginBottom: '24px' }}>
                Fill out the contact form below and we will respond within 2 business hours.
              </p>

              {submitted ? (
                <div style={{ background: '#F4F7F4', border: '2px solid #8CB974', padding: '36px 20px', borderRadius: '16px', textAlign: 'center' }}>
                  <CheckCircle2 size={48} color="#8CB974" style={{ margin: '0 auto 16px auto' }} />
                  <h3 style={{ color: '#0D4733', marginBottom: '8px' }}>Message Successfully Sent!</h3>
                  <p style={{ color: '#4A5D54', fontSize: '0.95rem' }}>
                    Thank you, {formData.name}. Cullen Hettema (+27 61 504 6752) will contact you at {formData.phone} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Your Full Name *</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="e.g. David Williams"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="responsive-grid-2" style={{ gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input 
                        type="email" 
                        className="form-input"
                        placeholder="david@example.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input 
                        type="tel" 
                        className="form-input"
                        placeholder="+27 61 504 6752"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Service Required *</label>
                    <select 
                      className="form-select"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="Residential Landscaping & Garden Architecture">Residential Landscaping & Garden Architecture</option>
                      <option value="Commercial Plant Installation">Commercial Plant Installation</option>
                      <option value="Ongoing Estate Lawn Care">Ongoing Estate Lawn Care</option>
                      <option value="Nursery Plant Order Inquiry">Nursery Plant Order Inquiry</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message / Details *</label>
                    <textarea 
                      className="form-textarea"
                      rows="4"
                      placeholder="Describe your garden size, location, or questions..."
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
                    <Send size={18} /> Send Message
                  </button>
                </form>
              )}
            </div>

            {/* 2. Direct Details & WhatsApp Card */}
            <div>
              <h2 style={{ fontSize: '1.7rem', color: '#0D4733', marginBottom: '8px', fontFamily: "'Montserrat', sans-serif" }}>Direct Contact Details</h2>
              <p style={{ color: '#4A5D54', fontSize: '0.95rem', marginBottom: '24px' }}>
                Reach out to our leadership team directly for immediate assistance.
              </p>

              {/* Direct Info Box */}
              <div style={{ background: '#F4F7F4', padding: '28px', borderRadius: '20px', border: '1px solid #E0E7E2', marginBottom: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  <a href="tel:+27615046752" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#0D4733', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={20} color="#8CB974" />
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.78rem', color: '#4A5D54', textTransform: 'uppercase', fontWeight: 700 }}>Direct Phone Line</span>
                      <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0D4733' }}>+27 61 504 6752</span>
                    </div>
                  </a>

                  <a href="mailto:cullen@growgreensa.com" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#0D4733', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={20} color="#8CB974" />
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.78rem', color: '#4A5D54', textTransform: 'uppercase', fontWeight: 700 }}>Email Address</span>
                      <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0D4733', wordBreak: 'break-all' }}>cullen@growgreensa.com</span>
                    </div>
                  </a>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#0D4733', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Clock size={20} color="#8CB974" />
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.78rem', color: '#4A5D54', textTransform: 'uppercase', fontWeight: 700 }}>Operating Hours</span>
                      <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#0D4733' }}>Mon - Sat: 08:00 - 17:00 (SAST)</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Prominent Direct WhatsApp Card */}
              <div style={{
                background: 'linear-gradient(135deg, #25D366 0%, #1DA851 100%)',
                color: '#FFFFFF',
                padding: '28px',
                borderRadius: '24px',
                boxShadow: '0 12px 32px rgba(37, 211, 102, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800, opacity: 0.9, letterSpacing: '1px' }}>
                    Instant Chat Available
                  </span>
                  <h3 style={{ color: '#FFFFFF', fontSize: '1.3rem', marginTop: '2px', marginBottom: '6px', fontFamily: "'Montserrat', sans-serif" }}>
                    Need a Fast Quote on WhatsApp?
                  </h3>
                  <p style={{ fontSize: '0.88rem', opacity: 0.95 }}>
                    Chat directly with Cullen Hettema for real-time plant advice or instant site quotes.
                  </p>
                </div>

                <a 
                  href="https://wa.me/27615046752?text=Hello%20Cullen!%20I'd%20like%20to%20get%20a%20quick%20quote%20for%20Grow%20Green%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ background: '#FFFFFF', color: '#0D4733', fontWeight: 800, padding: '12px 24px', width: '100%', maxWidth: '200px' }}
                >
                  <MessageCircle size={18} color="#25D366" fill="#25D366" /> Chat Now
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCATION & INTERACTIVE MAP SECTION */}
      <section className="section-padding" style={{ background: '#F4F7F4', borderTop: '1px solid #E0E7E2' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">South Africa Coverage</span>
            <h2 className="section-title">Our Primary Service Hubs & Nursery</h2>
            <p className="section-desc">
              We service luxury residential estates, commercial hubs, and agricultural properties across Western Cape and Gauteng.
            </p>
          </div>

          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 16px 40px rgba(13, 71, 51, 0.12)', background: '#0D4733' }}>
            <img 
              src="/images/contact_map.jpg" 
              alt="South Africa Service Map" 
              style={{ width: '100%', height: '380px', objectFit: 'cover', opacity: 0.85 }} 
            />

            {/* Map Overlay Card */}
            <div className="map-overlay-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <MapPin size={20} color="#8CB974" />
                <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontFamily: "'Montserrat', sans-serif" }}>Grow Green South Africa</h4>
              </div>
              <ul style={{ listStyle: 'none', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '8px', color: 'rgba(255,255,255,0.85)' }}>
                <li>📍 <strong>Western Cape Hub:</strong> Cape Town & Winelands</li>
                <li>📍 <strong>Gauteng Hub:</strong> Johannesburg & Pretoria</li>
                <li>🚚 <strong>Nationwide Shipping:</strong> Nursery Plants across SA</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
