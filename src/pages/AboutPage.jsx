import React from 'react';
import { teamData } from '../data/plantsData';
import { Award, ShieldCheck, Sprout, HeartHandshake } from 'lucide-react';

export default function AboutPage({ openQuoteModal }) {
  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }}>
      {/* Hero Header */}
      <section style={{ background: 'linear-gradient(135deg, #0D4733 0%, #072B1F 100%)', color: '#FFFFFF', padding: '60px 0 40px 0', textAlign: 'center' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span style={{ color: '#8CB974', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.82rem' }}>
            Our Heritage & Roots
          </span>
          <h1 style={{ color: '#FFFFFF', fontSize: '2.5rem', marginTop: '8px', marginBottom: '14px', fontFamily: "'Montserrat', sans-serif" }}>
            Cultivating Excellence in Johannesburg
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Founded with a passion for South Africa's rich biodiversity, Grow Green blends ecological stewardship with luxury landscape architecture in Johannesburg.
          </p>
        </div>
      </section>

      {/* 1. BRAND STORY */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="responsive-grid-2">
            <div>
              <span className="section-subtitle">Our Mission & Values</span>
              <h2 className="section-title">Rooted in Sustainable Green Innovation</h2>
              <p style={{ color: '#4A5D54', fontSize: '1rem', lineHeight: 1.7, marginBottom: '20px' }}>
                At Grow Green, we believe every garden, patio, and commercial courtyard is a living canvas. We prioritize South African indigenous flora—from the drought-hardy Spekboom of the Eastern Cape to the iconic King Proteas of the Fynbos kingdom.
              </p>
              <p style={{ color: '#4A5D54', fontSize: '1rem', lineHeight: 1.7, marginBottom: '28px' }}>
                Under the leadership of CEO & Founder <strong>Cullen Hettema</strong>, our executive leadership team (Alvin, Melody, and Eric) brings specialized botanical expertise, precision 3D architecture, and site logistics to deliver climate-resilient landscapes in Johannesburg.
              </p>

              <div className="responsive-grid-2" style={{ gap: '16px' }}>
                <div style={{ background: '#F4F7F4', padding: '20px', borderRadius: '16px', borderLeft: '4px solid #8CB974' }}>
                  <Sprout size={28} color="#0D4733" style={{ marginBottom: '8px' }} />
                  <h4 style={{ fontSize: '1.05rem', color: '#0D4733', marginBottom: '4px' }}>100% Eco Sourced</h4>
                  <p style={{ fontSize: '0.85rem', color: '#4A5D54' }}>Sustainably grown in local South African climate-matched nurseries.</p>
                </div>
                <div style={{ background: '#F4F7F4', padding: '20px', borderRadius: '16px', borderLeft: '4px solid #0D4733' }}>
                  <HeartHandshake size={28} color="#8CB974" style={{ marginBottom: '8px' }} />
                  <h4 style={{ fontSize: '1.05rem', color: '#0D4733', marginBottom: '4px' }}>Client First</h4>
                  <p style={{ fontSize: '0.85rem', color: '#4A5D54' }}>Personalized consultations and ongoing plant health support.</p>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <img 
                src="/images/about_indigenous.jpg" 
                alt="South African Flora Botanical Garden" 
                style={{ width: '100%', borderRadius: '24px', boxShadow: '0 16px 40px rgba(13, 71, 51, 0.15)', objectFit: 'cover', minHeight: '320px', maxHeight: '440px' }} 
              />
              <div className="about-floating-badge">
                <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#8CB974', display: 'block', lineHeight: 1 }}>14+</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Years of Landscaping Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TEAM MEMBERS SECTION */}
      <section className="section-padding" style={{ background: '#F4F7F4' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Leadership & Field Operations</span>
            <h2 className="section-title">Meet Our Team & Staff</h2>
            <p className="section-desc">
              Led by CEO & Founder Cullen Hettema alongside our dedicated field operations, horticultural care, and site build specialists.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {teamData.map((member) => (
              <div className="team-card" key={member.id}>
                <div className="team-img-box">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3 className="team-name" style={{ fontSize: '1.25rem' }}>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p className="team-bio">{member.bio}</p>
                  <span style={{ display: 'inline-block', marginTop: '14px', fontSize: '0.78rem', background: '#F4F7F4', color: '#0D4733', padding: '6px 14px', borderRadius: '12px', fontWeight: 600 }}>
                    Focus: {member.specialty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="responsive-grid-2">
            <div>
              <img 
                src="/images/about_blueprint.jpg" 
                alt="Landscaping Architectural Design Blueprint" 
                style={{ width: '100%', borderRadius: '24px', boxShadow: '0 16px 40px rgba(13, 71, 51, 0.12)', minHeight: '320px', maxHeight: '440px', objectFit: 'cover' }}
              />
            </div>

            <div>
              <span className="section-subtitle">The Grow Green Advantage</span>
              <h2 className="section-title">Why Johannesburg Trusts Grow Green</h2>
              <p style={{ color: '#4A5D54', fontSize: '0.98rem', marginBottom: '28px' }}>
                We combine technical precision, high-end aesthetics, and local botanical knowledge to craft spaces that stand out.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(140,185,116,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Award size={22} color="#0D4733" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: '#0D4733', marginBottom: '4px' }}>Executive Botanical Leadership</h4>
                    <p style={{ fontSize: '0.88rem', color: '#4A5D54' }}>Our leadership holds recognized credentials in botanical science and site architecture.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(140,185,116,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldCheck size={22} color="#0D4733" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: '#0D4733', marginBottom: '4px' }}>Indigenous Plant Guarantee</h4>
                    <p style={{ fontSize: '0.88rem', color: '#4A5D54' }}>All indigenous flora sourced from our nursery come with growth health guarantees.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(140,185,116,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Sprout size={22} color="#0D4733" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: '#0D4733', marginBottom: '4px' }}>Water-Wise Eco Architecture</h4>
                    <p style={{ fontSize: '0.88rem', color: '#4A5D54' }}>Integrated smart drip-irrigation designed specifically for South African weather.</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '32px' }}>
                <button className="btn btn-primary" onClick={openQuoteModal} style={{ width: '100%', maxWidth: '400px' }}>
                  Schedule a Consultation with Cullen Hettema
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
