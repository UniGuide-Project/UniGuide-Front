import { useState, useEffect } from 'react'
import './univerlar.scss'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://uniguide.myjad.uz/api/v1';

// Mapping Django location codes to beautiful localized strings
const locationLabels = {
  uz: {
    tashkent_city: 'Toshkent shahri',
    tashkent: 'Toshkent viloyati',
    andijan: 'Andijon viloyati',
    bukhara: 'Buxoro viloyati',
    fergana: "Farg'ona viloyati",
    jizzakh: 'Jizzax viloyati',
    khorezm: 'Xorazm viloyati',
    namangan: 'Namangan viloyati',
    navoiy: 'Navoiy viloyati',
    kashkadarya: 'Qashqadaryo viloyati',
    surkhandarya: 'Surxondaryo viloyati',
    sirdarya: 'Sirdaryo viloyati',
    samarkand: 'Samarqand viloyati',
    karakalpakstan: "Qoraqalpog'iston Res."
  },
  en: {
    tashkent_city: 'Tashkent City',
    tashkent: 'Tashkent Region',
    andijan: 'Andijan Region',
    bukhara: 'Bukhara Region',
    fergana: 'Fergana Region',
    jizzakh: 'Jizzakh Region',
    khorezm: 'Khorezm Region',
    namangan: 'Namangan Region',
    navoiy: 'Navoiy Region',
    kashkadarya: 'Kashkadarya Region',
    surkhandarya: 'Surxondaryo Region',
    sirdarya: 'Sirdarya Region',
    samarkand: 'Samarkand Region',
    karakalpakstan: 'Karakalpakstan Rep.'
  },
  ru: {
    tashkent_city: 'г. Ташкент',
    tashkent: 'Ташкентская область',
    andijan: 'Андижанская область',
    bukhara: 'Бухарская область',
    fergana: 'Ферганская область',
    jizzakh: 'Джизакская область',
    khorezm: 'Хорезмская область',
    namangan: 'Наманганская область',
    navoiy: 'Навоийская область',
    kashkadarya: 'Кашкадарьинская область',
    surkhandarya: 'Сурхандарьинская область',
    sirdarya: 'Сырдарьинская область',
    samarkand: 'Самаркандская область',
    karakalpakstan: 'Респ. Каракалпакстан'
  }
};



// Consistent premium visual assets fallbacks
const getFallbackImage = (uni) => {
  if (uni.img) {
    if (uni.img.startsWith('http://') || uni.img.startsWith('https://')) {
      return uni.img;
    }
    // Clean potential double slashes
    const baseUrl = API_BASE.replace('/api/v1', '');
    const cleanImg = uni.img.startsWith('/') ? uni.img : `/${uni.img}`;
    return `${baseUrl}${cleanImg}`;
  }
  
  const fallbacks = ['/stanford.png', '/eth.png', '/oxford.png'];
  const index = typeof uni.id === 'number' ? uni.id % fallbacks.length : (uni.id?.charCodeAt(0) || 0) % fallbacks.length;
  return fallbacks[index];
};

// Formatting contract amounts to standard representation
const formatCurrency = (amount, lang) => {
  if (!amount || amount === 0) return lang === 'uz' ? 'Mavjud emas' : lang === 'ru' ? 'Нет данных' : 'N/A';
  
  const formatted = new Intl.NumberFormat('uz-UZ').format(amount);
  if (lang === 'uz') return `${formatted} so'm`;
  if (lang === 'ru') return `${formatted} сум`;
  return `${formatted} UZS`;
};

// Automatic layout category tagger based on faculty name keywords
const getFacultyIconType = (name) => {
  const lower = name.toLowerCase();
  if (
    lower.includes('kompyuter') || 
    lower.includes('computer') || 
    lower.includes('it') || 
    lower.includes('dastur') || 
    lower.includes('software') || 
    lower.includes('intellekt') || 
    lower.includes('cyber') || 
    lower.includes('kiber') || 
    lower.includes('axborot') || 
    lower.includes('inform')
  ) {
    return 'computer';
  }
  if (
    lower.includes('muhandis') || 
    lower.includes('engineer') || 
    lower.includes('texnika') || 
    lower.includes('mashina') || 
    lower.includes('energetika') || 
    lower.includes('fizika') || 
    lower.includes('physics') ||
    lower.includes('astronomiya')
  ) {
    return 'engineering';
  }
  if (
    lower.includes('tibbiyot') || 
    lower.includes('medicine') || 
    lower.includes('shifokor') || 
    lower.includes('farm') || 
    lower.includes('biolog') ||
    lower.includes('kimyo') ||
    lower.includes('chem')
  ) {
    return 'medicine';
  }
  if (
    lower.includes('tarix') || 
    lower.includes('history') || 
    lower.includes('filolog') || 
    lower.includes('tillar') || 
    lower.includes('falsafa') || 
    lower.includes('humanities') || 
    lower.includes('business') || 
    lower.includes('biznes') || 
    lower.includes('econom') || 
    lower.includes('iqtisod') ||
    lower.includes('moliy') ||
    lower.includes('financ')
  ) {
    return 'humanities';
  }
  return 'default';
};

