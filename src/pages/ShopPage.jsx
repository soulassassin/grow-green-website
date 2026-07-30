import React, { useState, useMemo } from 'react';
import { plantsData, plantCategories, sunExposures, careLevels } from '../data/plantsData';
import { Search, Filter, ShoppingBag, Eye, Download, Code, CheckCircle, Sun, Droplets } from 'lucide-react';

export default function ShopPage({ addToCart, showToast }) {
  const [selectedCategory, setSelectedCategory] = useState("All Plants");
  const [selectedSun, setSelectedSun] = useState("All");
  const [selectedCare, setSelectedCare] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSchemaModal, setShowSchemaModal] = useState(false);

  // Filtering Logic
  const filteredPlants = useMemo(() => {
    return plantsData.filter((plant) => {
      const matchCat = selectedCategory === "All Plants" || plant.category === selectedCategory;
      const matchSun = selectedSun === "All" || plant.sunExposure === selectedSun;
      const matchCare = selectedCare === "All" || plant.careLevel === selectedCare;
      const matchSearch = 
        plant.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchSun && matchCare && matchSearch;
    });
  }, [selectedCategory, selectedSun, selectedCare, searchQuery]);

  // Google Shopping Schema.org Generator (JSON-LD)
  const generateProductSchema = (plant) => {
    return {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": plant.commonName,
      "image": [plant.image],
      "description": plant.description,
      "sku": plant.sku,
      "gtin13": plant.gtin,
      "brand": {
        "@type": "Brand",
        "name": "Grow Green"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://growgreensa.com/shop#${plant.sku}`,
        "priceCurrency": "ZAR",
        "price": plant.priceZAR,
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": plant.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "Grow Green South Africa",
          "telephone": "+27 61 504 6752",
          "email": "cullen@growgreensa.com"
        }
      }
    };
  };

  // Export Merchant Center JSON Feed
  const exportGoogleShoppingFeed = () => {
    const feedItems = plantsData.map((p) => ({
      id: p.sku,
      title: `${p.commonName} (${p.scientificName})`,
      description: p.description,
      link: `https://growgreensa.com/shop#${p.sku}`,
      image_link: `https://growgreensa.com${p.image}`,
      availability: p.inStock ? "in stock" : "out of stock",
      price: `${p.priceZAR}.00 ZAR`,
      brand: "Grow Green",
      gtin: p.gtin,
      condition: "new",
      shipping: {
        country: "ZA",
        service: "Standard Nursery Courier",
        price: "150.00 ZAR"
      }
    }));

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(feedItems, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", "grow_green_google_merchant_feed.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Google Merchant Center feed JSON exported successfully!");
  };

  return (
    <div style={{ paddingTop: '100px' }}>
      {/* Header Banner */}
      <section style={{ background: '#0D4733', color: '#FFFFFF', padding: '50px 0 36px 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <span style={{ color: '#8CB974', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.82rem' }}>
              Online Nursery Catalog
            </span>
            <h1 style={{ color: '#FFFFFF', fontSize: '2.4rem', marginTop: '4px', fontFamily: "'Montserrat', sans-serif" }}>Shop South African Plants</h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.98rem', marginTop: '4px' }}>
              Pre-populated nursery collection featuring 30 healthy, indigenous & exotic specimens.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="btn btn-accent"
              onClick={exportGoogleShoppingFeed}
              style={{ fontSize: '0.88rem' }}
            >
              <Download size={16} /> Export Google Merchant Feed
            </button>
          </div>
        </div>
      </section>

      {/* Main Catalog Area */}
      <section className="section-padding" style={{ background: '#F4F7F4' }}>
        <div className="container">
          
          {/* Filter Bar */}
          <div className="product-filter-bar">
            {/* Search Box */}
            <div className="search-box">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search plants by common or botanical name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sun & Care Dropdowns */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', width: '100%', maxWidth: '400px' }}>
              <select 
                className="form-select"
                style={{ flex: 1, minWidth: '140px', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem' }}
                value={selectedSun}
                onChange={(e) => setSelectedSun(e.target.value)}
              >
                <option value="All">Sunlight: All</option>
                {sunExposures.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              <select 
                className="form-select"
                style={{ flex: 1, minWidth: '140px', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem' }}
                value={selectedCare}
                onChange={(e) => setSelectedCare(e.target.value)}
              >
                <option value="All">Care Level: All</option>
                {careLevels.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Touch-Scrollable Category Tabs */}
          <div className="filter-pills-scrollable" style={{ marginBottom: '28px' }}>
            {plantCategories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.92rem', color: '#4A5D54', fontWeight: 600 }}>
              Showing {filteredPlants.length} of {plantsData.length} Plants
            </span>
          </div>

          {/* Product Grid */}
          <div className="products-grid">
            {filteredPlants.map((plant) => (
              <div className="product-card" key={plant.id} id={plant.sku}>
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

                  {/* Quick View Button */}
                  <button 
                    onClick={() => setSelectedProduct(plant)}
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      cursor: 'pointer'
                    }}
                    title="Quick View & Google Schema"
                  >
                    <Eye size={18} color="#0D4733" />
                  </button>
                </div>

                <div className="product-details">
                  <span className="product-category">{plant.category}</span>
                  <h3 className="product-name">{plant.commonName}</h3>
                  <p className="product-scientific">{plant.scientificName}</p>

                  <div className="product-price-row">
                    <div>
                      <span className="product-price">{plant.formattedPrice}</span>
                      <span style={{ display: 'block', fontSize: '0.72rem', color: '#4A5D54' }}>SKU: {plant.sku}</span>
                    </div>

                    <button 
                      className="btn-add-cart"
                      onClick={() => {
                        addToCart(plant);
                        showToast(`Added ${plant.commonName} to cart!`);
                      }}
                    >
                      <ShoppingBag size={14} /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPlants.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E0E7E2' }}>
              <h3 style={{ color: '#0D4733', marginBottom: '8px' }}>No plants match your filter selection</h3>
              <p style={{ color: '#4A5D54' }}>Try clearing your search query or selecting "All Plants".</p>
              <button 
                className="btn btn-outline" 
                style={{ marginTop: '20px' }}
                onClick={() => {
                  setSelectedCategory("All Plants");
                  setSelectedSun("All");
                  setSelectedCare("All");
                  setSearchQuery("");
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail & Schema Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px' }}>
            <button className="close-modal-btn" onClick={() => setSelectedProduct(null)}>
              <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>✕</span>
            </button>

            <div className="responsive-grid-2" style={{ gap: '24px', marginBottom: '24px' }}>
              <div>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.commonName} 
                  style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '16px' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/plant_strelitzia.jpg';
                  }}
                />
              </div>

              <div>
                <span className="product-category">{selectedProduct.category}</span>
                <h2 style={{ fontSize: '1.6rem', color: '#0D4733', marginBottom: '4px', fontFamily: "'Montserrat', sans-serif" }}>{selectedProduct.commonName}</h2>
                <p style={{ fontStyle: 'normal', fontWeight: 500, color: '#4A5D54', marginBottom: '16px' }}>{selectedProduct.scientificName}</p>

                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0D4733', marginBottom: '16px' }}>
                  {selectedProduct.formattedPrice}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', fontSize: '0.85rem' }}>
                  <span><strong>Sunlight:</strong> {selectedProduct.sunExposure}</span>
                  <span><strong>Watering:</strong> {selectedProduct.waterNeed}</span>
                  <span><strong>Care Level:</strong> {selectedProduct.careLevel}</span>
                  <span><strong>GTIN Barcode:</strong> {selectedProduct.gtin}</span>
                </div>

                <button 
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => {
                    addToCart(selectedProduct);
                    showToast(`Added ${selectedProduct.commonName} to cart!`);
                    setSelectedProduct(null);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <p style={{ color: '#4A5D54', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '20px' }}>
              {selectedProduct.description}
            </p>

            {/* Schema.org Inspector Toggle */}
            <div style={{ background: '#F4F7F4', padding: '16px', borderRadius: '12px', border: '1px solid #E0E7E2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0D4733', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Code size={16} /> Schema.org JSON-LD (Google Shopping Ready)
                </span>
                <button 
                  onClick={() => setShowSchemaModal(!showSchemaModal)}
                  style={{ background: 'none', border: 'none', color: '#8CB974', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  {showSchemaModal ? 'Hide Code' : 'Inspect JSON-LD'}
                </button>
              </div>

              {showSchemaModal && (
                <pre style={{ background: '#1B2A23', color: '#8CB974', padding: '12px', borderRadius: '8px', fontSize: '0.75rem', overflowX: 'auto', maxHeight: '180px' }}>
                  {JSON.stringify(generateProductSchema(selectedProduct), null, 2)}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
