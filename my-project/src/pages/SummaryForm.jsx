// src/pages/SummaryForm.jsx

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ResumePreview from "../templates/Template1";
import { useResume } from "../context/ResumeContext.jsx";
import api from "../utils/api"; 
import toast from 'react-hot-toast'; // ✨ Import toast

export default function SummaryForm() {
    const navigate = useNavigate();
    const textAreaRef = useRef(null); 
    const { resumeData, updateSection } = useResume();

    const [summaryText, setSummaryText] = useState(resumeData.summary);
    const [isEnhancing, setIsEnhancing] = useState(false);

    useEffect(() => {
        setSummaryText(resumeData.summary);
    }, [resumeData.summary]);

    const [suggestions] = useState([
        "Customer satisfaction and driving positive outcomes.",
        "Experienced and dependable general worker with a proven track record of efficiently completing tasks in various settings.",
        "Adaptable professional with a quick-learning ability and a talent for adjusting to new environments.",
        "Experienced professional with a strong background in technology-related roles.",
    ]);

    const handleEditorChange = (e) => {
        setSummaryText(e.target.value);
        updateSection('summary', e.target.value);
    };

    const handleReplaceOrAdd = (newText, action) => {
        const updatedText = action === 'Replace' ? newText : `${summaryText || ''}\n${newText}`;
        setSummaryText(updatedText);
        updateSection('summary', updatedText);
    };
    
    const handleEnhance = async () => {
        if (!summaryText || summaryText.trim() === '') {
            toast.error("Please write a summary first."); // ✨ Use error toast
            return;
        }
        setIsEnhancing(true);
        try {
            const res = await api.post('/ai/enhance', { text: summaryText, promptType: 'summary' });
            const { enhancedText } = res.data;
            setSummaryText(enhancedText);
            updateSection('summary', enhancedText);
            toast.success("Summary enhanced by AI!"); // ✨ Use success toast
        } catch (err) {
            console.error("AI enhancement failed:", err);
            toast.error("Sorry, AI enhancement failed."); // ✨ Use error toast
        }
        setIsEnhancing(false);
    };

    const handleContinue = () => {
        updateSection('summary', summaryText);
        navigate("/more-details");
    };
    
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-20 bg-blue-900 text-white flex flex-col items-center py-6 space-y-6">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <div className="w-8 h-8 bg-white text-blue-900 border-2 border-green-500 rounded-full flex items-center justify-center font-bold">5</div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-10 relative">
                <h1 className="text-3xl font-bold mb-2">Craft your summary</h1>
                <p className="text-gray-600 mb-8 max-w-xl">Start with a prewritten option or write your own.</p>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
                    
                    {/* Suggestions Panel */}
                    <div className="bg-white p-2 rounded-lg col-span-1 max-h-[80vh] overflow-y-auto">
                        <div className="space-y-4">
                            {suggestions.map((text, index) => (
                                <div key={index} className="p-3 border border-gray-200 rounded-md shadow-sm bg-white">
                                    <p className="text-sm text-gray-700 mb-2">{text}</p>
                                    <div className="flex justify-start space-x-2 text-sm mt-3">
                                        <button type="button" onClick={() => handleReplaceOrAdd(text, 'Replace')} className="font-semibold text-blue-600 hover:text-blue-800">Replace</button>
                                        <span className="text-gray-400">|</span>
                                        <button type="button" onClick={() => handleReplaceOrAdd(text, 'Add')} className="font-semibold text-blue-600 hover:text-blue-800">+ Add</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Editor Panel */}
                    <div className="col-span-2 flex flex-col space-y-4">
                        <div className="bg-white p-0 rounded-lg flex flex-col border border-gray-300 shadow-md flex-grow max-h-[80vh]">
                            <div className="flex justify-between p-2 border-b border-gray-200">
                                <div className="space-x-3 text-lg">
                                    
                                </div>
                                <div className="space-x-3 text-lg">
                                    <button
                                        onClick={handleEnhance}
                                        disabled={isEnhancing}
                                        className="bg-yellow-400 px-3 py-1 rounded-md text-sm font-semibold hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        {isEnhancing ? "Enhancing..." : "✨ Enhance with AI"}
                                    </button>
                                </div>
                            </div>
                            <textarea
                                ref={textAreaRef}
                                value={summaryText || ''}
                                onChange={handleEditorChange}
                                className="flex-1 border-0 rounded-md p-3 resize-none focus:ring-0 h-96"
                                placeholder="Start typing your professional summary here..."
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-10 flex justify-between items-center w-full max-w-6xl mx-auto">
                    <button onClick={() => navigate(-1)} className="border border-black rounded-full px-8 py-2 font-bold bg-white hover:bg-gray-100 transition">Back</button>
                    <button onClick={handleContinue} className="bg-blue-600 text-white px-8 py-2 rounded-full font-bold hover:bg-blue-700 transition">Continue</button>
                </div>
            </main>

            {/* ✨ THIS IS THE MISSING SECTION ✨ */}
            <aside className="w-96 p-4 bg-white shadow-lg border-l sticky top-0 h-screen overflow-y-auto flex flex-col items-center">
                <ResumePreview 
                    formData={resumeData.personalInfo}
                    experiences={resumeData.experiences}
                    educationData={resumeData.education}
                    skills={resumeData.skills}
                    summary={summaryText}
                />
                
            </aside>
        </div>
    );
}