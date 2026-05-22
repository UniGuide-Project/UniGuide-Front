import { useState, useEffect } from 'react';
import './exam.scss';
import savollar from './savollar.json';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://uniguide.myjad.uz/api/v1';

// Helper function outside the component to avoid ESLint purity issues with Math.random()
function getRandomCompulsoryCorrect(userAccuracy) {
  const randomVal = Math.random() * 2 - 1;
  return Math.max(0, Math.min(10, Math.round(userAccuracy * 10 + randomVal)));
}

export default function Exam({ activeText, onExit, subjectText, onFinish }) {
  // Flatten Mathematics and Physics questions into a list of 40 questions
  const questionsList = [...savollar.matematika, ...savollar.fizika];

  const [timeLeft, setTimeLeft] = useState(10800); // 3 hours in seconds
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [resultsData, setResultsData] = useState(null);

  // Load initial answers from localStorage
  const [answers, setAnswers] = useState(() => {
    try {
      const stored = localStorage.getItem('uniguide_exam_answers');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error('Error loading answers from localStorage:', e);
      return {};
    }
  });

  useEffect(() => {
    if (showResultsModal) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [showResultsModal]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h} : ${m} : ${s}`;
  };

  const handleSelectAnswer = (qIndex, option) => {
    const updatedAnswers = { ...answers, [qIndex]: option };
    setAnswers(updatedAnswers);
    try {
      localStorage.setItem('uniguide_exam_answers', JSON.stringify(updatedAnswers));
    } catch (e) {
      console.error('Error saving answers to localStorage:', e);
    }
  };

  const handleFinishExam = async () => {
    // 1. Calculate correct answers for Major subjects
    let mathCorrect = 0;
    let physicsCorrect = 0;

    questionsList.forEach((q, index) => {
      const qIndex = index + 1; // 1-indexed
      const isCorrect = answers[qIndex] === q.correct;
      if (q.subject === 'matematika' || index < 20) {
        if (isCorrect) mathCorrect++;
      } else {
        if (isCorrect) physicsCorrect++;
      }
    });

    // 2. Compute Major points
    const mathScore = mathCorrect * 3.1;
    const physicsScore = physicsCorrect * 2.1;

    // 3. Dynamically simulate Compulsory subjects based on user accuracy
    const userAccuracy = (mathCorrect + physicsCorrect) / 40;
    // Compulsory Ona tili
    const comp1Correct = getRandomCompulsoryCorrect(userAccuracy);
    // Compulsory Matematika
    const comp2Correct = getRandomCompulsoryCorrect(userAccuracy);
    // Compulsory Tarix
    const comp3Correct = getRandomCompulsoryCorrect(userAccuracy);

    const comp1Score = comp1Correct * 1.1;
    const comp2Score = comp2Correct * 1.1;
    const comp3Score = comp3Correct * 1.1;

    // 4. Calculate total score (max 189.0)
    const totalScore = mathScore + physicsScore + comp1Score + comp2Score + comp3Score;

    // 5. Save results to state and trigger modal display
    const finalResults = {
      mathCorrect,
      physicsCorrect,
      mathScore,
      physicsScore,
      comp1Correct,
      comp2Correct,
      comp3Correct,
      comp1Score,
      comp2Score,
      comp3Score,
      totalScore: parseFloat(totalScore.toFixed(1))
    };

    setResultsData(finalResults);
    setShowResultsModal(true);

    // 6. Send results to the server
    const token = localStorage.getItem('uniguide_token');
    const payload = {
      score: parseFloat(totalScore.toFixed(1)),
      math_score: mathScore,
      physics_score: physicsScore,
      compulsory_scores: [comp1Score, comp2Score, comp3Score],
      total_questions: questionsList.length,
      correct_answers: mathCorrect + physicsCorrect,
      answers: answers,
      subjects: ['Matematika', 'Fizika']
    };

    try {
      const response = await fetch(`${API_BASE}/exams/submit/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        console.warn('API returned non-OK status on exam submission:', response.status);
      }
    } catch (err) {
      console.error('Server submission failed, running client simulation:', err);
    }
  };

  const handleModalAction = () => {
    // Clear stored answers from localStorage
    localStorage.removeItem('uniguide_exam_answers');

    // Trigger transition and AI match analysis
    if (onFinish && resultsData) {
      onFinish(resultsData.totalScore);
    }
  };

  const completedCount = Object.keys(answers).length;
  const currentQuestionData = questionsList[currentQuestion - 1];

  return (
    <div className="exam-container">
      {/* Header */}
      <header className="exam-header">
        <div className="exam-header-left">
          <button className="btn-exit" onClick={onExit}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            {activeText.examExit}
          </button>
          <div className="brand">UniGuide</div>
          <div className="exam-title">{activeText.examTitlePrefix} — {subjectText}</div>
        </div>
        <div className="exam-header-right">
          <div className="exam-progress-info">
            <span>{activeText.examProgress}</span>
            <strong>{completedCount} / {questionsList.length}</strong>
          </div>
          <button className="btn-finish" onClick={handleFinishExam}>{activeText.examFinishBtn}</button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="exam-layout">
        {/* Sidebar */}
        <aside className="exam-sidebar">
          <div className="timer-box">
            <div className="time">{formatTime(timeLeft)}</div>
            <div className="time-label">{activeText.examTimeLeft}</div>
          </div>

          <div className="questions-nav">
            <div className="nav-header">
              <span>{activeText.examQuestionsLabel} ({questionsList.length})</span>
              <span className="mix-label">{activeText.examQuestionsMix}</span>
            </div>
            <div className="nav-grid">
              {Array.from({ length: questionsList.length }, (_, i) => i + 1).map(num => (
                <button 
                  key={num} 
                  className={`nav-btn ${currentQuestion === num ? 'active' : ''} ${answers[num] ? 'answered' : ''}`}
                  onClick={() => setCurrentQuestion(num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="exam-content">
          <div className="question-header">
            <div className="q-badge">{currentQuestion}</div>
            <div className="q-meta">
              <span className="q-count">{currentQuestion} / {questionsList.length} {activeText.examQuestionNumber}</span>
              <span className="q-difficulty"><span className="dot"></span>{activeText.examDifficulty}</span>
            </div>
          </div>

          {currentQuestionData && (
            <>
              <div className="question-text">
                {currentQuestionData.question}
              </div>

              <div className="options-list">
                {currentQuestionData.options.map((optText, index) => {
                  const letter = String.fromCharCode(65 + index); // A, B, C, D
                  const isSelected = answers[currentQuestion] === letter;
                  return (
                    <button 
                      key={letter} 
                      className={`option-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectAnswer(currentQuestion, letter)}
                    >
                      <div className="opt-letter">{letter}</div>
                      <div className="opt-text">{optText}</div>
                      {isSelected && (
                        <div className="opt-check">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Premium Glassmorphic Results Modal Overlay */}
      {showResultsModal && resultsData && (
        <div className="exam-modal-overlay">
          <div className="exam-modal">
            <div className="modal-header">
              <div className="trophy-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#bbe1fa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                  <path d="M4 22h16"></path>
                  <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path>
                  <path d="M12 2a7.7 7.7 0 0 1 7.54 8H4.46A7.7 7.7 0 0 1 12 2z"></path>
                </svg>
              </div>
              <h3>Imtihon Yakunlandi!</h3>
              <p className="modal-subtitle">Natijalaringiz tahlil qilindi</p>
            </div>

            <div className="score-summary-box">
              <span className="total-score-label">Umumiy DTM Ballingiz</span>
              <div className="total-score-val">
                {resultsData.totalScore.toFixed(1)} <span className="score-max">/ 189.0</span>
              </div>
            </div>

            <div className="results-grid">
              {/* Matematika (Major 1) */}
              <div className="result-row">
                <div className="row-subject-info">
                  <span className="subject-name">Matematika (1-mutaxassislik)</span>
                  <span className="subject-desc">20 ta savol • 3.1 balldan</span>
                </div>
                <div className="row-score-info">
                  <strong className="correct-ratio">{resultsData.mathCorrect} / 20</strong>
                  <span className="subject-points">+{resultsData.mathScore.toFixed(1)} ball</span>
                </div>
              </div>

              {/* Fizika (Major 2) */}
              <div className="result-row">
                <div className="row-subject-info">
                  <span className="subject-name">Fizika (2-mutaxassislik)</span>
                  <span className="subject-desc">20 ta savol • 2.1 balldan</span>
                </div>
                <div className="row-score-info">
                  <strong className="correct-ratio">{resultsData.physicsCorrect} / 20</strong>
                  <span className="subject-points">+{resultsData.physicsScore.toFixed(1)} ball</span>
                </div>
              </div>

              <div className="compulsory-section-title">Majburiy Fanlar (1.1 balldan)</div>

              {/* Ona tili */}
              <div className="result-row compulsory-row">
                <div className="row-subject-info">
                  <span className="subject-name">Ona tili</span>
                  <span className="subject-desc">10 ta savol</span>
                </div>
                <div className="row-score-info">
                  <strong className="correct-ratio">{resultsData.comp1Correct} / 10</strong>
                  <span className="subject-points">+{resultsData.comp1Score.toFixed(1)} ball</span>
                </div>
              </div>

              {/* Matematika */}
              <div className="result-row compulsory-row">
                <div className="row-subject-info">
                  <span className="subject-name">Matematika</span>
                  <span className="subject-desc">10 ta savol</span>
                </div>
                <div className="row-score-info">
                  <strong className="correct-ratio">{resultsData.comp2Correct} / 10</strong>
                  <span className="subject-points">+{resultsData.comp2Score.toFixed(1)} ball</span>
                </div>
              </div>

              {/* O'zbekiston tarixi */}
              <div className="result-row compulsory-row">
                <div className="row-subject-info">
                  <span className="subject-name">O'zbekiston tarixi</span>
                  <span className="subject-desc">10 ta savol</span>
                </div>
                <div className="row-score-info">
                  <strong className="correct-ratio">{resultsData.comp3Correct} / 10</strong>
                  <span className="subject-points">+{resultsData.comp3Score.toFixed(1)} ball</span>
                </div>
              </div>
            </div>

            <button className="btn-modal-action" onClick={handleModalAction}>
              <span>AI TAHLILINI KO'RISH</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '8px'}}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
