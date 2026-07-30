import React from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, updateQuantity, removeItem, clearCart }) {
  if (!isOpen) return null;

  const totalZAR = cart.reduce((sum, item) => sum + item.priceZAR * item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    
    let message = "Hello Grow Green! I would like to place an order for the following nursery items:\n\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.commonName} (${item.scientificName}) - Qty: ${item.quantity} x R${item.priceZAR} = R${item.priceZAR * item.quantity}\n`;
    });
    message += `\n*Total Order Amount: R${totalZAR.toLocaleString()}*\n\nPlease confirm availability and delivery details.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/27615046752?text=${encoded}`, '_blank');
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} color="#0D4733" />
            <h3 style={{ fontSize: '1.2rem', color: '#0D4733' }}>Your Shopping Basket</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={24} color="#1B2A23" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="cart-body">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#4A5D54' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F4F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <ShoppingBag size={32} color="#8CB974" />
              </div>
              <h4 style={{ color: '#0D4733', marginBottom: '8px' }}>Your basket is empty</h4>
              <p style={{ fontSize: '0.9rem' }}>Explore our nursery shop catalog and add indigenous plants, succulents, and fruit trees.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.commonName} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4 style={{ fontSize: '0.98rem', color: '#0D4733', marginBottom: '2px' }}>{item.commonName}</h4>
                  <p style={{ fontSize: '0.8rem', fontStyle: 'normal', fontWeight: 500, color: '#4A5D54', marginBottom: '8px' }}>{item.scientificName}</p>
                  <span style={{ fontWeight: 700, color: '#0D4733', fontSize: '0.95rem' }}>
                    R {(item.priceZAR * item.quantity).toLocaleString()}
                  </span>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E0E7E2', borderRadius: '20px', overflow: 'hidden' }}>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ padding: '4px 8px', background: '#F4F7F4', border: 'none' }}
                      >
                        <Minus size={12} color="#0D4733" />
                      </button>
                      <span style={{ padding: '0 10px', fontSize: '0.85rem', fontWeight: 600 }}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ padding: '4px 8px', background: '#F4F7F4', border: 'none' }}
                      >
                        <Plus size={12} color="#0D4733" />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id)}
                      style={{ background: 'none', border: 'none', color: '#D9534F', cursor: 'pointer' }}
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span>Subtotal:</span>
              <span>R {totalZAR.toLocaleString()}.00</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#4A5D54', marginBottom: '16px', textAlign: 'center' }}>
              Free plant care advice & localized SA delivery quotes included.
            </p>

            <button 
              className="btn" 
              onClick={handleWhatsAppCheckout}
              style={{ width: '100%', background: '#25D366', color: '#FFFFFF', fontSize: '1rem', padding: '14px' }}
            >
              <MessageCircle size={20} fill="#FFFFFF" color="#FFFFFF" />
              Order via WhatsApp (+27 61 504 6752)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