const renderFacultyIcon = (iconType) => {
  switch (iconType) {
    case 'computer':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    case 'engineering':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    case 'medicine':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="6" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      )
    case 'humanities':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      )
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      )
  }
}

function Univerlar({ lang, activeText }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [universities, setUniversities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [activeUniversityId, setActiveUniversityId] = useState(null)
  const [activeUniDetails, setActiveUniDetails] = useState(null)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [detailTab, setDetailTab] = useState('description') // 'description' or 'faculties'
  const [expandedFaculties, setExpandedFaculties] = useState({})

  const currentText = activeText;

  // Fetch universities from the API with search query
  const fetchUniversities = async (search = '') => {
    setIsLoading(true)
    setError(null)
    try {
      const url = search ? `${API_BASE}/universities/?search=${encodeURIComponent(search)}` : `${API_BASE}/universities/`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('API server returned failure status');
      }
      const data = await response.json();
      setUniversities(data);
    } catch (err) {
      console.error('Error loading universities:', err);
      setError(currentText.uniLoadError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchUniversities(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, searchQuery]);

  // Fetch details of selected university (with faculties list)
  useEffect(() => {
    if (!activeUniversityId) return;

    const fetchDetails = async () => {
      setIsLoadingDetails(true);
      try {
        const response = await fetch(`${API_BASE}/universities/${activeUniversityId}/`);
        if (!response.ok) {
          throw new Error('Details loading failed');
        }
        const data = await response.json();
        setActiveUniDetails(data);
      } catch (err) {
        console.error('Error fetching university details:', err);
      } finally {
        setIsLoadingDetails(false);
      }
    };

    fetchDetails();
  }, [activeUniversityId]);

  // If detailed university is loading, render a premium loading layout
  if (activeUniversityId && (isLoadingDetails || !activeUniDetails)) {
    return (
      <section className="univerlar-section uni-detail-mode" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: '16px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(187, 225, 250, 0.1)',
          borderTopColor: 'var(--light-blue)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ color: 'var(--on-surface-variant)', fontSize: '14px', fontWeight: 600 }}>{currentText.uniLoadingText}</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </section>
    );
  }

  // If detailed university is selected, render premium detail layout
  if (activeUniversityId && activeUniDetails) {
    const activeUni = activeUniDetails;
    const localizedLoc = locationLabels[lang]?.[activeUni.location] || activeUni.location || '';
    const activeUniTypeLabel = activeUni.university_type === 'state' ? currentText.uniStateType : currentText.uniPrivateType;

    return (
      <section className="univerlar-section uni-detail-mode">
        {/* Back navigation header */}
        <div className="back-nav">
          <button
            className="back-btn"
            onClick={() => {
              setActiveUniversityId(null)
              setActiveUniDetails(null)
              setDetailTab('description')
              setExpandedFaculties({})
            }}
            aria-label={currentText.uniBackToList}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>{currentText.uniBackToList}</span>
          </button>
        </div>

        {/* Hero Banner Grid */}
        <div className="uni-detail-hero">
          <img src={getFallbackImage(activeUni)} alt={activeUni.name} className="detail-hero-img" />
          <div className="detail-hero-overlay"></div>
          <div className="detail-hero-content">
            <h1 className="detail-title">{activeUni.name}</h1>
          </div>
        </div>

        {/* Details Navigation Tabs */}
        <div className="detail-tabs-row" role="tablist">
          <button
            role="tab"
            aria-selected={detailTab === 'description'}
            className={`tab-link ${detailTab === 'description' ? 'active' : ''}`}
            onClick={() => setDetailTab('description')}
          >
            {currentText.uniTabDescription}
          </button>
          <button
            role="tab"
            aria-selected={detailTab === 'faculties'}
            className={`tab-link ${detailTab === 'faculties' ? 'active' : ''}`}
            onClick={() => setDetailTab('faculties')}
          >
            {currentText.uniTabFaculties}
          </button>
        </div>

        {/* Details Content Panels */}
        <div className="detail-content-pane">
          {detailTab === 'description' ? (
            <div className="detail-description-pane">
              <p className="full-desc">{activeUni.description || activeUni.name}</p>

              {/* Grid of 2x2 key statistical indicators */}
              <div className="uni-stats-grid">
                <div className="uni-stat-card">
                  <span className="stat-value">{activeUniTypeLabel}</span>
                  <span className="stat-label">{currentText.uniTypeLabel}</span>
                </div>
                <div className="uni-stat-card">
                  <span className="stat-value">{activeUni.rating ? `${activeUni.rating} / 100` : 'N/A'}</span>
                  <span className="stat-label">{currentText.uniRatingLabel}</span>
                </div>
                <div className="uni-stat-card">
                  <span className="stat-value" style={{ fontSize: '16px', fontWeight: 800 }}>
                    {formatCurrency(activeUni.min_contract, lang)}
                  </span>
                  <span className="stat-label">{currentText.uniMinContractLabel}</span>
                </div>
                <div className="uni-stat-card">
                  <span className="stat-value" style={{ fontSize: '16px', fontWeight: 800 }}>
                    {formatCurrency(activeUni.max_contract, lang)}
                  </span>
                  <span className="stat-label">{currentText.uniMaxContractLabel}</span>
                </div>
              </div>

              {/* Website glassmorphic CTA */}
              {activeUni.website && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                  <a
                    href={activeUni.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="filter-btn"
                    style={{ textDecoration: 'none', height: 'auto', padding: '14px 28px', borderRadius: '12px' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '8px' }}>
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <span>{currentText.uniVisitWebsite}</span>
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="detail-faculties-pane">
              {activeUni.faculties && activeUni.faculties.map((fac) => {
                const isExpanded = !!expandedFaculties[fac.id]
                const iconType = getFacultyIconType(fac.name)
                
                return (
                  <div key={fac.id} className={`faculty-accordion-card ${isExpanded ? 'expanded' : ''}`}>
                    {/* Accordion Trigger Header */}
                    <div
                      className="faculty-header"
                      role="button"
                      aria-expanded={isExpanded}
                      onClick={() => {
                        setExpandedFaculties((prev) => ({
                          ...prev,
                          [fac.id]: !prev[fac.id]
                        }))
                      }}
                    >
                      <div className="faculty-header-left">
                        <div className="faculty-icon-container">
                          {renderFacultyIcon(iconType)}
                        </div>
                        <div className="faculty-header-text">
                          <h4>{fac.name}</h4>
                          <span className="faculty-subtitle">{localizedLoc.toUpperCase()}</span>
                        </div>
                      </div>

                      <button
                        className="accordion-toggle-btn"
                        aria-label={`Toggle ${fac.name}`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            transform: isExpanded ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                          }}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                    </div>

                    {/* Collapsible content panel */}
                    <div className={`faculty-panel ${isExpanded ? 'open' : ''}`}>
                      <div className="faculty-panel-content">
                        
                        {/* DTM score subcards */}
                        <div className="faculty-stats-row">
                          <div className="faculty-stat-subcard" style={{ borderLeft: '3px solid #4caf50' }}>
                            <span className="subcard-label" style={{ color: '#81c784' }}>{currentText.uniGrantScoreLabel}</span>
                            <span className="subcard-val" style={{ fontSize: '20px', fontWeight: 800 }}>
                              {fac.grant_score && fac.grant_score > 0 ? `${fac.grant_score} ball` : currentText.uniScoreNotAvailable}
                            </span>
                          </div>
                          <div className="faculty-stat-subcard" style={{ borderLeft: '3px solid #2196f3' }}>
                            <span className="subcard-label" style={{ color: '#64b5f6' }}>{currentText.uniContractScoreLabel}</span>
                            <span className="subcard-val" style={{ fontSize: '20px', fontWeight: 800 }}>
                              {fac.min_score && fac.min_score > 0 ? `${fac.min_score} ball` : currentText.uniScoreNotAvailable}
                            </span>
                          </div>
                        </div>

                        {/* Faculty descriptions block */}
                        {fac.description && (
                          <div className="faculty-research-block">
                            <span className="research-title">{currentText.uniTabDescription.toUpperCase()}</span>
                            <p className="research-text">{fac.description}</p>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                )
              })}

              {(!activeUni.faculties || activeUni.faculties.length === 0) && (
                <p style={{ margin: '24px 0', fontSize: '14px', color: 'var(--on-surface-variant)', textAlign: 'center' }}>
                  {currentText.uniNoResults}
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="univerlar-section" id="universities">
      
      {/* Dynamic Header Block */}
      <div className="uni-header">
        <div className="intelligence-pill">
          <span>⚡ {currentText.uniTag}</span>
        </div>
        <h2>{currentText.uniTitle}</h2>
        <p>{currentText.uniSubtitle}</p>
      </div>

      {/* Dynamic Search & Filter Row */}
      <div className="search-filter-row">
        <div className="search-wrapper">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder={currentText.uniPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search universities"
          />
        </div>
        
        <button className="filter-btn" aria-label="Toggle filters list">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          <span>{currentText.uniFilters}</span>
        </button>
      </div>

      {/* Loading state indicator */}
      {isLoading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '48px 0', gap: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(187, 225, 250, 0.1)',
            borderTopColor: 'var(--light-blue)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '14px', fontWeight: 600 }}>{currentText.uniLoadingText}</p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {/* Error state with retry panel */}
      {error && !isLoading && (
        <div style={{
          background: 'rgba(234, 67, 53, 0.12)',
          border: '1px solid rgba(234, 67, 53, 0.25)',
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '500px',
          textAlign: 'center',
          margin: '36px auto'
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ea4335" strokeWidth="2.5" style={{ marginBottom: '12px' }}>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p style={{ color: '#ff8a80', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>{error}</p>
          <button
            onClick={fetchUniversities}
            className="filter-btn"
            style={{ margin: '0 auto', padding: '10px 20px', borderRadius: '8px', border: '1px solid rgba(234, 67, 53, 0.3)', color: '#ff8a80' }}
          >
            {currentText.uniRetryBtn}
          </button>
        </div>
      )}

      {/* Grid of Universities */}
      {!isLoading && !error && (
        <div className="uni-grid">
          {universities.map((uni) => {
            const locName = locationLabels[lang]?.[uni.location] || uni.location || '';
            const isTopRated = uni.rating >= 90;
            const uniTypeLabel = uni.university_type === 'state' ? currentText.uniStateType : currentText.uniPrivateType;
            
            return (
              <article
                key={uni.id}
                className="uni-card"
                onClick={() => setActiveUniversityId(uni.id)}
                style={{ cursor: 'pointer' }}
              >
                
                {/* Image & Badge overlay */}
                <div className="uni-image-wrapper">
                  <img src={getFallbackImage(uni)} alt={uni.name} loading="lazy" />
                  
                  {/* Type and Rating Badges */}
                  <span className="card-badge dtm-compatible" style={{ right: 'auto', left: '16px' }}>
                    {uniTypeLabel}
                  </span>
                  
                  {isTopRated && (
                    <span className="card-badge top-rated">
                      {currentText.uniTopRated}
                    </span>
                  )}
                </div>

                {/* Content Details */}
                <div className="uni-card-body">
                  <div className="uni-title-row">
                    <h3>{uni.name}</h3>
                    {uni.rating && (
                      <span className="rating-badge" aria-label={`Rating ${uni.rating}`}>{uni.rating}</span>
                    )}
                  </div>
                  
                  <p className="uni-desc">
                    {uni.description ? (
                      uni.description.length > 140 ? `${uni.description.substring(0, 137)}...` : uni.description
                    ) : uni.name}
                  </p>
                  
                  <div className="uni-footer-row">
                    <span className="location">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      {locName}
                    </span>
                    
                    <a
                      href={`#details-${uni.id}`}
                      className="details-link"
                      aria-label={`View details for ${uni.name}`}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setActiveUniversityId(uni.id)
                      }}
                    >
                      <span>{currentText.uniViewDetails}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </a>
                  </div>
                </div>

              </article>
            );
          })}
        </div>
      )}

      {!isLoading && !error && universities.length === 0 && (
        <p style={{ margin: '36px 0', fontSize: '15px', color: 'var(--on-surface-variant)', textAlign: 'center' }}>
          {currentText.uniNoResults}
        </p>
      )}

      {/* Pagination indicators */}
      {!isLoading && !error && universities.length > 0 && (
        <div className="pagination-row" aria-label="Pagination Navigation">
          <button className="page-btn" aria-label="Previous page" disabled>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button className="page-btn active" aria-label="Page 1">1</button>
          <button className="page-btn" aria-label="Page 2">2</button>
          <button className="page-btn" aria-label="Page 3">3</button>
          <button className="page-btn" aria-label="Next page">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}

    </section>
  )
}

export default Univerlar
