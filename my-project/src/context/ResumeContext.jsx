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
  
  // ✨ NEW FUNCTION TO HANDLE LOGIN STATE ✨
  const login = (token) => {
    setAuthToken(token);
    setIsAuthenticated(true);
    loadResume(); // Load the user's resume immediately after login
  };

  const saveResume = async (updatedData) => {
    if (!isAuthenticated) {
      console.log("Not authenticated, skipping save."); // Helpful for debugging
      return; 
    }
    try {
      const res = await api.post('/resumes', updatedData);
      setResumeData(res.data);
    } catch (err) {
      console.error('Error saving resume:', err);
    }
  };

  const updateSection = (sectionName, data) => {
    const updatedData = { ...resumeData, [sectionName]: data };
    setResumeData(updatedData);
    saveResume(updatedData);
  };
  
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
    login, // ✨ EXPORT THE NEW FUNCTION ✨
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