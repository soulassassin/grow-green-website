import React from 'react';
import { ArrowRight, CheckCircle2, Leaf, ShieldCheck, Phone, MessageCircle, Droplets, Sprout, Building, Home, Sun, Award } from 'lucide-react';

export default function ServicesPage({ openQuoteModal }) {
  const detailedServices = [
    {
      id: 'residential',
      title: 'Residential Landscaping & Garden Architecture',
      badge: 'Most Popular',
      category: 'Home & Estate',
      icon: <Home size={32} color="#8CB974" />,
      image: '/images/service_residential.jpg',
      shortDesc: 'Complete 3D landscape architecture, hardscaping, and indigenous garden design for luxury Johannesburg residences.',
      fullDesc: 'Our residential team transforms private gardens, courtyards, and luxury estates in Johannesburg into sustainable living sanctuaries. Led by Eric and CEO Cullen Hettema, we combine architectural precision with native South African flora.',
      features: [
        'Custom 3D CAD garden designs & site masterplans',
        'Custom stone paving, retainment walls & hardscaping',
        'Drought-tolerant indigenous plant & lawn installation',
        'Ambient low-voltage outdoor LED garden lighting'
      ],
      priceRange: 'Projects from R 15,000'
    },
    {
      id: 'commercial',
      title: 'Commercial & Corporate Plant Scaping',
      badge: 'Corporate Solution',
      category: 'Commercial',
      icon: <Building size={32} color="#8CB974" />,
      image: '/images/service_commercial.jpg',
      shortDesc: 'Vertical green walls, indoor plant scaping, and eco-friendly outdoor courtyards for corporate office parks and retail spaces in Johannesburg.',
      fullDesc: 'We help corporations in Johannesburg boost productivity and environmental sustainability through biophilic office designs. From hydroponic living walls to low-maintenance indoor planter displays.',
      features: [
        'Living vertical green wall design & installation',
        'Indoor air-purifying office plant leasing & care',
        'Office park outdoor courtyard landscape design',
        'Eco-compliant corporate sustainability reporting'
      ],
      priceRange: 'Projects from R 25,000'
    },
    {
      id: 'maintenance',
      title: 'Ongoing Estate & Lawn Care Maintenance',
      badge: 'Full Service',
      category: 'Maintenance',
      icon: <ShieldCheck size={32} color="#8CB974" />,
      image: '/images/service_maintenance.jpg',
      shortDesc: 'Weekly or monthly estate care in Johannesburg, turf management, organic fertilization, and seasonal pruning by certified horticulturists.',
      fullDesc: 'Keep your Johannesburg property looking pristine year-round. Our dedicated team (managed by Alvin) provides precision hedging, lawn edging, organic pest control, and seasonal feeding tailored to South African weather.',
      features: [
        'Scheduled weekly lawn mowing & turf care',
        'Organic soil fertilization & weed management',
        'Seasonal tree & shrub pruning and shaping',
        'Irrigation auditing & sprinkler adjustment'
      ],
      priceRange: 'From R 3,500 / month'
    },
    {
      id: 'nursery',
      title: 'Indigenous Plant & Protea Nursery Supply',
      badge: 'Direct Farm Supply',
      category: 'Nursery & Supply',
      icon: <Sprout size={32} color="#8CB974" />,
      image: '/images/about_indigenous.jpg',
      shortDesc: 'Bulk and retail supply of climate-matched indigenous plants, including King Proteas and Spekboom, for delivery in Johannesburg.',
      fullDesc: 'Sourced directly from our nursery facility managed by Melody. Every plant is acclimatized for high survival rates in South African soils.',
      features: [
        'Over 30+ species of indigenous SA flora & succulents',
        'Healthy potted King Proteas, Strelitzias & Clivias',
        'Bulk nursery supply for contractors & developers',
        'Delivery available in Johannesburg'
      ],
      priceRange: 'Individual plants from R 85'
    },
    {
      id: 'irrigation',
      title: 'Smart Eco-Irrigation & Greywater Systems',
      badge: 'Water-Wise',
      category: 'Engineering',
      icon: <Droplets size={32} color="#8CB974" />,
      image: '/images/about_blueprint.jpg',
      shortDesc: 'Automated solar-powered drip irrigation networks and greywater recycling systems in Johannesburg, designed for maximum water conservation.',
      fullDesc: 'Water conservation is at the heart of Grow Green. We install smart, weather-aware irrigation systems in Johannesburg that monitor rain patterns and optimize watering schedules.',
      features: [
        'Smart Wi-Fi & solar-powered irrigation controllers',
        'Precision sub-surface drip irrigation piping',
        'Greywater filtration & rainwater harvesting tanks',
        'Borehole & pump system integration'
      ],
      priceRange: 'Systems from R 12,000'
    }
  ];

  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }}>
      {/* Header Banner */}
      <section style={{ background: '#0D4733', color: '#FFFFFF', padding: '60px 0 40px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span style={{ color: '#8CB974', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.82rem' }}>
            Comprehensive Botanical Solutions
          </span>
          <h1 style={{ color: '#FFFFFF', fontSize: '2.5rem', marginTop: '8px', marginBottom: '12px' }}>
            Our Professional Services
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            From initial 3D landscape architecture to ongoing estate care in Johannesburg and bulk indigenous nursery supply across South Africa.
          </p>
        </div>
      </section>

      {/* Services List Section */}
      <section className="section-padding" style={{ background: '#F4F7F4' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {detailedServices.map((service, index) => (
              <div 
                key={service.id} 
                className="service-split-card"
              >
                {/* Text Side */}
                <div className="service-card-text" style={{ order: index % 2 === 1 ? 2 : 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {service.icon}
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8CB974', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {service.category}
                      </span>
                    </div>
                    <span style={{ background: '#F4F7F4', color: '#0D4733', padding: '4px 12px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 700 }}>
                      {service.badge}
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.7rem', color: '#0D4733', marginBottom: '12px' }}>
                    {service.title}
                  </h2>

                  <p style={{ color: '#4A5D54', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '24px' }}>
                    {service.fullDesc}
                  </p>

                  <div style={{ marginBottom: '28px' }}>
                    <h4 style={{ fontSize: '0.95rem', color: '#0D4733', marginBottom: '12px', fontWeight: 700 }}>
                      Key Deliverables & Features:
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#1B2A23' }}>
                          <CheckCircle2 size={16} color="#8CB974" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', paddingTop: '20px', borderTop: '1px solid #F4F7F4' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: '#4A5D54', textTransform: 'uppercase' }}>Estimated Pricing</span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0D4733' }}>{service.priceRange}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button className="btn btn-primary" onClick={openQuoteModal} style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
                        Inquire Now
                      </button>
                      <a 
                        href={`https://wa.me/27615046752?text=Hello%20Grow%20Green!%20I'd%20like%20more%20details%20about%20${encodeURIComponent(service.title)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{ background: '#25D366', color: '#FFFFFF', padding: '10px 16px' }}
                      >
                        <MessageCircle size={16} color="#FFFFFF" fill="#FFFFFF" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Image Side */}
                <div className="service-card-img" style={{ order: index % 2 === 1 ? 1 : 2 }}>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="section-padding" style={{ background: '#0D4733', color: '#FFFFFF', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span style={{ color: '#8CB974', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
            Need a Tailored Quote?
          </span>
          <h2 style={{ color: '#FFFFFF', fontSize: '2.5rem', margin: '12px 0 20px 0' }}>
            Speak Directly with Cullen Hettema & Team
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', marginBottom: '32px' }}>
            Contact us at +27 61 504 6752 or cullen@growgreensa.com to discuss your project requirements.
          </p>
          <button className="btn btn-accent" onClick={openQuoteModal} style={{ padding: '14px 32px', fontSize: '1rem' }}>
            Get a Custom Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
