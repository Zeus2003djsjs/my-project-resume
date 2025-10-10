// routes/resumes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Resume = require('../models/Resume');
const User = require('../models/User');

// @route   POST api/resumes
// @desc    Create or update a user's resume
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    // The user's ID is available from the auth middleware (req.user.id)
    const resumeData = { ...req.body, user: req.user.id };

    let resume = await Resume.findOne({ user: req.user.id });

    if (resume) {
      // Update existing resume
      resume = await Resume.findOneAndUpdate(
        { user: req.user.id },
        { $set: resumeData },
        { new: true }
      );
      return res.json(resume);
    }

    // Create new resume
    resume = new Resume(resumeData);
    await resume.save();
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/resumes
// @desc    Get the logged-in user's resume
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });
    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;