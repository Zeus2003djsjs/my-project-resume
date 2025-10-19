// src/pages/SkillsForm.jsx

import React, { useState, useEffect, useRef } from "react"; // Import useEffect
import { useNavigate } from "react-router-dom";
import ResumePreview from "../templates/Template1"; // Updated path
import { useResume } from "../context/ResumeContext.jsx"; // Import the context hook

export default function SkillsForm() {
    const navigate = useNavigate();
    const textAreaRef = useRef(null);
    const { resumeData, updateSection } = useResume(); // Get data and update function

    // Initialize local state with skills data from the context
    const [editorText, setEditorText] = useState(resumeData.skills); 
    const [searchTitle, setSearchTitle] = useState("Software Proficiency"); 
    
    // ✨ This effect keeps the form synchronized with the global state ✨
    useEffect(() => {
        setEditorText(resumeData.skills);
    }, [resumeData.skills]);

    const suggestedSkills = [
        "Calm under pressure", "Conflict resolution", "Attention to detail", 
        "Google drive", "Problem-solving", "Data management", "Quality assurance",
        "Interpersonal communication", "Public speaking", "Team building", "Planning",
        "Analytical thinking", "Data entry", "Excellent communication", "Collaboration",
    ];

    const liveSkillCount = editorText ? editorText.split('\n').filter(line => line.trim()).length : 0;

    // This handler now saves data to the backend on every change
    const handleEditorChange = (e) => {
        setEditorText(e.target.value);
        updateSection('skills', e.target.value); // Save to context and backend
    };

    const handleAddSkill = (skill) => {
        const bullet = "• ";
        const newText = editorText ? `${editorText}\n${bullet}${skill}` : `${bullet}${skill}`;
        setEditorText(newText);
        updateSection('skills', newText); // Save after adding a skill
    };
    
    const handleContinue = () => {
        updateSection('skills', editorText); // Final save before navigating
        navigate("/summary"); // Navigate to the next step
    };
    
    const handleFormat = (tag) => {
        alert(`Formatting button clicked: ${tag}`);
    };
    
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-20 bg-blue-900 text-white flex flex-col items-center py-6 space-y-6">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <div className="w-8 h-8 bg-white text-blue-900 border-2 border-green-500 rounded-full flex items-center justify-center font-bold">4</div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-10 relative">
                <h1 className="text-3xl font-bold mb-2">We recommend including 6-8 skills</h1>
                <p className="text-gray-600 mb-8 max-w-lg">Choose skills that align with the job requirements.</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
                    
                    {/* Skills Suggestions Panel */}
                    <div className="bg-white p-4 rounded-lg shadow-md col-span-1 border border-gray-200">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Search by job title</label>
                        <div className="relative mb-4">
                            <input
                                type="text"
                                value={searchTitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                                className="w-full border rounded-md px-3 py-2 pl-10"
                                placeholder="Job title, industry, or keyword"
                            />
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        
                        <div className="max-h-96 overflow-y-auto space-y-2">
                            {suggestedSkills.map((skill, index) => (
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
                                    <button type="button" onClick={() => handleFormat('bold')} className="font-bold">B</button>
                                    <button type="button" onClick={() => handleFormat('italic')} className="italic">I</button>
                                    <button type="button" onClick={() => handleFormat('underline')} className="underline">U</button>
                                </div>
                                <div className="space-x-3 text-lg">
                                    <button type="button" onClick={() => handleFormat('undo')}>↺</button>
                                    <button type="button" onClick={() => handleFormat('redo')}>↻</button>
                                    <button className="bg-yellow-400 px-3 py-1 rounded-md text-sm font-semibold hover:bg-yellow-500">Enhance with AI</button>
                                </div>
                            </div>
                            <textarea
                                ref={textAreaRef}
                                value={editorText || ''}
                                onChange={handleEditorChange}
                                className="flex-1 border-0 rounded-md p-3 resize-none focus:ring-0 h-full"
                                placeholder="Add ready-to-use skills or write your own."
                            />
                        </div>
                    </div>
                    
                    {/* Live Count and Preview Panel */}
                    <aside className="col-span-1 p-4 bg-white shadow-lg border border-gray-200 sticky top-4 h-full">
                        <div className="text-xs font-semibold mb-2 flex items-center justify-between">
                            Best practice: 
                            <span className="text-green-600 ml-1">Add at least 6-8 skills</span>
                        </div>
                        <div className="text-center text-3xl font-bold mb-4">
                            {liveSkillCount}
                            <div className="text-sm font-normal text-gray-500">skills added</div>
                        </div>
                        <ResumePreview 
                            formData={resumeData.personalInfo}
                            experiences={resumeData.experiences}
                            educationData={resumeData.education}
                            skills={editorText} // Use the live editor text for skills
                            summary={resumeData.summary}
                        />
                        <div className="text-center mt-4">
                            <button className="text-blue-600 font-semibold hover:underline">Change template</button>
                        </div>
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