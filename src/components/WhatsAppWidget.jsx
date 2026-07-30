import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppWidget() {
  const whatsappUrl = "https://wa.me/27615046752?text=Hello%20Grow%20Green!%20I'd%20like%20to%20inquire%20about%20your%20landscaping%20services%20and%20nursery%20plants.";

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="whatsapp-float-widget"
      aria-label="Chat with Cullen Hettema on WhatsApp"
    >
      <div className="whatsapp-icon-bg">
        <MessageCircle size={22} color="#FFFFFF" fill="#FFFFFF" />
      </div>
      <div className="whatsapp-widget-text">
        <span className="whatsapp-widget-title">Chat with Cullen</span>
        <span className="whatsapp-widget-sub">+27 61 504 6752</span>
      </div>
    </a>
  );
}
