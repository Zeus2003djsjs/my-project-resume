// server/routes/ai.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @route   POST api/ai/enhance
// @desc    Enhance text using the Gemini API
router.post('/enhance', auth, async (req, res) => {
  // ... (this route remains the same)
  const { text, promptType } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });
    const prompt = `Proofread and professionally rewrite the following resume ${promptType} to be more impactful and concise, while retaining the core meaning. Do not add any introductory phrases. Just provide the rewritten text directly:\n\n"${text}"`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ enhancedText: response.text() });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).send('Server Error: Could not connect to AI service.');
  }
});

// @route   POST api/ai/suggest-skills
// @desc    Suggest skills based on a job title
router.post('/suggest-skills', auth, async (req, res) => {
  const { jobTitle } = req.body;
  if (!jobTitle) {
    return res.status(400).json({ msg: 'Job title is required.' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });
    const prompt = `Based on the job title "${jobTitle}", suggest 8 relevant skills for a resume. Provide the skills as a single, clean JavaScript array of strings, like ["HTML", "CSS", "JavaScript"]. Do not include any other text, markdown, or explanation.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();

    try {
      // ✨ NEW: Clean the string to remove Markdown code block fences
      const cleanedString = textResponse
        .replace(/```javascript/g, '') // Remove the start fence
        .replace(/```/g, '')           // Remove the end fence
        .trim();                       // Remove any leading/trailing whitespace

      const skills = JSON.parse(cleanedString);
      res.json({ skills });
    } catch (parseError) {
      console.error("AI Response Parsing Error:", parseError, "Original Response:", textResponse);
      res.status(500).send('Server Error: Could not parse AI response.');
    }

  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).send('Server Error: Could not connect to AI service.');
  }
});

module.exports = router;