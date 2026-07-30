import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import CartDrawer from './components/CartDrawer';
import QuoteModal from './components/QuoteModal';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

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
        setActivePage={setActivePage}
        cartCount={totalCartItemsCount}
        openCart={() => setIsCartOpen(true)}
        openQuoteModal={() => setIsQuoteModalOpen(true)}
      />

      {/* Main Page View Router */}
      <main style={{ flex: 1 }}>
        {activePage === 'home' && (
          <HomePage 
            setActivePage={setActivePage}
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

        {activePage === 'contact' && (
          <ContactPage 
            showToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActivePage={setActivePage} />

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

      {/* Quote Request Modal */}
      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        showToast={showToast}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="toast-container">
          <span>🌿</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
