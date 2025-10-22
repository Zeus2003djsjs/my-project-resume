// server/routes/ai.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Google AI SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @route   POST api/ai/enhance
// @desc    Enhance text using the Gemini API
// @access  Private
router.post('/enhance', auth, async (req, res) => {
  const { text, promptType } = req.body;

  if (!text) {
    return res.status(400).json({ msg: 'Text to enhance is required.' });
  }

  try {
    // Select the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Define the prompt for the AI
    const prompt = `Proofread and professionally rewrite the following resume ${promptType} to be more impactful and concise, while retaining the core meaning. Do not add any introductory phrases like "Here's the rewritten version". Just provide the rewritten text directly:\n\n"${text}"`;
    
    // Generate the content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhancedText = response.text();
    
    res.json({ enhancedText });

  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).send('Server Error: Could not connect to AI service.');
  }
});

module.exports = router;