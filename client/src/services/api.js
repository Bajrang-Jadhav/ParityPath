import axios from 'axios';

// The Vite frontend runs on 5173, make requests to Express server running on 5000
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const aiService = {
  analyzeJD: async (jdText) => {
    const res = await api.post('/ai/analyze-jd', { jdText });
    return res.data;
  },
  generateResume: async (transcript) => {
    const res = await api.post('/ai/generate-resume', { transcript });
    return res.data;
  },
  extractSkills: async (text) => {
    const res = await api.post('/ai/extract-skills', { text });
    return res.data;
  },
  matchScore: async (jdText, candidateText) => {
    const res = await api.post('/ai/match-score', { jdText, candidateText });
    return res.data;
  },
  runAgent: async (jdText, candidateProfiles) => {
    const res = await api.post('/ai/run-agent', { jdText, candidateProfiles });
    return res.data;
  }
};

export default api;
