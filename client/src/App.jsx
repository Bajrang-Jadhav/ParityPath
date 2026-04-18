import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ToastContainer from './components/ToastContainer';
import Home from './pages/Home';
import Employer from './pages/Employer';
import Candidate from './pages/Candidate';
import Match from './pages/Match';
import Dashboard from './pages/Dashboard';
import Agent from './pages/Agent';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <div className="ambient-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <Sidebar />
      
      <main className="main-content" id="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/employer" element={<Employer />} />
          <Route path="/candidate" element={<Candidate />} />
          <Route path="/match" element={<Match />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agent" element={<Agent />} />
        </Routes>
      </main>

      <ToastContainer />
    </ToastProvider>
  );
}

export default App;
