import React, { useState, useMemo, useEffect } from 'react';
import { Search, TrendingDown, ShoppingCart, Percent, Tag, Calendar, RefreshCw } from 'lucide-react';
import './index.css';

// Henter data fra GitHub
const GITHUB_USERNAME = "einarvagmo"; // ← ENDRE DETTE TIL DITT BRUKERNAVN!
const REPO_NAME = "tilbudsjakt";

function getWeekNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.ceil(diff / oneWeek);
}

const OfferCard = ({ offer, index }) => {
  const savings = offer.price_before ? offer.price_before - offer.price : 0;
  
  return (
    <div 
      className="offer-card"
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      <div className="card-header">
        <div className="category-tag">
          <Tag size={12} />
          {offer.store || 'Kiwi'}
        </div>
        {offer.discount && (
          <div className="discount-badge">
            <Percent size={12} />
            {offer.discount}%
          </div>
        )}
      </div>
      
      <h3 className="product-name">{offer.product}</h3>
      <p className="product-size">{offer.size}</p>
      
      <div className="price-row">
        <div className="price-main">
          <span className="price-amount">{offer.price.toFixed(2)}</span>
          <span className="currency">kr</span>
        </div>
        
        {offer.price_before && (
          <div className="price-old">
            {offer.price_before.toFixed(2)} kr
          </div>
        )}
      </div>
      
      {savings > 0 && (
        <div className="savings-tag">
          <TrendingDown size={12} />
          Spar {savings.toFixed(2)} kr
        </div>
      )}
    </div>
  );
};

export default function TilbudsjaktApp() {
  const [tilbud, setTilbud] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('discount');
  const [currentWeek, setCurrentWeek] = useState(getWeekNumber());
  
  // Hent data fra GitHub
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const url = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/data/tilbud_uke_${currentWeek}.json`;
        
        console.log('Henter fra:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Finner ikke data for uke ${currentWeek}`);
        }
        
        const data = await response.json();
        
        console.log('Hentet data:', data);
        
        setTilbud(data.tilbud || []);
        setLoading(false);
      } catch (err) {
        console.error('Feil:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [currentWeek]);
  
  const filteredOffers = useMemo(() => {
    let filtered = tilbud.filter(offer => 
      offer.product?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.size?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    filtered.sort((a, b) => {
      if (sortBy === 'discount') {
        return (b.discount || 0) - (a.discount || 0);
      } else if (sortBy === 'price') {
        return a.price - b.price;
      } else if (sortBy === 'savings') {
        const savingsA = a.price_before ? a.price_before - a.price : 0;
        const savingsB = b.price_before ? b.price_before - b.price : 0;
        return savingsB - savingsA;
      }
      return 0;
    });
    
    return filtered;
  }, [tilbud, searchQuery, sortBy]);
  
  const totalSavings = useMemo(() => {
    return tilbud.reduce((sum, offer) => {
      return sum + (offer.price_before ? offer.price_before - offer.price : 0);
    }, 0);
  }, [tilbud]);
  
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">
          <RefreshCw size={48} className="spin" />
          <p>Henter tilbud for uke {currentWeek}...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-screen">
        <div className="error-message">
          <h2>Kunne ikke hente tilbud</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Prøv igjen
          </button>
          <p className="help-text">
            Sjekk at GitHub-brukernavnet er riktig i koden:<br/>
            <code>{GITHUB_USERNAME}/{REPO_NAME}</code>
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <div className="logo-icon">
            <ShoppingCart size={24} />
          </div>
          <h1>Tilbudsjakt</h1>
        </div>
        <p className="tagline">Finn de beste matvaretilbudene – raskt og enkelt</p>
        <div className="stats-bar">
          <div className="stat">
            <Calendar size={16} />
            <span className="stat-value">Uke {currentWeek}</span>
          </div>
          <div className="stat">
            <span className="stat-value">{tilbud.length}</span>
            <span>tilbud</span>
          </div>
          <div className="stat">
            <span className="stat-value">{totalSavings.toFixed(0)} kr</span>
            <span>total besparelse</span>
          </div>
        </div>
      </header>
      
      <div className="controls">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Søk etter produkter... (f.eks. 'kaffe', 'ost', 'pizza')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="sort-buttons">
          <button
            className={`sort-button ${sortBy === 'discount' ? 'active' : ''}`}
            onClick={() => setSortBy('discount')}
          >
            Høyest rabatt
          </button>
          <button
            className={`sort-button ${sortBy === 'savings' ? 'active' : ''}`}
            onClick={() => setSortBy('savings')}
          >
            Størst besparelse
          </button>
          <button
            className={`sort-button ${sortBy === 'price' ? 'active' : ''}`}
            onClick={() => setSortBy('price')}
          >
            Lavest pris
          </button>
        </div>
      </div>
      
      {filteredOffers.length > 0 ? (
        <div className="offers-grid">
          {filteredOffers.map((offer, index) => (
            <OfferCard 
              key={`${offer.product}-${index}`} 
              offer={offer} 
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <div className="no-results-icon">
            <Search size={40} />
          </div>
          <h3>Ingen tilbud funnet</h3>
          <p>Prøv et annet søkeord eller sjekk stavingen</p>
        </div>
      )}
      
      <footer className="footer">
        <p>Data oppdateres automatisk hver mandag morgen 🔄</p>
        <p className="small">Laget med ❤️ av deg</p>
      </footer>
    </div>
  );
}
