import React, { useState } from 'react';
import { X, Send, CheckCircle2, Phone, Mail } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose, showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Residential Landscaping & Garden Architecture',
    location: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast("Thank you! Your quote request has been sent to Cullen Hettema & the Grow Green team.");
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  const handleDirectWhatsApp = () => {
    const text = `Hello Cullen, I would like to request a quote for ${formData.service}.\nName: ${formData.name}\nLocation: ${formData.location}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    window.open(`https://wa.me/27615046752?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <CheckCircle2 size={64} color="#8CB974" style={{ margin: '0 auto 20px auto' }} />
            <h3 style={{ fontSize: '1.8rem', color: '#0D4733', marginBottom: '12px' }}>Quote Request Received!</h3>
            <p style={{ color: '#4A5D54', fontSize: '1rem', maxWidth: '440px', margin: '0 auto' }}>
              We have received your project details. Cullen Hettema (+27 61 504 6752) will contact you shortly with a personalized proposal.
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '24px' }}>
              <span style={{ color: '#8CB974', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Custom Quotation</span>
              <h2 style={{ fontSize: '1.8rem', color: '#0D4733', marginTop: '4px' }}>Transform Your Space</h2>
              <p style={{ color: '#4A5D54', fontSize: '0.92rem' }}>Fill out the details below or message Cullen Hettema directly for an estimate.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Sarah Jenkins"
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
                    placeholder="sarah@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp *</label>
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
                  <option value="Commercial & Corporate Plant Scaping">Commercial & Corporate Plant Scaping</option>
                  <option value="Ongoing Estate & Lawn Care Maintenance">Ongoing Estate & Lawn Care Maintenance</option>
                  <option value="Indigenous Plant & Protea Nursery Supply">Indigenous Plant & Protea Nursery Supply</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">City / Region in South Africa</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Sandton or Bryanston, JHB"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Project Details & Requirements</label>
                <textarea 
                  className="form-textarea" 
                  rows="3"
                  placeholder="Tell us about your property size, garden vision, or plant quantities..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: '1 1 200px' }}>
                  <Send size={18} /> Submit Quote Request
                </button>
                <button 
                  type="button" 
                  onClick={handleDirectWhatsApp} 
                  className="btn" 
                  style={{ background: '#25D366', color: '#FFFFFF', flex: '1 1 160px' }}
                  title="Send via WhatsApp"
                >
                  WhatsApp Quote
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
