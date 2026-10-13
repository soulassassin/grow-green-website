import React, { useMemo } from 'react';
import { marked } from 'marked';
import { 
  ArrowLeft, Clock, Calendar, MessageCircle, 
  Link as LinkIcon, Check, ArrowRight, Tag, BookOpen 
} from 'lucide-react';
import { getPostBySlug, getRelatedPosts } from '../utils/blogEngine';

export default function BlogPostPage({ slug, onBack, onSelectPost, openQuoteModal, showToast }) {
  const post = useMemo(() => getPostBySlug(slug, true), [slug]);
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return getRelatedPosts(post.slug, post.categorySlug, 3);
  }, [post]);

  const htmlContent = useMemo(() => {
    if (!post || !post.content) return '';
    return marked.parse(post.content);
  }, [post]);

  if (!post) {
    return (
      <div className="container" style={{ padding: '140px 24px', textAlign: 'center' }}>
        <h2>Article Not Found</h2>
        <p style={{ color: '#4A5D54', marginTop: '12px' }}>This article may still be scheduled for publication.</p>
        <button onClick={onBack} className="btn btn-primary" style={{ marginTop: '24px' }}>
          <ArrowLeft size={16} /> Return to Blog
        </button>
      </div>
    );
  }

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article URL copied to clipboard!');
    }
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <div style={{ background: '#F8FAF8', minHeight: '100vh', paddingTop: '110px', paddingBottom: '96px' }}>
      {/* 1. BREADCRUMBS & TOP BAR */}
      <div className="container" style={{ maxWidth: '900px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <button 
            onClick={onBack}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E0E7E2',
              padding: '8px 18px',
              borderRadius: '9999px',
              color: '#0D4733',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <ArrowLeft size={16} color="#8CB974" /> Back to All Guides
          </button>

          <div style={{ fontSize: '0.85rem', color: '#4A5D54' }}>
            <span>Home</span> / <span>Blog</span> / <span style={{ color: '#0D4733', fontWeight: 600 }}>{post.category}</span>
          </div>
        </div>
      </div>

      {/* 2. ARTICLE HEADER */}
      <header className="container" style={{ maxWidth: '900px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
          <span style={{
            background: '#0D4733',
            color: '#8CB974',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            {post.category}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#4A5D54' }}>
            <Calendar size={14} color="#8CB974" /> {post.date}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#4A5D54' }}>
            <Clock size={14} color="#8CB974" /> {post.readTime}
          </span>
        </div>

        <h1 style={{ 
          fontSize: '2.6rem', 
          fontWeight: 800, 
          color: '#0D4733', 
          lineHeight: 1.25, 
          marginBottom: '20px',
          fontFamily: "'Montserrat', sans-serif"
        }}>
          {post.title}
        </h1>

        <p style={{ 
          fontSize: '1.2rem', 
          color: '#34453D', 
          lineHeight: 1.6, 
          marginBottom: '32px',
          borderLeft: '4px solid #8CB974',
          paddingLeft: '20px'
        }}>
          {post.excerpt}
        </p>

        {/* Author Details & Social Share Row */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          flexWrap: 'wrap', 
          gap: '20px',
          padding: '20px',
          background: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E0E7E2'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <span style={{ display: 'block', fontWeight: 800, color: '#0D4733', fontSize: '0.98rem' }}>
                {post.author.name}
              </span>
              <span style={{ fontSize: '0.82rem', color: '#4A5D54' }}>
                {post.author.role} • Grow Green South Africa
              </span>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#4A5D54', fontWeight: 600, marginRight: '4px' }}>Share:</span>
            <a 
              href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: '#25D366', color: '#FFFFFF', width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Share on WhatsApp"
            >
              <MessageCircle size={17} color="#FFFFFF" fill="#FFFFFF" />
            </a>
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: '#0077B5', color: '#FFFFFF', width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Share on LinkedIn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
              </svg>
            </a>
            <a 
              href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: '#000000', color: '#FFFFFF', width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Share on X"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <button
              onClick={handleCopyLink}
              style={{ background: '#E0E7E2', border: 'none', width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              title="Copy Link"
            >
              <LinkIcon size={16} color="#0D4733" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. COVER IMAGE */}
      <div className="container" style={{ maxWidth: '900px', marginBottom: '48px' }}>
        <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 16px 40px rgba(13,71,51,0.12)', maxHeight: '460px' }}>
          <img 
            src={post.coverImage} 
            alt={post.title}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* 4. MAIN ARTICLE BODY */}
      <main className="container" style={{ maxWidth: '900px' }}>
        <div 
          className="blog-prose-content"
          style={{
            background: '#FFFFFF',
            padding: '48px',
            borderRadius: '24px',
            border: '1px solid #E0E7E2',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            lineHeight: 1.8,
            fontSize: '1.05rem',
            color: '#1B2A23'
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginTop: '28px', padding: '16px', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E0E7E2' }}>
          <Tag size={16} color="#8CB974" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#4A5D54' }}>Tags:</span>
          {post.tags.map((tag) => (
            <span key={tag} style={{
              background: '#F4F7F4',
              color: '#0D4733',
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 600
            }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Bio Box */}
        <div style={{
          marginTop: '40px',
          background: 'linear-gradient(135deg, #0D4733 0%, #175C44 100%)',
          color: '#FFFFFF',
          borderRadius: '20px',
          padding: '36px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap'
        }}>
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #8CB974' }}
          />
          <div style={{ flex: 1, minWidth: '260px' }}>
            <span style={{ color: '#8CB974', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Article Author & Master Specialist
            </span>
            <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', margin: '4px 0 8px 0' }}>{post.author.name}</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.92rem', lineHeight: 1.5 }}>
              Senior architectural team leader at Grow Green (Pty) Ltd. Specializing in bespoke Johannesburg residential estates, indigenous nursery cultivation, and sustainable water management systems.
            </p>
          </div>
          <button 
            onClick={openQuoteModal}
            className="btn btn-primary"
            style={{ padding: '12px 24px', fontSize: '0.9rem' }}
          >
            Consult With {post.author.name.split(' ')[0]}
          </button>
        </div>

        {/* 5. RELATED ARTICLES */}
        {relatedPosts.length > 0 && (
          <div style={{ marginTop: '64px' }}>
            <h3 style={{ fontSize: '1.6rem', color: '#0D4733', fontWeight: 800, marginBottom: '24px' }}>
              Related Guides in {post.category}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
              {relatedPosts.map((rp) => (
                <div 
                  key={rp.slug}
                  onClick={() => onSelectPost(rp.slug)}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid #E0E7E2',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ height: '160px', overflow: 'hidden' }}>
                    <img 
                      src={rp.coverImage} 
                      alt={rp.title}
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ fontSize: '0.75rem', color: '#8CB974', fontWeight: 700, textTransform: 'uppercase' }}>
                      {rp.category}
                    </span>
                    <h4 style={{ fontSize: '1rem', color: '#0D4733', fontWeight: 700, margin: '8px 0 12px 0', lineHeight: 1.35 }}>
                      {rp.title}
                    </h4>
                    <span style={{ marginTop: 'auto', fontSize: '0.85rem', color: '#0D4733', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Read Guide <ArrowRight size={14} color="#8CB974" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
