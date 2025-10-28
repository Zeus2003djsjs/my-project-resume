// src/pages/SkillsForm.jsx

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ResumePreview from "../templates/Template1";
import { useResume } from "../context/ResumeContext.jsx";
import api from '../utils/api'; // ✨ Import api utility
import toast from 'react-hot-toast'; // ✨ Import toast for notifications

export default function SkillsForm() {
    const navigate = useNavigate();
    const textAreaRef = useRef(null);
    const { resumeData, updateSection } = useResume();

    const [editorText, setEditorText] = useState(resumeData.skills); 
    const [searchTitle, setSearchTitle] = useState(""); // Default to empty
    
    // ✨ New state variables for AI suggestions and loading status
    const [suggestedSkills, setSuggestedSkills] = useState([
        "Data management", "Quality assurance", "Interpersonal communication", 
        "Public speaking", "Team building", "Planning", "Analytical thinking", "Data entry",
    ]);
    const [isLoadingSkills, setIsLoadingSkills] = useState(false);

    useEffect(() => {
        setEditorText(resumeData.skills);
    }, [resumeData.skills]);

    const liveSkillCount = editorText ? editorText.split('\n').filter(line => line.trim()).length : 0;

    const handleEditorChange = (e) => {
        setEditorText(e.target.value);
        updateSection('skills', e.target.value);
    };

    const handleAddSkill = (skill) => {
        const bullet = "• ";
        const newText = editorText ? `${editorText}\n${bullet}${skill}` : `${bullet}${skill}`;
        setEditorText(newText);
        updateSection('skills', newText);
    };
    
    // ✨ New function to handle the AI search
    const handleAiSearch = async (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        if (!searchTitle.trim()) {
            toast.error("Please enter a job title.");
            return;
        }
        setIsLoadingSkills(true);
        setSuggestedSkills([]); // Clear previous suggestions
        try {
            const res = await api.post('/ai/suggest-skills', { jobTitle: searchTitle });
            setSuggestedSkills(res.data.skills);
            toast.success(`AI suggestions for "${searchTitle}" loaded!`);
        } catch (err) {
            console.error("AI Skill Suggestion Error:", err);
            toast.error("Could not get AI suggestions.");
        }
        setIsLoadingSkills(false);
    };
    
    const handleContinue = () => {
        updateSection('skills', editorText);
        navigate("/summary");
    };
    
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-20 bg-blue-900 text-white flex flex-col items-center py-6 space-y-6">{/* ... */}</aside>

            {/* Main Content Area */}
            <main className="flex-1 p-10 relative">
                <h1 className="text-3xl font-bold mb-2">We recommend including 6-8 skills</h1>
                <p className="text-gray-600 mb-8 max-w-lg">Search by job title to get AI-powered skill suggestions.</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
                    
                    {/* AI-Powered Suggestions Panel */}
                    <div className="bg-white p-4 rounded-lg shadow-md col-span-1 border border-gray-200">
                        <form onSubmit={handleAiSearch}>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Search by job title for AI suggestions</label>
                            <div className="flex items-center gap-2 mb-4">
                                <input
                                    type="text"
                                    value={searchTitle}
                                    onChange={(e) => setSearchTitle(e.target.value)}
                                    className="w-full border rounded-md px-3 py-2"
                                    placeholder="e.g., Frontend Developer"
                                />
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold" disabled={isLoadingSkills}>
                                    Search
                                </button>
                            </div>
                        </form>
                        
                        <div className="max-h-96 overflow-y-auto space-y-2">
                            {isLoadingSkills && <p className="text-center text-gray-500">Generating AI suggestions...</p>}
                            {!isLoadingSkills && suggestedSkills.map((skill, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleAddSkill(skill)}
                                    className="flex items-center w-full p-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-yellow-100 transition"
                                >
                                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-300 text-black text-lg mr-2">+</span>
                                    {skill}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Editor Panel */}
                    <div className="col-span-1 flex flex-col space-y-4">
                        <div className="bg-white p-0 rounded-lg flex flex-col border border-gray-300 shadow-md flex-grow">
                            <div className="flex justify-between p-2 border-b border-gray-200">
                                <div className="space-x-3 text-lg">
                                    <button type="button" className="font-bold">B</button>
                                    <button type="button" className="italic">I</button>
                                    <button type="button" className="underline">U</button>
                                </div>
                                <div className="space-x-3 text-lg">
                                    <button type="button">↺</button>
                                    <button type="button">↻</button>
                                    {/* ✨ "Enhance with AI" BUTTON IS REMOVED ✨ */}
                                </div>
                            </div>
                            <textarea
                                ref={textAreaRef}
                                value={editorText || ''}
                                onChange={handleEditorChange}
                                className="flex-1 border-0 rounded-md p-3 resize-none focus:ring-0 h-full"
                                placeholder="Add AI-powered skills or write your own."
                            />
                        </div>
                    </div>
                    
                    {/* Live Count and Preview Panel */}
                    <aside className="col-span-1 p-4 bg-white shadow-lg border border-gray-200 sticky top-4 h-full">
                        <div className="text-center text-3xl font-bold mb-4">
                            {liveSkillCount}
                            <div className="text-sm font-normal text-gray-500">skills added</div>
                        </div>
                        <ResumePreview 
                            formData={resumeData.personalInfo}
                            experiences={resumeData.experiences}
                            educationData={resumeData.education}
                            skills={editorText}
                            summary={resumeData.summary}
                        />
                    </aside>
                </div>

                {/* Footer Buttons */}
                <div className="mt-10 flex justify-between items-center w-full max-w-6xl mx-auto">
                    <button onClick={() => navigate(-1)} className="border border-black rounded-full px-8 py-2 font-bold bg-white hover:bg-gray-100 transition">Back</button>
                    <button onClick={handleContinue} className="bg-blue-600 text-white px-8 py-2 rounded-full font-bold hover:bg-blue-700 transition">Continue</button>
                </div>
            </main>
        </div>
    );
}