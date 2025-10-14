// src/pages/Finalize.jsx

import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { useResume } from '../context/ResumeContext';
import ResumePreview from './ResumePreview';
import { Download, Edit } from 'lucide-react';

export default function Finalize() {
    const navigate = useNavigate();
    const { resumeData } = useResume();
    const componentRef = useRef(); // This ref will point to the wrapper div

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.surname}_Resume`,
    });

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
            {/* Left Panel */}
            <aside className="w-full lg:w-1/4 bg-white p-8 shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Finalize Your Resume</h1>
                <p className="text-gray-600 mb-8">Your resume is ready! You can now download it as a PDF.</p>
                <button onClick={handlePrint} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center mb-4">
                    <Download className="mr-2" size={20} />
                    Download as PDF
                </button>
                <p className="text-xs text-gray-500 text-center mb-4">Note: When the print dialog opens, set the "Destination" to "Save as PDF".</p>
                <button onClick={() => navigate('/dashboard')} className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition flex items-center justify-center">
                    <Edit className="mr-2" size={20} />
                    Back to Dashboard
                </button>
            </aside>

            {/* Right Panel */}
            <main className="flex-1 p-8 flex items-center justify-center">
                {/* ✨ THE REF IS NOW ON THIS WRAPPER DIV ✨ */}
                <div ref={componentRef} className="w-full max-w-2xl">
                    <ResumePreview
                        formData={resumeData.personalInfo}
                        experiences={resumeData.experiences}
                        educationData={resumeData.education}
                        skills={resumeData.skills}
                        summary={resumeData.summary}
                        moreDetails={resumeData.moreDetails} // Pass the moreDetails data
                    />
                </div>
            </main>
        </div>
    );
}