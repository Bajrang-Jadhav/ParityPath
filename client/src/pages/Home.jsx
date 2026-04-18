import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="page active" id="page-home">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="material-icons-round">auto_awesome</span>
            SDG 10 — Reduced Inequalities
          </div>
          <h1 className="hero-title">
            Your <span className="gradient-text">story</span> matters more<br />than your <span className="gradient-text">vocabulary</span>
          </h1>
          <p className="hero-subtitle">
            ParityPath uses Agentic AI to eliminate socio-linguistic barriers in hiring — 
            translating corporate jargon into inclusive language and converting raw human 
            experiences into professional resumes.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/employer')}>
              <span className="material-icons-round">business</span>
              Employer Portal
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/candidate')}>
              <span className="material-icons-round">mic</span>
              Tell Your Story
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card card-float-1" style={{ animationPlayState: 'running' }}>
            <div className="mini-score-ring" data-score="0.92">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="ring-bg"/>
                <circle cx="50" cy="50" r="45" className="ring-fill" style={{ '--score': 0.92 }}/>
              </svg>
              <span className="mini-score-value">92%</span>
            </div>
            <span>Parity Score</span>
          </div>
          <div className="hero-card card-float-2" style={{ animationPlayState: 'running' }}>
            <span className="material-icons-round" style={{ color: 'var(--accent-green)' }}>check_circle</span>
            <span>"manpower" → "workforce"</span>
          </div>
          <div className="hero-card card-float-3" style={{ animationPlayState: 'running' }}>
            <span className="material-icons-round" style={{ color: 'var(--accent-blue)' }}>record_voice_over</span>
            <span>Voice → Resume</span>
          </div>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card" onClick={() => navigate('/employer')}>
          <div className="feature-icon" style={{ '--icon-color': 'var(--primary)' }}>
            <span className="material-icons-round">edit_note</span>
          </div>
          <h3>Bias-Free JD Rewriting</h3>
          <p>AI detects gendered, ageist, and exclusionary language — then rewrites job descriptions to be truly inclusive.</p>
        </div>
        <div className="feature-card" onClick={() => navigate('/candidate')}>
          <div className="feature-icon" style={{ '--icon-color': 'var(--accent-teal)' }}>
            <span className="material-icons-round">mic</span>
          </div>
          <h3>Voice-to-Resume</h3>
          <p>Speak your experience naturally. AI converts your story into a polished, ATS-friendly professional resume.</p>
        </div>
        <div className="feature-card" onClick={() => navigate('/match')}>
          <div className="feature-icon" style={{ '--icon-color': 'var(--accent-orange)' }}>
            <span className="material-icons-round">psychology</span>
          </div>
          <h3>Intent-Based Matching</h3>
          <p>Matches candidates to jobs by understanding what they CAN do — not just what keywords they use.</p>
        </div>
        <div className="feature-card" onClick={() => navigate('/agent')}>
          <div className="feature-icon" style={{ '--icon-color': 'var(--accent-pink)' }}>
            <span className="material-icons-round">smart_toy</span>
          </div>
          <h3>AI Agent Pipeline</h3>
          <p>Autonomous AI recruiter that scouts candidates, scores matches, and drafts personalized outreach emails.</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
