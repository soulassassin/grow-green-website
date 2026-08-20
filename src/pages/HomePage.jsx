import React from 'react';
import SproutingHeroCanvas from '../components/SproutingHeroCanvas';
import TipOfTheDay from '../components/TipOfTheDay';
import { ArrowRight, CheckCircle2, Leaf, ShieldCheck, Sun, Droplets, Heart } from 'lucide-react';
import { plantsData } from '../data/plantsData';

export default function HomePage({ setActivePage, openQuoteModal, addToCart, showToast }) {
  const featuredPlants = plantsData.slice(0, 4);

  const services = [
    {
      id: 'residential',
      title: 'Residential Landscaping',
      subtitle: 'Luxury Estate & Home Gardens',
      desc: 'Bespoke architectural garden design, hardscaping, and indigenous floral displays tailored to your luxury Johannesburg home.',
      image: '/images/service_residential.jpg'
    },
    {
      id: 'commercial',
      title: 'Commercial Plant Installation',
      subtitle: 'Office Parks & Retail Complexes',
      desc: 'Eco-friendly urban greenery, living vertical plant walls, and interior/exterior plant scaping designed to elevate Johannesburg corporate environments.',
      image: '/images/service_commercial.jpg'
    },
    {
      id: 'maintenance',
      title: 'Ongoing Lawn & Estate Care',
      subtitle: 'Precision Maintenance & Care',
      desc: 'Professional turf management, organic soil fertilization, pest control, and seasonal pruning by certified horticulturists in Johannesburg.',
      image: '/images/service_maintenance.jpg'
    }
  ];

  return (
    <div>
      {/* 1. HERO SECTION WITH 3D SPROUTING CANVAS */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-badge">
                <Leaf size={16} color="#0D4733" />
                <span>Premier South African Landscaping & Nursery</span>
              </div>
              <h1 className="hero-title" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Transforming Spaces, <span style={{ fontFamily: "'Montserrat', sans-serif" }}>Growing Life.</span>
              </h1>
              <p className="hero-description">
                Grow Green crafts breathtaking, eco-friendly luxury landscapes in Johannesburg and supplies top-tier indigenous nursery plants across South Africa.
              </p>
              <div className="hero-cta-group">
                <button className="btn btn-primary" onClick={openQuoteModal}>
                  Get a Free Quote <ArrowRight size={18} />
                </button>
                <button className="btn btn-outline" onClick={() => setActivePage('shop')}>
                  Explore Nursery Plants
                </button>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '36px', paddingTop: '20px', borderTop: '1px solid rgba(13,71,51,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={20} color="#8CB974" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1B2A23' }}>Native SA Flora</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={20} color="#8CB974" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1B2A23' }}>Expert Horticulturists</span>
                </div>
              </div>
            </div>

            {/* 3D Sprouting Interactive Three.js Canvas */}
            <SproutingHeroCanvas />
          </div>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW SECTION */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What We Do</span>
            <h2 className="section-title">Master Landscaping & Nursery Services</h2>
            <p className="section-desc">
              From private residential sanctuaries to expansive commercial developments, our team brings botanical expertise and eco-artistry to every project.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div className="service-card" key={service.id}>
                <div className="service-img-wrapper">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="service-content">
                  <span style={{ fontSize: '0.78rem', color: '#8CB974', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                    {service.subtitle}
                  </span>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-text">{service.desc}</p>
                  <button 
                    onClick={() => setActivePage('services')}
                    className="btn btn-outline" 
                    style={{ padding: '10px 20px', fontSize: '0.88rem', marginTop: 'auto', alignSelf: 'flex-start' }}
                  >
                    View Service Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TIP OF THE DAY FEATURE SECTION */}
      <section className="section-padding" style={{ background: '#FFFFFF', paddingTop: '0' }}>
        <div className="container">
          <TipOfTheDay />
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS PREVIEW */}
      <section className="section-padding" style={{ background: '#F4F7F4' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '40px' }}>
            <span className="section-subtitle">Direct from Our Nursery</span>
            <h2 className="section-title">Popular Indigenous & Exotic Plants</h2>
            <p className="section-desc">
              Explore a curated selection of our healthiest potted plants ready for immediate delivery across South Africa.
            </p>
          </div>

          <div className="products-grid">
            {featuredPlants.map((plant) => (
              <div className="product-card" key={plant.id}>
                <div className="product-img-box">
                  <img 
                    src={plant.image} 
                    alt={plant.commonName} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/plant_strelitzia.jpg';
                    }}
                  />
                  <div className="product-badge-group">
                    <span className="badge badge-sun">{plant.sunExposure}</span>
                    <span className="badge badge-care">{plant.careLevel}</span>
                  </div>
                </div>

                <div className="product-details">
                  <span className="product-category">{plant.category}</span>
                  <h3 className="product-name">{plant.commonName}</h3>
                  <p className="product-scientific">{plant.scientificName}</p>

                  <div className="product-price-row">
                    <span className="product-price">{plant.formattedPrice}</span>
                    <button 
                      className="btn-add-cart"
                      onClick={() => {
                        addToCart(plant);
                        showToast(`Added ${plant.commonName} to cart!`);
                      }}
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button className="btn btn-primary" onClick={() => setActivePage('shop')}>
              View All 30+ Nursery Plants <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION SECTION */}
      <section className="section-padding" style={{ background: '#0D4733', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px' }}>
          <span style={{ color: '#8CB974', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
            Ready to Elevate Your Landscape?
          </span>
          <h2 style={{ color: '#FFFFFF', fontSize: '2.8rem', margin: '16px 0 24px 0', fontFamily: "'Montserrat', sans-serif" }}>
            Let's Build Your Dream Green Space Together.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', marginBottom: '36px', lineHeight: 1.6 }}>
            Speak directly with CEO & Founder Cullen Hettema (+27 61 504 6752) or request a custom site consultation online.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-accent" onClick={openQuoteModal} style={{ padding: '14px 32px', fontSize: '1rem' }}>
              Request a Free Proposal
            </button>
            <a 
              href="https://wa.me/27615046752?text=Hello%20Cullen,%20I'd%20like%20to%20discuss%20a%20landscaping%20project." 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn" 
              style={{ background: '#25D366', color: '#FFFFFF', padding: '14px 32px', fontSize: '1rem' }}
            >
              Chat on WhatsApp Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
