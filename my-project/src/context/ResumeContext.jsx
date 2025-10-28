// src/context/ResumeContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import api, { setAuthToken } from '../utils/api';

const ResumeContext = createContext();

// Add a temporary draft field to our initial state
const getInitialState = () => ({
    personalInfo: { firstName: '', surname: '', city: '', country: '', pin: '', phone: '', email: '' },
    experiences: [],
    education: [],
    skills: '',
    summary: '',
    moreDetails: {},
    currentJobDraft: {}, // This will hold data from the first experience form
});

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(getInitialState());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      loadResume();
    }
  }, []);

  const loadResume = async () => {
    try {
      const res = await api.get('/resumes');
      if (res.data) {
        setResumeData({ ...getInitialState(), ...res.data });
      }
    } catch (err) {
      console.error('Could not load resume.', err);
      setResumeData(getInitialState());
    }
  };

  const login = (token) => {
    setAuthToken(token);
    setIsAuthenticated(true);
    loadResume();
  };

  const logout = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    setResumeData(getInitialState());
  };

  const saveResume = async (updatedData) => {
    if (!isAuthenticated) {
      console.log("Not authenticated, skipping save.");
      return;
    }
    try {
      const res = await api.post('/resumes', updatedData);
      setResumeData(res.data);
    } catch (err) {
      console.error('Error saving resume:', err);
    }
  };

  // This function is now also used to update the job draft without saving to the backend
  const updateSection = (sectionName, data) => {
    const updatedData = { ...resumeData, [sectionName]: data };
    setResumeData(updatedData);
    // Only save the entire resume for final sections, not for the temporary draft
    if (sectionName !== 'currentJobDraft') {
        saveResume(updatedData);
    }
  };

  // ✨ This function is now called from the *description* page to finalize and save the experience
  const addExperience = (descriptionData) => {
    if (!isAuthenticated) return;

    // Combine the draft from step 1 with the description from step 2
    const finalExperience = {
      ...resumeData.currentJobDraft,
      ...descriptionData,
    };
    
    const updatedExperiences = [...resumeData.experiences, finalExperience];
    
    // Create the final resume data object to be saved
    const finalResumeData = {
      ...resumeData,
      experiences: updatedExperiences,
      currentJobDraft: {}, // Clear the draft for the next entry
    };
    
    setResumeData(finalResumeData);
    saveResume(finalResumeData); // Save the complete, updated resume to the backend
  };

  const deleteExperience = async (experienceId) => {
    if (!isAuthenticated) return;
    try {
      const res = await api.delete(`/resumes/experience/${experienceId}`);
      setResumeData(res.data);
    } catch (err) {
      console.error('Error deleting experience:', err);
    }
  };

  // ✨ NEW FUNCTION TO UPDATE AN EXPERIENCE ✨
  const updateExperience = async (experienceId, experienceData) => {
    if (!isAuthenticated) return;
    try {
      // Call the new PUT endpoint on the backend
      const res = await api.put(`/resumes/experience/${experienceId}`, experienceData);
      // Update the frontend state with the updated resume
      setResumeData(res.data);
    } catch (err) {
      console.error('Error updating experience:', err);
    }
  };

  
  // ✨ NEW EDUCATION FUNCTIONS ✨

  const addEducation = (educationData) => {
    if (!isAuthenticated) return;
    const updatedEducation = [...resumeData.education, educationData];
    const updatedData = { ...resumeData, education: updatedEducation };
    setResumeData(updatedData);
    saveResume(updatedData); // Save the whole resume
  };

  const updateEducation = async (educationId, educationData) => {
    if (!isAuthenticated) return;
    try {
      const res = await api.put(`/resumes/education/${educationId}`, educationData);
      setResumeData(res.data);
    } catch (err) {
      console.error('Error updating education:', err);
    }
  };

  const deleteEducation = async (educationId) => {
    if (!isAuthenticated) return;
    try {
      const res = await api.delete(`/resumes/education/${educationId}`);
      setResumeData(res.data);
    } catch (err) {
      console.error('Error deleting education:', err);
    }
  };

// ✨ NEW FUNCTION TO DELETE AN ENTIRE RESUME ✨
  const deleteResume = async (resumeId) => {
    if (!isAuthenticated) return;
    try {
      await api.delete(`/resumes/${resumeId}`);
      // After deleting, we might want to reload the list of resumes
      // For now, we can just show a success message.
      toast.success('Resume deleted successfully!');
      // You might want to navigate the user away or refresh the list here.
    } catch (err) {
      console.error('Error deleting resume:', err);
      toast.error('Could not delete resume.');
    }
  };

  const contextValue = {
    resumeData,
    updateSection,
    addExperience,
    deleteExperience,
    updateExperience, // ✨ EXPORT THE NEW FUNCTION ✨
    addEducation,     // ✨ EXPORT NEW FUNCTION 
    updateEducation,  // ✨ EXPORT NEW FUNCTION
    deleteEducation,  // ✨ EXPORT NEW FUNCTION
    isAuthenticated,
    login,
    logout,
    deleteResume, // ✨ EXPORT THE NEW FUNCTION ✨
  };

  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}