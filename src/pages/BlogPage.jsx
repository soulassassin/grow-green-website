import React, { useState, useMemo } from 'react';
import { 
  Search, BookOpen, Calendar, Clock, ArrowRight, Tag, 
  Sparkles, Layers, Compass, Leaf, Droplets, Cpu, CheckCircle2, ChevronRight
} from 'lucide-react';
import { 
  getLivePosts, getScheduledPosts, getCategoriesWithCounts, searchLivePosts 
} from '../utils/blogEngine';

export default function BlogPage({ onSelectPost, openQuoteModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUpcoming, setShowUpcoming] = useState(false);

  const categories = useMemo(() => getCategoriesWithCounts(), []);
  
  const filteredPosts = useMemo(() => {
    return searchLivePosts(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  const scheduledPosts = useMemo(() => getScheduledPosts(), []);
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const standardPosts = filteredPosts.length > 0 ? filteredPosts.slice(1) : [];

  const getCategoryIcon = (slug) => {
    switch (slug) {
      case 'landscape-design-architecture': return <Compass size={16} />;
      case 'hardscaping-outdoor-living': return <Layers size={16} />;
      case 'plant-selection-horticulture': return <Leaf size={16} />;
      case 'seasonal-care-maintenance': return <Calendar size={16} />;
      case 'smart-irrigation-drainage': return <Droplets size={16} />;
      case 'hydroponics-modern-cultivation': return <Cpu size={16} />;
      case 'sustainable-eco-landscaping': return <Sparkles size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  return (
    <div className="blog-page-container" style={{ background: '#F4F7F4', minHeight: '100vh', paddingBottom: '96px' }}>
      {/* 1. HERO SECTION */}
      <section style={{ 
        background: 'linear-gradient(135deg, #0D4733 0%, #072B1F 100%)', 
        color: '#FFFFFF', 
        padding: '130px 0 64px 0',
        borderBottom: '4px solid #8CB974'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '880px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'rgba(255,255,255,0.1)', 
            padding: '6px 16px', 
            borderRadius: '9999px',
            marginBottom: '16px',
            border: '1px solid rgba(140,185,116,0.3)'
          }}>
            <BookOpen size={16} color="#8CB974" />
            <span style={{ color: '#8CB974', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Botanical & Architectural Knowledge Hub
            </span>
          </div>

          <h1 style={{ 
            fontSize: '2.8rem', 
            fontWeight: 800, 
            color: '#FFFFFF', 
            marginBottom: '16px',
            fontFamily: "'Montserrat', sans-serif"
          }}>
            Landscaping & Outdoor Living Insights
          </h1>

          <p style={{ 
            fontSize: '1.1rem', 
            color: 'rgba(255,255,255,0.85)', 
            lineHeight: 1.6, 
            marginBottom: '36px' 
          }}>
            Expert horticultural guides, hardscaping engineering, smart irrigation hydrology, and sustainable South African garden architecture curated by our master landscape team.
          </p>

          {/* Search Bar */}
          <div style={{ 
            maxWidth: '560px', 
            margin: '0 auto', 
            position: 'relative' 
          }}>
            <Search size={20} color="#8CB974" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search guides (e.g. xeriscaping, French drains, paving, hydroponics)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 20px 16px 54px',
                borderRadius: '9999px',
                border: '2px solid rgba(140,185,116,0.3)',
                background: 'rgba(255,255,255,0.96)',
                color: '#1B2A23',
                fontSize: '0.98rem',
                outline: 'none',
                boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
              }}
            />
          </div>
        </div>
      </section>

      {/* 2. CATEGORY TAXONOMY FILTER BAR */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid #E0E7E2', position: 'sticky', top: '96px', zIndex: 90, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div className="container" style={{ padding: '16px 24px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', minWidth: 'max-content' }}>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: selectedCategory === 'all' ? '2px solid #0D4733' : '1px solid #E0E7E2',
                background: selectedCategory === 'all' ? '#0D4733' : '#F4F7F4',
                color: selectedCategory === 'all' ? '#FFFFFF' : '#1B2A23',
                transition: 'all 0.2s ease'
              }}
            >
              <BookOpen size={15} /> All Topics
            </button>

            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedCategory === cat.slug ? `2px solid ${cat.badgeColor}` : '1px solid #E0E7E2',
                  background: selectedCategory === cat.slug ? cat.badgeColor : '#F4F7F4',
                  color: selectedCategory === cat.slug ? '#FFFFFF' : '#1B2A23',
                  transition: 'all 0.2s ease'
                }}
              >
                {getCategoryIcon(cat.slug)}
                <span>{cat.shortName}</span>
                <span style={{ 
                  background: selectedCategory === cat.slug ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.08)',
                  padding: '2px 7px',
                  borderRadius: '9999px',
                  fontSize: '0.72rem'
                }}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '48px' }}>
        {/* Editorial Status Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.9rem', color: '#4A5D54', fontWeight: 600 }}>
              Showing {filteredPosts.length} published guides
              {selectedCategory !== 'all' && ` in "${categories.find(c => c.slug === selectedCategory)?.name}"`}
            </span>
          </div>

          <button
            onClick={() => setShowUpcoming(!showUpcoming)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#FFFFFF',
              border: '1px solid #E0E7E2',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#0D4733',
              cursor: 'pointer'
            }}
          >
            <Calendar size={15} color="#8CB974" />
            <span>{showUpcoming ? 'Hide Publishing Calendar' : `View 7-Week Queue (${scheduledPosts.length} Scheduled)`}</span>
          </button>
        </div>

        {/* 3. UPCOMING EDITORIAL QUEUE ACCORDION */}
        {showUpcoming && (
          <div style={{
            background: '#FFFFFF',
            border: '2px solid #8CB974',
            borderRadius: '20px',
            padding: '28px',
            marginBottom: '48px',
            boxShadow: '0 8px 30px rgba(13,71,51,0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: '#0D4733', fontWeight: 800 }}>
                  Automated Publishing Calendar (Mon / Wed / Fri Cadence)
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#4A5D54', marginTop: '4px' }}>
                  20 SEO articles sequenced over the next 7 weeks. Articles auto-publish without manual intervention.
                </p>
              </div>
              <span style={{ 
                background: 'rgba(140,185,116,0.2)', 
                color: '#0D4733', 
                padding: '6px 14px', 
                borderRadius: '12px', 
                fontWeight: 700,
                fontSize: '0.8rem' 
              }}>
                Auto-Publish Engine Active
              </span>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '16px' 
            }}>
              {scheduledPosts.map((sp) => (
                <div key={sp.slug} style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: '#F4F7F4',
                  border: '1px solid #E0E7E2',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0D4733', textTransform: 'uppercase' }}>
                      {sp.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#E65100', fontWeight: 600 }}>
                      🗓️ {sp.publishDate}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.94rem', color: '#1B2A23', fontWeight: 700, lineHeight: 1.3 }}>
                    {sp.title}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#4A5D54', lineHeight: 1.4 }}>
                    {sp.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. FEATURED PILLAR ARTICLE HERO CARD */}
        {featuredPost && selectedCategory === 'all' && !searchQuery && (
          <div 
            onClick={() => onSelectPost(featuredPost.slug)}
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(13,71,51,0.1)',
              border: '1px solid #E0E7E2',
              marginBottom: '48px',
              cursor: 'pointer',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              transition: 'transform 0.3s ease'
            }}
            className="featured-post-card"
          >
            <div style={{ height: '360px', overflow: 'hidden', position: 'relative' }}>
              <img 
                src={featuredPost.coverImage} 
                alt={featuredPost.title}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: '#0D4733',
                color: '#8CB974',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}>
                ⭐ Featured Pillar Guide
              </span>
            </div>

            <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px', fontSize: '0.85rem', color: '#4A5D54' }}>
                <span style={{ color: '#0D4733', fontWeight: 700 }}>{featuredPost.category}</span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} color="#8CB974" /> {featuredPost.readTime}
                </span>
                <span>•</span>
                <span>{featuredPost.date}</span>
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0D4733', marginBottom: '16px', lineHeight: 1.3 }}>
                {featuredPost.title}
              </h2>

              <p style={{ fontSize: '0.98rem', color: '#4A5D54', lineHeight: 1.6, marginBottom: '28px' }}>
                {featuredPost.excerpt}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src={featuredPost.author.avatar} 
                    alt={featuredPost.author.name}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <span style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', color: '#1B2A23' }}>
                      {featuredPost.author.name}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#4A5D54' }}>
                      {featuredPost.author.role}
                    </span>
                  </div>
                </div>

                <span style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  color: '#0D4733', 
                  fontWeight: 700, 
                  fontSize: '0.92rem' 
                }}>
                  Read Full Guide <ArrowRight size={18} color="#8CB974" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 5. ARTICLES GRID */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '32px' 
        }}>
          {(selectedCategory === 'all' && !searchQuery ? standardPosts : filteredPosts).map((post) => (
            <article 
              key={post.slug}
              onClick={() => onSelectPost(post.slug)}
              className="blog-card"
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #E0E7E2',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                contentVisibility: 'auto',
                containIntrinsicSize: '0 420px'
              }}
            >
              <div style={{ height: '210px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: '#0D4733',
                  color: '#8CB974',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}>
                  {post.category}
                </span>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#4A5D54', marginBottom: '10px' }}>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} color="#8CB974" /> {post.readTime}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0D4733', marginBottom: '12px', lineHeight: 1.35 }}>
                  {post.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: '#4A5D54', lineHeight: 1.55, marginBottom: '20px' }}>
                  {post.excerpt}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #F0F4F1', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1B2A23' }}>
                      {post.author.name}
                    </span>
                  </div>

                  <span style={{ color: '#0D4733', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Read <ArrowRight size={15} color="#8CB974" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 20px', background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E0E7E2' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#0D4733', marginBottom: '10px' }}>No articles match your search</h3>
            <p style={{ color: '#4A5D54', marginBottom: '24px' }}>Try searching for a different keyword or selecting "All Topics".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="btn btn-outline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 6. BOTTOM CONSULTATION BANNER */}
        <div style={{
          marginTop: '72px',
          background: 'linear-gradient(135deg, #0D4733 0%, #175C44 100%)',
          color: '#FFFFFF',
          borderRadius: '24px',
          padding: '48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          boxShadow: '0 16px 40px rgba(13,71,51,0.15)'
        }}>
          <div style={{ maxWidth: '600px' }}>
            <span style={{ color: '#8CB974', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
              Transform Your Property
            </span>
            <h3 style={{ fontSize: '2rem', color: '#FFFFFF', fontWeight: 800, margin: '8px 0 12px 0' }}>
              Need Professional Architectural Landscaping?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', lineHeight: 1.6 }}>
              From initial 3D topographical planning to sustainable indigenous nursery installation, our certified master horticulturists bring your outdoor vision to life in Johannesburg.
            </p>
          </div>

          <button
            onClick={openQuoteModal}
            className="btn btn-primary"
            style={{ padding: '16px 32px', fontSize: '1rem' }}
          >
            Request Free Consultation <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
