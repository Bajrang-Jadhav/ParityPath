import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { aiService } from '../services/api';

const SAMPLE_AGENT_CANDIDATES = [
    { name: "John", transcript: "I recently graduated and worked building simple react apps." },
    { name: "Sarah", transcript: "I have 4 years of experience as a project manager using agile." }
];

const Agent = () => {
  const [jdText, setJdText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { showToast } = useToast();

  const runPipeline = async () => {
    if (!jdText) {
      showToast('Please enter a JD', 'error');
      return;
    }
    
    setLoading(true);
    try {
      const data = await aiService.runAgent(jdText, SAMPLE_AGENT_CANDIDATES);
      setResult(data);
      showToast('Pipeline complete!', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page active" id="page-agent">
      <div className="page-header">
        <div>
          <h2 className="page-title">AI Agent Pipeline</h2>
          <p className="page-subtitle">Autonomous AI that scouts, matches, and drafts outreach</p>
        </div>
        <span className="wow-badge">
          <span className="material-icons-round">auto_awesome</span>
          WOW Feature
        </span>
      </div>

      <div className="agent-layout">
        <div className="panel agent-input-panel">
          <div className="panel-header">
            <span className="material-icons-round">business</span>
            <h3>Job Description for Agent</h3>
          </div>
          <textarea 
            className="jd-input" 
            placeholder="Paste the job description — the AI Agent will find matching candidates, rank them, and draft outreach emails."
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
          ></textarea>
          <button className="btn btn-primary btn-lg" onClick={runPipeline} disabled={loading}>
            <span className="material-icons-round">smart_toy</span>
            Launch AI Agent
          </button>
        </div>

        {loading && (
          <div className="panel loading-panel">
            <div className="loading-animation">
              <div className="loading-spinner"></div>
              <p className="loading-text">Agent is thinking...</p>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="panel agent-results">
            <div className="agent-results-content">
              <h3>Agent Execution Results</h3>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Agent;
