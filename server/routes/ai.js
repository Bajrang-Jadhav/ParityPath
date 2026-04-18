const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Use environment variable, instantiate Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const callGeminiJson = async (prompt, temperature = 0.3) => {
    if (!process.env.GEMINI_API_KEY) throw new Error("API Key is missing on the server.");
    
    // Choose the active model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: 'v1beta' });
    
    const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
            temperature: temperature,
            maxOutputTokens: 8192
        }
    });

    const response = await result.response;
    let text = response.text().trim();
    
    // Clean up Markdown formatting from Gemini
    if (text.startsWith('```')) {
        text = text.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
    }
    
    return JSON.parse(text);
};

// --- Endpoints ---

router.post('/analyze-jd', async (req, res) => {
    try {
        const { jdText } = req.body;
        // Simplified prompts derived from original app.js
        const prompt = `Analyze this job description for bias. Return JSON format with: 'parity_score' (0-1), 'biased_items' [{ original, reason, suggestion }], 'rewritten_jd' and 'simplified_jd'. JD: ${jdText}`;
        
        const data = await callGeminiJson(prompt, 0.2);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/generate-resume', async (req, res) => {
    try {
        const { transcript } = req.body;
        const prompt = `Convert this raw conversational transcript into a professional resume. Return JSON format with: name, summary, skills (array), experience [ {title, org, duration, bullets[]} ], projects [ {name, description, impact} ], and education. Transcript: ${transcript}`;
        
        const data = await callGeminiJson(prompt, 0.3);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/extract-skills', async (req, res) => {
    try {
        const { text } = req.body;
        const prompt = `Extract professional skills from this text. Return JSON format as { "skills": [] }. Text: ${text}`;
        
        const data = await callGeminiJson(prompt, 0.2);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/match-score', async (req, res) => {
    try {
        const { jdText, candidateText } = req.body;
        const prompt = `Match candidate profile with JD. Return JSON: match_score (0-100), overall_reasoning, skill_matches [{job_req, candidate_skill, confidence(0-1), explanation}], gaps [string], growth_potential. JD: ${jdText}. Candidate: ${candidateText}`;
        
        const data = await callGeminiJson(prompt, 0.3);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/run-agent', async (req, res) => {
    try {
        const { jdText, candidateProfiles } = req.body;
        const prompt = `Act as an AI recruiter. Rank these candidates for the job description. Return JSON: array of candidates with 'score', 'reasoning', and 'outreach_draft'. JD: ${jdText}. Candidates: ${JSON.stringify(candidateProfiles)}`;
        
        const data = await callGeminiJson(prompt, 0.4);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
