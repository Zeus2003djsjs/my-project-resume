// src/pages/Finalize.jsx

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { useResume } from '../context/ResumeContext';

// Import the components
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3'; // Import the new template

export default function Finalize() {
    const { resumeData } = useResume();
    const componentRef = useRef();
    const navigate = useNavigate();
    
    // State for managing design choices
    const [selectedTemplate, setSelectedTemplate] = useState('Template1');
    const [selectedColor, setSelectedColor] = useState('#000000');

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `${resumeData.personalInfo.firstName}_Resume`,
    });

    const handleDownload = () => {
        window.print();
    };

    const handleSave = () => {
        alert("Resume saved!");
        navigate('/dashboard');
    };
    
    // Render the selected template with the chosen color
    const renderTemplate = () => {
        const props = {
            // DO NOT pass the ref here
            color: selectedColor,
            formData: resumeData.personalInfo,
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
            default: return <Template1 {...props} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 flex">
            <LeftSidebar 
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
            />
            
            <main className="flex-1 p-8 overflow-y-auto">
                {/* ✨ THE REF IS ATTACHED TO THIS WRAPPER DIV ✨ */}
                <div ref={componentRef}>
                    {renderTemplate()}
                </div>
            </main>

            <RightSidebar 
                onDownload={handleDownload}
                onSave={handleSave}
            />
        </div>
    );
}