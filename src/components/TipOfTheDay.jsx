import React, { useState } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';

export default function TipOfTheDay() {
  const tips = [
    {
      text: "Grow herbs like basil or thyme near your kitchen door for easy access during cooking.",
      author: "@growgreensa.com"
    },
    {
      text: "Water indigenous South African plants like Spekboom deeply once a week rather than light daily sprays.",
      author: "@growgreensa.com"
    },
    {
      text: "Mulch your garden beds with organic bark chips to conserve up to 70% of soil moisture in sunny weather.",
      author: "@growgreensa.com"
    },
    {
      text: "Place your King Proteas and Fynbos in well-draining, slightly acidic soil with plenty of fresh air circulation.",
      author: "@growgreensa.com"
    },
    {
      text: "Rotate potted indoor Monstera plants bi-weekly so all sides receive balanced natural window sunlight.",
      author: "@growgreensa.com"
    }
  ];

  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length);
  };

  const currentTip = tips[currentTipIndex];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #EBF3E8 0%, #F4F7F4 100%)',
      padding: '40px 18px',
      borderRadius: '24px',
      border: '1px solid rgba(140, 185, 116, 0.3)',
      boxShadow: '0 16px 40px rgba(13, 71, 51, 0.08)',
      maxWidth: '480px',
      width: '100%',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Organic Circles */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '160px',
        height: '160px',
        borderRadius: '50%',
        border: '2px solid rgba(13, 71, 51, 0.15)',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-40px',
        left: '-40px',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        border: '2px solid rgba(13, 71, 51, 0.15)',
        pointerEvents: 'none'
      }}></div>

      {/* Top Emblem Logo */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src="/images/logo_v2.png" 
          alt="Grow Green Emblem" 
          style={{ height: '96px', width: '96px', objectFit: 'contain', background: '#FFFFFF', padding: '6px', borderRadius: '50%', boxShadow: '0 8px 24px rgba(13,71,51,0.12)' }} 
        />
      </div>

      {/* Header Title */}
      <h2 style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '1.8rem',
        fontWeight: 800,
        letterSpacing: '3px',
        color: '#0D4733',
        textTransform: 'uppercase',
        marginBottom: '28px'
      }}>
        TIP OF THE DAY
      </h2>

      {/* Rounded Dark Green Card */}
      <div style={{
        background: '#0D4733',
        color: '#FFFFFF',
        borderRadius: '24px',
        padding: '40px 28px 24px 28px',
        position: 'relative',
        boxShadow: '0 12px 32px rgba(13, 71, 51, 0.25)'
      }}>
        {/* Lightbulb Badge Icon */}
        <div style={{
          position: 'absolute',
          top: '-22px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: '#0D4733',
          border: '2px solid #8CB974',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
          <Lightbulb size={22} color="#FFFFFF" />
        </div>

        {/* Tip Content */}
        <p style={{
          fontSize: '1.15rem',
          lineHeight: 1.6,
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 400,
          marginBottom: '24px',
          color: '#FFFFFF'
        }}>
          "{currentTip.text}"
        </p>

        {/* Branding Subtitle */}
        <span style={{
          display: 'block',
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '0.9rem',
          color: '#8CB974',
          fontFamily: "'Montserrat', sans-serif"
        }}>
          {currentTip.author}
        </span>
      </div>

      {/* Next Tip Interactive Button */}
      <button 
        onClick={nextTip}
        style={{
          marginTop: '24px',
          background: '#FFFFFF',
          border: '1.5px solid #0D4733',
          color: '#0D4733',
          padding: '10px 20px',
          borderRadius: '30px',
          fontWeight: 600,
          fontSize: '0.85rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <RefreshCw size={14} /> Next Botanical Tip
      </button>
    </div>
  );
}
