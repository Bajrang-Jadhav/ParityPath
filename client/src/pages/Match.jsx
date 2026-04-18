import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { aiService } from '../services/api';

const SAMPLE_MATCH_JD = `We need a Project Manager who can lead cross-functional teams, manage timelines and budgets, coordinate with stakeholders, and ensure successful project delivery. Experience with agile methodologies and team leadership required. Strong communication and problem-solving skills essential.`;
const SAMPLE_CANDIDATE = `I organized our college's biggest cultural fest for two years. I managed a team of 30 volunteers, handled a budget of ₹2 lakhs, coordinated with vendors and sponsors, and made sure everything ran on time. I also led our college's coding club where I taught juniors how to program. In my free time, I built a small e-commerce website for my cousin's business.`;

const Match = () => {
  const [jdText, setJdText] = useState('');
  const [candidateText, setCandidateText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { showToast } = useToast();

  const handleMatch = async () => {
    if (!jdText || !candidateText) {
      showToast('Please enter both job description and candidate profile', 'error');
      return;
    }

    setLoading(true);
    try {
      const data = await aiService.matchScore(jdText, candidateText);
      setResult(data);
      showToast('Match complete!', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page active" id="page-match">
      <div className="page-header">
        <div>
          <h2 className="page-title">Parity Match</h2>
          <p className="page-subtitle">Match candidates to jobs based on intent, not keywords</p>
        </div>
      </div>

      <div className="match-layout">
        <div className="match-inputs">
          <div className="panel match-input-panel">
            <div className="panel-header">
              <span className="material-icons-round">business</span>
              <h3>Job Description</h3>
            </div>
            <textarea 
              className="match-textarea" 
              placeholder="Paste job description..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            ></textarea>
            <button className="btn btn-ghost btn-sm" onClick={() => setJdText(SAMPLE_MATCH_JD)}>Load Sample</button>
          </div>
          <div className="match-vs">
            <div className="vs-badge">
              <span className="material-icons-round">compare_arrows</span>
            </div>
          </div>
          <div className="panel match-input-panel">
            <div className="panel-header">
              <span className="material-icons-round">person</span>
              <h3>Candidate Profile</h3>
            </div>
            <textarea 
              className="match-textarea" 
              placeholder="Paste candidate experience..."
              value={candidateText}
              onChange={(e) => setCandidateText(e.target.value)}
            ></textarea>
            <button className="btn btn-ghost btn-sm" onClick={() => setCandidateText(SAMPLE_CANDIDATE)}>Load Sample</button>
          </div>
        </div>
        <div className="match-action-row">
          <button className="btn btn-primary btn-lg" onClick={handleMatch} disabled={loading}>
            <span className="material-icons-round">psychology</span>
            Run Parity Match
          </button>
        </div>

        {loading && (
          <div className="panel loading-panel">
            <div className="loading-animation">
              <div className="loading-spinner"></div>
              <p className="loading-text">Running intent-based matching...</p>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="panel match-results-panel">
            <div className="match-score-hero">
              <div className="match-score-circle">
                <svg viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="85" className="gauge-bg"/>
                  <circle 
                    cx="100" cy="100" r="85" 
                    className="match-gauge-fill" 
                    style={{ 
                      strokeDashoffset: 534 - (534 * ((result.match_score || 0) / 100)),
                      stroke: `hsl(${((result.match_score || 0) / 100) * 120}, 70%, 55%)`
                    }}
                  />
                </svg>
                <div className="gauge-center">
                  <span 
                    className="gauge-value match-value"
                    style={{ color: `hsl(${((result.match_score || 0) / 100) * 120}, 70%, 55%)` }}
                  >
                    {result.match_score}%
                  </span>
                  <span className="gauge-label">Match Score</span>
                </div>
              </div>
            </div>
            <div className="match-reasoning">
              <strong>Analysis:</strong> {result.overall_reasoning}
            </div>
            
            {result.skill_matches && result.skill_matches.length > 0 && (
              <div className="skill-matches">
                <h4>Skill Matches</h4>
                {result.skill_matches.map((m, i) => (
                  <div key={i} className="skill-match-item">
                    <span className="skill-match-job">{m.job_req}</span>
                    <div className="skill-match-arrow">
                      <span className="material-icons-round">arrow_forward</span>
                      <span className="confidence-badge">{Math.round((m.confidence || 0) * 100)}%</span>
                    </div>
                    <span className="skill-match-candidate">{m.candidate_skill}</span>
                    <div className="skill-match-explanation">{m.explanation}</div>
                  </div>
                ))}
              </div>
            )}
            
            {result.gaps && result.gaps.length > 0 && (
              <div className="match-gaps" style={{ display: 'block' }}>
                <h4>Skill Gaps</h4>
                <ul>{result.gaps.map((g, i) => <li key={i}>{g}</li>)}</ul>
                {result.growth_potential && (
                  <p style={{ marginTop: '16px', color: 'var(--accent-teal)', fontSize: '0.85rem' }}>
                    <strong>Growth Potential:</strong> {result.growth_potential}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Match;
