import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { aiService } from '../services/api';

const Candidate = () => {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { showToast } = useToast();

  const handleGenerate = async () => {
    if (!transcript.trim()) {
      showToast('Please type your experience first', 'error');
      return;
    }

    setLoading(true);
    try {
      const data = await aiService.generateResume(transcript);
      setResume(data);
      showToast('Resume generated successfully!', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const copyResume = () => {
    const el = document.getElementById('resume-preview-content');
    if (el) {
      navigator.clipboard.writeText(el.innerText).then(() => {
        showToast('Resume copied to clipboard!', 'success');
      }).catch(() => {
        showToast('Failed to copy', 'error');
      });
    }
  };

  return (
    <section className="page active" id="page-candidate">
      <div className="page-header">
        <div>
          <h2 className="page-title">Candidate Portal</h2>
          <p className="page-subtitle">Tell your story naturally — AI transforms it into a professional resume</p>
        </div>
      </div>

      <div className="candidate-layout">
        {/* Voice / Text Input Panel */}
        <div className="panel voice-panel">
          <div className="panel-header">
            <span className="material-icons-round">edit</span>
            <h3>Input Experience</h3>
          </div>

          <div className="transcript-section">
            <div className="transcript-actions" style={{ marginTop: '0' }}>
              <textarea 
                className="transcript-edit" 
                style={{ display: 'block', minHeight: '150px' }}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Type your experience here..."
              ></textarea>
              
              <div className="transcript-btns" style={{ justifyContent: 'flex-end', marginTop: '16px' }}>
                <button className="btn btn-ghost" onClick={() => setTranscript('')}>
                  <span className="material-icons-round">delete_outline</span>
                  Clear
                </button>
                <button className="btn btn-primary" onClick={handleGenerate} disabled={loading}>
                  <span className="material-icons-round">auto_awesome</span>
                  Generate Resume
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="panel loading-panel">
            <div className="loading-animation">
              <div className="loading-spinner"></div>
              <p className="loading-text">AI is crafting your resume...</p>
            </div>
          </div>
        )}

        {/* Resume Preview Panel */}
        {resume && !loading && (
          <div className="panel resume-panel">
            <div className="panel-header">
              <span className="material-icons-round">description</span>
              <h3>Generated Resume</h3>
              <button className="btn btn-ghost btn-sm" onClick={copyResume} style={{ marginLeft: 'auto' }}>
                <span className="material-icons-round">content_copy</span>
                Copy
              </button>
            </div>
            
            <div className="resume-preview" id="resume-preview-content">
              <div className="resume-header">
                <h2 className="resume-name">{resume.name || 'Candidate'}</h2>
              </div>
              
              {resume.summary && (
                 <div className="resume-section">
                    <div className="resume-section-title">Professional Summary</div>
                    <p className="resume-summary">{resume.summary}</p>
                 </div>
              )}

              {resume.skills && resume.skills.length > 0 && (
                 <div className="resume-section">
                    <div className="resume-section-title">Skills</div>
                    <div className="resume-skills">
                       {resume.skills.map((s, i) => (
                           <span key={i} className="skill-tag">{s}</span>
                       ))}
                    </div>
                 </div>
              )}

              {resume.experience && resume.experience.length > 0 && (
                <div className="resume-section">
                   <div className="resume-section-title">Experience</div>
                   {resume.experience.map((exp, i) => (
                      <div key={i} className="resume-experience-item">
                         <div className="exp-header">
                            <span className="exp-title">{exp.title}</span>
                            <span className="exp-duration">{exp.duration}</span>
                         </div>
                         <div className="exp-org">{exp.org}</div>
                         <ul className="exp-bullets">
                           {(exp.bullets || []).map((b, n) => <li key={n}>{b}</li>)}
                         </ul>
                      </div>
                   ))}
                </div>
              )}

              {resume.projects && resume.projects.length > 0 && (
                <div className="resume-section">
                   <div className="resume-section-title">Projects</div>
                   {resume.projects.map((p, i) => (
                      <div key={i} className="resume-project-item">
                         <div className="project-name">{p.name}</div>
                         <div className="project-desc">{p.description}</div>
                         {p.impact && <div className="project-impact">Impact: {p.impact}</div>}
                      </div>
                   ))}
                </div>
              )}

              {resume.education && resume.education.length > 0 && (
                <div className="resume-section">
                   <div className="resume-section-title">Education</div>
                   {resume.education.map((e, i) => (
                      <div key={i} className="resume-experience-item">
                         <div className="exp-header">
                            <span className="exp-title">{e.degree}</span>
                            <span className="exp-duration">{e.year}</span>
                         </div>
                         <div className="exp-org">{e.institution}</div>
                      </div>
                   ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Candidate;
