// src/pages/MoreDetailsForm.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResumePreview from "../templates/Template1"; // Updated path
import { useResume } from "../context/ResumeContext"; // Import the context hook

// --- Reusable Components ---
const AccordionSection = ({ title, icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-lg bg-white mb-4 shadow-sm">
            <button
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-center"><span className="mr-3 text-xl">{icon}</span>{title}</span>
                <span className="text-xl transform transition-transform duration-300">{isOpen ? 'ᐱ' : 'ᐯ'}</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px] p-4 pt-0 border-t' : 'max-h-0'}`}>
                {children}
            </div>
        </div>
    );
};

// --- Main Form Component ---
export default function MoreDetailsForm() {
    const navigate = useNavigate();
    const { resumeData, updateSection } = useResume(); // Get real data and update function

    // Initialize local state with data from the context
    const [detailsData, setDetailsData] = useState(resumeData.moreDetails || {
        activities: "",
        awards: "",
        certifications: "",
        languages: [{ language: "", proficiency: "" }],
    });

    // Effect to sync with global state changes
    useEffect(() => {
        setDetailsData(resumeData.moreDetails || {
            activities: "", awards: "", certifications: "", languages: [{ language: "", proficiency: "" }],
        });
    }, [resumeData.moreDetails]);

    // Universal handler for simple text inputs
    const handleTextChange = (e) => {
        const { name, value } = e.target;
        const updatedDetails = { ...detailsData, [name]: value };
        setDetailsData(updatedDetails);
        updateSection('moreDetails', updatedDetails); // Save to backend
    };

    // Handler for the languages section
    const handleLanguageChange = (index, field, value) => {
        const newLanguages = [...(detailsData.languages || [])];
        newLanguages[index] = { ...newLanguages[index], [field]: value };
        const updatedDetails = { ...detailsData, languages: newLanguages };
        setDetailsData(updatedDetails);
        updateSection('moreDetails', updatedDetails);
    };

    const handleAddLanguage = () => {
        const newLanguages = [...(detailsData.languages || []), { language: "", proficiency: "" }];
        const updatedDetails = { ...detailsData, languages: newLanguages };
        setDetailsData(updatedDetails);
        updateSection('moreDetails', updatedDetails);
    };
    
    const handleContinue = () => {
        updateSection('moreDetails', detailsData); // Final save
        alert("Congratulations! Your resume is complete.");
        navigate("/finalize"); // ✨ CHANGE THIS LINE ✨
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-20 bg-blue-900 text-white flex flex-col items-center py-6 space-y-6">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-10 relative">
                <h1 className="text-3xl font-bold mb-2">Add More Details</h1>
                <p className="text-gray-600 mb-8 max-w-xl">This is an opportunity to highlight qualifications that don't fit into standard resume sections.</p>

                <div className="max-w-4xl mx-auto">
                    
                    {/* ACTIVITIES SECTION */}
                    <AccordionSection title="Activities" icon="🤸">
                        <textarea name="activities" value={detailsData.activities || ''} onChange={handleTextChange} className="w-full border p-2 resize-none h-24" placeholder="e.g., Volunteer work, interests, etc."/>
                    </AccordionSection>
                    
                    {/* AWARDS SECTION */}
                    <AccordionSection title="Awards, Accomplishments, and Honors" icon="🏆">
                         <textarea name="awards" value={detailsData.awards || ''} onChange={handleTextChange} className="w-full border p-2 resize-none h-24" placeholder="e.g., Employee of the Month, Dean's List"/>
                    </AccordionSection>
                    
                    {/* CERTIFICATIONS SECTION */}
                    <AccordionSection title="Certifications and Licenses" icon="🎓">
                        <textarea name="certifications" value={detailsData.certifications || ''} onChange={handleTextChange} className="w-full border p-2 resize-none h-24" placeholder="e.g., Certified Professional Resume Writer (CPRW)"/>
                    </AccordionSection>

                    {/* LANGUAGES SECTION */}
                    <AccordionSection title="Languages" icon="🗣️">
                        {(detailsData.languages || []).map((lang, index) => (
                            <div key={index} className="flex space-x-4 mb-3 p-3 bg-gray-50 rounded-md border">
                                <input type="text" value={lang.language || ''} onChange={(e) => handleLanguageChange(index, 'language', e.target.value)} className="w-2/3 border rounded-md px-3 py-2" placeholder="Language"/>
                                <select value={lang.proficiency || ''} onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)} className="w-1/3 border rounded-md px-3 py-2">
                                    <option>Select Proficiency</option><option>Native</option><option>Fluent</option><option>Intermediate</option><option>Beginner</option>
                                </select>
                            </div>
                        ))}
                        <button onClick={handleAddLanguage} className="text-blue-600 text-sm font-semibold hover:underline mt-2">+ Add Another</button>
                    </AccordionSection>
                </div>

                {/* Footer Buttons */}
                <div className="mt-10 flex justify-between items-center w-full max-w-4xl mx-auto">
                    <button onClick={() => navigate(-1)} className="border border-black rounded-full px-8 py-2 font-bold bg-white hover:bg-gray-100 transition">Back</button>
                    <button onClick={handleContinue} className="bg-blue-600 text-white px-8 py-2 rounded-full font-bold hover:bg-blue-700 transition">Finish</button>
                </div>
            </main>

            {/* Resume Preview */}
            <aside className="w-96 p-4 bg-white shadow-lg border-l sticky top-0 h-screen overflow-y-auto flex flex-col items-center">
                 <ResumePreview 
                    formData={resumeData.personalInfo}
                    experiences={resumeData.experiences}
                    educationData={resumeData.education}
                    skills={resumeData.skills}
                    summary={resumeData.summary}
                    moreDetails={detailsData} // ✨ ADD THIS LINE (using live form data)
                />  

                <div className="text-center mt-4">
                    <button className="text-blue-600 font-semibold hover:underline">Change template</button>
                </div>
            </aside>
        </div>
    );
}