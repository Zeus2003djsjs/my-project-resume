// models/Resume.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResumeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  personalInfo: {
    firstName: String,
    surname: String,
    city: String,
    country: String,
    pin: String,
    phone: String,
    email: String,
  },
  experiences: [
    {
      jobTitle: String,
      employer: String,
      city: String,
      country: String,
      startMonth: String,
      startYear: String,
      endMonth: String,
      endYear: String,
      current: Boolean,
      description: String,
    },
  ],
  education: [
    {
      schoolName: String,
      schoolLocation: String,
      degree: String,
      fieldOfStudy: String,
      gradMonth: String,
      gradYear: String,
      isCurrentlyEnrolled: Boolean,
      courseworkDetails: String,
    },
  ],
  skills: String,
  summary: String,
  moreDetails: {
    // Define the structure for the 'more details' section based on your form
    activities: String,
    awards: String,
    certifications: String,
    // ... add other fields
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Resume', ResumeSchema);