import React from 'react';

const Dashboard = () => {
  return (
    <section className="page active" id="page-dashboard">
      <div className="page-header">
        <div>
          <h2 className="page-title">Analytics Dashboard</h2>
          <p className="page-subtitle">Track impact metrics across the platform</p>
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="metric-card">
          <div className="metric-icon" style={{ '--icon-bg': 'var(--primary-light)' }}>
            <span className="material-icons-round">description</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">12</span>
            <span className="metric-label">JDs Analyzed</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon" style={{ '--icon-bg': '#FEF3C7' }}>
            <span className="material-icons-round" style={{ color: '#F59E0B' }}>warning_amber</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">48</span>
            <span className="metric-label">Bias Words Found</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon" style={{ '--icon-bg': '#D1FAE5' }}>
            <span className="material-icons-round" style={{ color: '#10B981' }}>trending_up</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">91%</span>
            <span className="metric-label">Avg Parity Score</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon" style={{ '--icon-bg': '#EDE9FE' }}>
            <span className="material-icons-round" style={{ color: 'var(--primary)' }}>people</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">7</span>
            <span className="metric-label">Resumes Generated</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
