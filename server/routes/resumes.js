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

// @route   DELETE api/resumes/experience/:exp_id
// @desc    Delete an experience entry from a resume
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });

    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }

    // Filter out the experience entry to be deleted
    resume.experiences = resume.experiences.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await resume.save();
    res.json(resume); // Send back the updated resume
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/resumes/experience/:exp_id
// @desc    Update an experience entry in a resume
// @access  Private
router.put('/experience/:exp_id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });

    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }

    // Find the index of the experience to update
    const updateIndex = resume.experiences.map(exp => exp._id.toString()).indexOf(req.params.exp_id);

    if (updateIndex === -1) {
        return res.status(404).json({ msg: 'Experience not found' });
    }
    
    // Create the updated experience object
    // We merge existing data with new data from the request body
    const updatedExperience = {
        ...resume.experiences[updateIndex].toObject(), // Convert mongoose doc to plain object
        ...req.body
    };

    // Replace the old experience with the updated one
    resume.experiences[updateIndex] = updatedExperience;

    await resume.save();
    res.json(resume); // Send back the updated resume
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/resumes/education/:edu_id
// @desc    Update an education entry
// @access  Private
router.put('/education/:edu_id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });

    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }

    const updateIndex = resume.education.map(item => item._id.toString()).indexOf(req.params.edu_id);

    if (updateIndex === -1) {
        return res.status(404).json({ msg: 'Education entry not found' });
    }

    // Replace the old education entry with the new data from the request body
    resume.education[updateIndex] = req.body;

    await resume.save();
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   DELETE api/resumes/education/:edu_id
// @desc    Delete an education entry from a resume
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });

    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }

    // Filter out the education entry to be deleted
    resume.education = resume.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );

    await resume.save();
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;