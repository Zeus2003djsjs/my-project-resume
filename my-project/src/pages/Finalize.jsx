// src/pages/Finalize.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';

import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';
import Template4 from '../templates/Template4'; // ✨ Import the new template
import Template5 from '../templates/Template5'; // ✨ Import the new template

export default function Finalize() {
    const { resumeData } = useResume();
    const navigate = useNavigate();
    
    const [selectedTemplate, setSelectedTemplate] = useState('Template1');
    const [selectedColor, setSelectedColor] = useState('#000000');

    // This is our new, simple download function
    const handleDownload = () => {
        window.print();
    };

    const handleSave = () => {
        alert("Resume saved!");
        navigate('/dashboard');
    };
    
    const renderTemplate = () => {
        const props = {
            color: selectedColor,
            formData: resumeData.personalInfo, // ✨ Correctly map personalInfo to formData
            experiences: resumeData.experiences,
            educationData: resumeData.education,
            skills: resumeData.skills,
            summary: resumeData.summary,
            moreDetails: resumeData.moreDetails,
        };
        switch (selectedTemplate) {
            case 'Template1': return <Template1 {...props} />;
            case 'Template2': return <Template2 {...props} />;
            case 'Template3': return <Template3 {...props} />;
            case 'Template4': return <Template4 {...props} />; // ✨ Add the new case
            case 'Template5': return <Template5 {...props} />; // ✨ Add the new case
            default: return <Template1 {...props} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 flex">
            <div className="no-print">
                <LeftSidebar 
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    selectedTemplate={selectedTemplate}
                    setSelectedTemplate={setSelectedTemplate}
                />
            </div>
            
            <main className="flex-1 p-8 overflow-y-auto">
                {renderTemplate()}
            </main>

            <div className="no-print">
                <RightSidebar 
                    onDownload={handleDownload}
                    onSave={handleSave}
                />
            </div>
        </div>
    );
}