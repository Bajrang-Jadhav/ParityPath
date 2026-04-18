import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { aiService } from '../services/api';

const SAMPLE_JD = `Software Engineer - Full Stack Development

We are looking for a young, energetic rockstar developer who can hit the ground running in our fast-paced environment. The ideal man for this job is a self-starter who thrives under pressure.

Requirements:
- Must be a recent graduate (0-2 years experience)
- He should have strong skills in React, Node.js, and Python
- Native English speaker preferred
- Must be able to work long hours and weekends when needed
- Looking for someone who is a culture fit and can hang out with the team
- Strong manpower management skills
- Should be aggressive in pursuing deadlines
- Bachelor's degree from a top-tier university required
- Must be physically present in office 5 days a week

We offer competitive salary for the right guy. Only serious applicants need apply. This role is not suitable for career changers.`;

const Employer = () => {
  const [jdInput, setJdInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('rewritten');
  const { showToast } = useToast();

  const loadSampleJD = () => {
    setJdInput(SAMPLE_JD);
    showToast('Sample JD loaded', 'info');
  };

  const analyzeJD = async () => {
    if (!jdInput) {
      showToast('Please enter a job description first', 'error');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await aiService.analyzeJD(jdInput);
      setResult(data);
      showToast('Analysis complete!', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || err.message, 'error');
      console.error('JD Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page active" id="page-employer">
      <div className="page-header">
        <div>
          <h2 className="page-title">Employer Portal</h2>
          <p className="page-subtitle">Transform job descriptions into inclusive, bias-free language</p>
        </div>
      </div>

      <div className="employer-layout">
        {/* Input Panel */}
        <div className="panel input-panel">
          <div className="panel-header">
            <span className="material-icons-round">edit_note</span>
            <h3>Raw Job Description</h3>
          </div>
          <textarea 
            className="jd-input" 
            value={jdInput}
            onChange={(e) => setJdInput(e.target.value)}
            placeholder="Paste your job description here..."
          ></textarea>
          <div className="input-actions">
            <button className="btn btn-ghost" onClick={loadSampleJD}>
              <span className="material-icons-round">science</span>
              Load Sample
            </button>
            <button className="btn btn-primary" onClick={analyzeJD} disabled={loading}>
              <span className="material-icons-round">auto_awesome</span>
              Analyze & Rewrite
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="panel loading-panel">
            <div className="loading-animation">
              <div className="loading-spinner"></div>
              <p className="loading-text">Analyzing job description for bias...</p>
            </div>
          </div>
        )}

        {/* Results Panel */}
        {result && !loading && (
          <div className="panel results-panel">
            {/* Parity Score */}
            <div className="parity-score-section">
              <div className="score-gauge">
                <svg viewBox="0 0 200 200" className="gauge-svg">
                  <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#EF4444' }}/>
                      <stop offset="50%" style={{ stopColor: '#F59E0B' }}/>
                      <stop offset="100%" style={{ stopColor: '#10B981' }}/>
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="85" className="gauge-bg"/>
                  <circle 
                    cx="100" 
                    cy="100" 
                    r="85" 
                    className="gauge-fill" 
                    style={{ 
                      strokeDashoffset: 534 - (534 * (result.parity_score || 0)),
                      stroke: `hsl(${(result.parity_score || 0) * 120}, 70%, 55%)`
                    }}
                  />
                </svg>
                <div className="gauge-center">
                  <span 
                    className="gauge-value"
                    style={{ color: `hsl(${(result.parity_score || 0) * 120}, 70%, 55%)` }}
                  >
                    {Math.round((result.parity_score || 0) * 100)}%
                  </span>
                  <span className="gauge-label">Parity Score</span>
                </div>
              </div>
              <p className="score-explanation">{result.score_explanation}</p>
            </div>

            {/* Bias Highlights */}
            {result.biased_items && result.biased_items.length > 0 && (
              <div className="bias-section">
                <h3>
                  <span className="material-icons-round">warning_amber</span>
                  Biased Language Detected
                </h3>
                <div className="bias-cards">
                  {result.biased_items.map((item, idx) => (
                    <div key={idx} className="bias-card">
                      <span className="bias-original">{item.original}</span>
                      <div className="bias-details">
                        <span className="bias-reason">{item.reason}</span>
                        <span className="bias-suggestion">
                          <span className="material-icons-round">arrow_forward</span>
                          {item.suggestion}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="result-tabs">
              <button 
                className={`tab-btn ${activeTab === 'rewritten' ? 'active' : ''}`} 
                onClick={() => setActiveTab('rewritten')}
              >
                <span className="material-icons-round">auto_fix_high</span>
                Inclusive Rewrite
              </button>
              <button 
                className={`tab-btn ${activeTab === 'simplified' ? 'active' : ''}`} 
                onClick={() => setActiveTab('simplified')}
              >
                <span className="material-icons-round">simplification</span>
                Simplified Version
              </button>
            </div>
            
            {activeTab === 'rewritten' && (
              <div className="tab-content active">
                <div className="rewritten-jd">{result.rewritten_jd}</div>
              </div>
            )}
            {activeTab === 'simplified' && (
              <div className="tab-content active">
                <div className="simplified-jd">{result.simplified_jd}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Employer;
