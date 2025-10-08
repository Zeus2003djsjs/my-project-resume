import React, { createContext, useState, useEffect, useContext } from 'react';

const ResumeContext = createContext();

// --- Configuration ---
const STORAGE_KEY = 'resumeBuilderData';

// --- Initial State Structure ---
// Defines the master structure of the resume data, matching your forms
const getInitialState = () => ({
    // Step 1: Personal Info (simple object)
    personalInfo: { firstName: '', surname: '', city: '', country: '', pin: '', phone: '', email: '' },
    // Step 2: Experience (Array to hold multiple job entries)
    experiences: [], 
    // Step 3: Education (Array to hold multiple entries)
    education: [],
    // Step 4: Skills (Stored as the raw editor text)
    skills: '', 
    // Step 5: Summary (Stored as the raw editor text)
    summary: '',
    // Draft field for the job currently being entered in the ExperienceForm
    currentJobDraft: {}, 
    // Placeholder for other sections (More Details, etc.)
    moreDetails: {}, 
});

// --- The Provider Component ---
export function ResumeProvider({ children }) {

    // 1. Logic to load saved data from Local Storage on startup
    const loadState = () => {
        try {
            const savedData = localStorage.getItem(STORAGE_KEY);
            if (savedData === null) {
                return getInitialState();
            }
            // Load and safely merge with the initial structure
            return { ...getInitialState(), ...JSON.parse(savedData) };
        } catch (error) {
            console.error("Could not load data from Local Storage:", error);
            // If data is corrupted, clear it and start fresh
            localStorage.removeItem(STORAGE_KEY); 
            return getInitialState();
        }
    };

    const [resumeData, setResumeData] = useState(loadState);

    // 2. useEffect hook to save data to Local Storage whenever resumeData changes
    useEffect(() => {
        try {
            // This ensures data persists automatically across refreshes
            localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
        } catch (error) {
            console.error("Could not save data to Local Storage:", error);
        }
    }, [resumeData]);

    // 3. Universal Update Function (Used for simple sections like personalInfo, skills, summary)
    // This is what your ResumeForm.jsx and SkillsForm.jsx will call.
    const updateSection = (sectionName, data) => {
        setResumeData(prev => ({
            ...prev,
            [sectionName]: data 
        }));
    };
    
    // 4. Function for adding array entries (used when clicking 'Continue' on a job form)
    const addExperience = (newJobData) => {
        const newEntry = { 
            ...newJobData, 
            id: Date.now().toString() // Unique ID for list management
        };
        setResumeData(prev => ({
            ...prev,
            experiences: [...prev.experiences, newEntry]
        }));
    };
    
    // NOTE: You would add other array helpers here (editExperience, deleteExperience, addEducation)

    const contextValue = {
        // Data provided to all components
        resumeData,
        // Functions provided to all components
        updateSection,
        addExperience,
    };

    return (
        <ResumeContext.Provider value={contextValue}>
            {children}
        </ResumeContext.Provider>
    );
}

// 5. Hook for components to access the context
export function useResume() {
    // This hook is what your form components call: const { resumeData, updateSection } = useResume();
    return useContext(ResumeContext);
}