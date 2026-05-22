import { useState } from 'react';
import './simulator.scss';

export default function Simulator({ activeText }) {
  const [subject1, setSubject1] = useState('');
  const [subject2, setSubject2] = useState('');
  const [hasCert, setHasCert] = useState('no');
  const [certLevel, setCertLevel] = useState('');

  // Define logic for when to show certificate option
  const isForeignLang = (sub) => {
    return sub === 'english';
  };

  const showCertOptions = isForeignLang(subject1) || isForeignLang(subject2);

  const subjects = [
    { id: 'math', label: activeText.simSubjectMath },
    { id: 'physics', label: activeText.simSubjectPhysics },
    { id: 'english', label: activeText.simSubjectEnglish },
    { id: 'chemistry', label: activeText.simSubjectChemistry },
    { id: 'biology', label: activeText.simSubjectBiology },
    { id: 'history', label: activeText.simSubjectHistory }
  ];

  return (
    <div className="simulator-section">
      <div className="sim-header">
        <h2>{activeText.simTitle}</h2>
        <div className="sim-subtitle-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          {activeText.simSubtitle}
        </div>
      </div>

      <div className="sim-main-card">
        {/* Main Subjects Area */}
        <div className="sim-card-header">
          <span>{activeText.simMainSubjects}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-right">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
          </svg>
        </div>

        <div className="sim-selectors-grid">
          <div className="select-group">
            <label>{activeText.simMainSub1}</label>
            <div className="select-wrapper">
              <select value={subject1} onChange={(e) => setSubject1(e.target.value)}>
                <option value="" disabled>{activeText.simMainSub1Placeholder}</option>
                {subjects.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
              <div className="select-arrow"></div>
            </div>
          </div>

          <div className="select-group">
            <label>{activeText.simMainSub2}</label>
            <div className="select-wrapper">
              <select value={subject2} onChange={(e) => setSubject2(e.target.value)} disabled={!subject1}>
                <option value="" disabled>{activeText.simMainSub2Placeholder}</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.id} disabled={s.id === subject1}>{s.label}</option>
                ))}
              </select>
              <div className="select-arrow"></div>
            </div>
          </div>
        </div>

        {/* Dynamic Certificate Selection */}
        <div className={`cert-container ${showCertOptions ? 'visible' : ''}`}>
          <div className="select-group">
            <label>{activeText.simCertPrompt}</label>
            <div className="select-wrapper">
              <select value={hasCert} onChange={(e) => setHasCert(e.target.value)}>
                <option value="no">{activeText.simCertNo}</option>
                <option value="yes">{activeText.simCertYes}</option>
              </select>
              <div className="select-arrow"></div>
            </div>
          </div>
          
          {hasCert === 'yes' && (
            <div className="select-group cert-level-group">
              <label>{activeText.simCertSelect}</label>
              <div className="select-wrapper">
                <select value={certLevel} onChange={(e) => setCertLevel(e.target.value)}>
                  <option value="" disabled>Darajani tanlang</option>
                  <option value="A+">A+</option>
                  <option value="a">a</option>
                  <option value="B+">B+</option>
                  <option value="b">b</option>
                  <option value="C+">C+</option>
                  <option value="c">c</option>
                </select>
                <div className="select-arrow"></div>
              </div>
            </div>
          )}
        </div>

        <div className="sim-divider"></div>

        {/* Compulsory Subjects Area */}
        <div className="sim-card-header">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px', opacity: 0.8}}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>{activeText.simCompulsorySubjects}</span>
        </div>

        <div className="sim-compulsory-grid">
          <div className="compulsory-card">
            <div className="c-icon-box orange">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                <path d="M14 8l-4 4-2-2"></path>
              </svg>
            </div>
            <div className="c-info">
              <h4>{activeText.simCompulsorySub1}</h4>
              <p>{activeText.simQuestionsText}</p>
            </div>
            <div className="c-check">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
          </div>

          <div className="compulsory-card">
            <div className="c-icon-box purple">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
            <div className="c-info">
              <h4>{activeText.simCompulsorySub2}</h4>
              <p>{activeText.simQuestionsText}</p>
            </div>
            <div className="c-check">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
          </div>

          <div className="compulsory-card">
            <div className="c-icon-box yellow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div className="c-info">
              <h4>{activeText.simCompulsorySub3}</h4>
              <p>{activeText.simQuestionsText}</p>
            </div>
            <div className="c-check">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
          </div>
        </div>

        <div className="sim-footer">
          <div className="sim-stats">
            <span className="stat-highlight">{activeText.simSummaryQuestions}</span> <span className="stat-dot">•</span>
            <span className="stat-highlight">{activeText.simSummaryTime}</span> <span className="stat-dot">•</span>
            <span className="stat-highlight">{activeText.simSummaryScore}</span>
          </div>
          <button className="btn-sim-start">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            {activeText.simStartBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
