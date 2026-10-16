import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import CartDrawer from './components/CartDrawer';
import QuoteModal from './components/QuoteModal';
import ErrorBoundary from './components/ErrorBoundary';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import { getPostBySlug } from './utils/blogEngine';

const parsePath = () => {
  if (typeof window === 'undefined') return { page: 'home', slug: null };
  const raw = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
  if (raw === 'blog') return { page: 'blog', slug: null };
  if (raw.startsWith('blog/')) {
    const slug = raw.substring(5);
    return { page: 'blog-post', slug };
  }
  const valid = ['services', 'about', 'shop', 'contact'];
  if (valid.includes(raw)) return { page: raw, slug: null };
  return { page: 'home', slug: null };
};

export default function App() {
  const initial = parsePath();
  const [activePage, setActivePage] = useState(initial.page);
  const [activeBlogSlug, setActiveBlogSlug] = useState(initial.slug);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync route with browser history
  const handleSetActivePage = (page) => {
    setActivePage(page);
    setActiveBlogSlug(null);
    const targetPath = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page, slug: null }, '', targetPath);
    }
  };

  const handleSelectBlogPost = (slug) => {
    setActivePage('blog-post');
    setActiveBlogSlug(slug);
    const targetPath = `/blog/${slug}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page: 'blog-post', slug }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen for browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const { page, slug } = parsePath();
      setActivePage(page);
      setActiveBlogSlug(slug);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update dynamic page title for Google Search Console and SEO
  useEffect(() => {
    const pageTitles = {
      home: "Grow Green | Premium Landscaping & Nursery South Africa",
      services: "Landscaping & Nursery Services | Grow Green South Africa",
      about: "About Us & Leadership | Grow Green South Africa",
      shop: "Shop Indigenous & Exotic Plants | Grow Green Nursery",
      contact: "Contact & Free Quote | Grow Green Johannesburg",
      blog: "Landscaping & Outdoor Living Blog | Grow Green South Africa"
    };

    if (activePage === 'blog-post' && activeBlogSlug) {
      const post = getPostBySlug(activeBlogSlug, true);
      document.title = post ? `${post.title} | Grow Green Blog` : "Blog Guide | Grow Green";
    } else if (pageTitles[activePage]) {
      document.title = pageTitles[activePage];
    }
  }, [activePage, activeBlogSlug]);

  // Load cart from localStorage if exists
  useEffect(() => {
    const saved = localStorage.getItem('grow_green_cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('grow_green_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeItem(productId);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const removeItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const totalCartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Glass Navbar */}
      <Navbar 
        activePage={activePage} 
        setActivePage={handleSetActivePage}
        cartCount={totalCartItemsCount}
        openCart={() => setIsCartOpen(true)}
        openQuoteModal={() => setIsQuoteModalOpen(true)}
      />

      {/* Main Page View Router */}
      <main style={{ flex: 1 }}>
        <ErrorBoundary>
          {activePage === 'home' && (
            <HomePage 
              setActivePage={handleSetActivePage}
              openQuoteModal={() => setIsQuoteModalOpen(true)}
              addToCart={addToCart}
              showToast={showToast}
            />
          )}

          {activePage === 'services' && (
            <ServicesPage 
              openQuoteModal={() => setIsQuoteModalOpen(true)}
            />
          )}

          {activePage === 'about' && (
            <AboutPage 
              openQuoteModal={() => setIsQuoteModalOpen(true)}
            />
          )}

          {activePage === 'shop' && (
            <ShopPage 
              addToCart={addToCart}
              showToast={showToast}
            />
          )}

          {activePage === 'blog' && (
            <BlogPage 
              onSelectPost={handleSelectBlogPost}
              openQuoteModal={() => setIsQuoteModalOpen(true)}
            />
          )}

          {activePage === 'blog-post' && (
            <BlogPostPage 
              slug={activeBlogSlug}
              onBack={() => handleSetActivePage('blog')}
              onSelectPost={handleSelectBlogPost}
              openQuoteModal={() => setIsQuoteModalOpen(true)}
              showToast={showToast}
            />
          )}

          {activePage === 'contact' && (
            <ContactPage 
              showToast={showToast}
            />
          )}
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <Footer setActivePage={handleSetActivePage} />

      {/* Sticky Floating WhatsApp Action Widget */}
      <WhatsAppWidget />

      {/* Slide-over Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        clearCart={clearCart}
      />

      {/* Quote & Consultation Modal */}
      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        showToast={showToast}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
