// src/context/ResumeContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import api, { setAuthToken } from '../utils/api';

const ResumeContext = createContext();

const getInitialState = () => ({
    personalInfo: { firstName: '', surname: '', city: '', country: '', pin: '', phone: '', email: '' },
    experiences: [],
    education: [],
    skills: '',
    summary: '',
    moreDetails: {},
});

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(getInitialState());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Effect to load user data on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      loadResume(); // Load resume data if token exists
    }
  }, []);

  // Function to load resume data from the backend
  const loadResume = async () => {
    try {
      const res = await api.get('/resumes');
      // If resume exists on backend, set it. Otherwise, use initial state.
      if (res.data) {
        setResumeData({ ...getInitialState(), ...res.data });
      }
    } catch (err) {
      console.error('Could not load resume.', err);
      // Handle case where user is authenticated but has no resume yet
      setResumeData(getInitialState());
    }
  };

  // Universal function to save the entire resume to the backend
  const saveResume = async (updatedData) => {
    if (!isAuthenticated) return; // Don't save if not logged in
    try {
      // The POST route on the backend handles both create and update
      const res = await api.post('/resumes', updatedData);
      setResumeData(res.data);
    } catch (err) {
      console.error('Error saving resume:', err);
    }
  };

  // Modified updateSection to save after every change
  const updateSection = (sectionName, data) => {
    const updatedData = { ...resumeData, [sectionName]: data };
    setResumeData(updatedData);
    saveResume(updatedData);
  };
  
  // Modified addExperience to save after adding a new entry
  const addExperience = (newJobData) => {
    const newEntry = { ...newJobData, id: Date.now().toString() };
    const updatedExperiences = [...resumeData.experiences, newEntry];
    const updatedData = { ...resumeData, experiences: updatedExperiences };
    setResumeData(updatedData);
    saveResume(updatedData);
  };

  const contextValue = {
    resumeData,
    updateSection,
    addExperience,
    isAuthenticated,
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