import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ResumePreview from "./ResumePreview"; // Assuming ResumePreview is in the same directory

// --- Helper Components for the Sections ---

// Collapsible Section Wrapper
const AccordionSection = ({ title, icon, children, initialOpen = false }) => {
    const [isOpen, setIsOpen] = useState(initialOpen);

    return (
        <div className="border border-gray-200 rounded-lg bg-white mb-4 shadow-sm">
            <button
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-center">
                    <span className="mr-3 text-xl">{icon}</span>
                    {title}
                </span>
                <span className="text-xl transform transition-transform duration-300">
                    {isOpen ? 'ᐱ' : 'ᐯ'}
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px] p-4 pt-0 border-t border-gray-100' : 'max-h-0'}`}
            >
                {children}
            </div>
        </div>
    );
};

// Reusable Rich Text Editor Component (for Activities, Awards, Custom Section)
const DetailEditor = ({ label, value, onChange, placeholder, onFormat, reference }) => (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
        <div className="flex justify-start space-x-3 mb-2">
            <button type="button" onClick={() => onFormat('bold')} className="font-bold">B</button>
            <button type="button" onClick={() => onFormat('italic')} className="italic">I</button>
            <button type="button" onClick={() => onFormat('underline')} className="underline">U</button>
            <button type="button" className="text-xl">↺</button>
            <button type="button" className="text-xl">↻</button>
        </div>
        <textarea
            ref={reference}
            value={value}
            onChange={onChange}
            className="w-full border-0 p-2 resize-none h-40 focus:ring-0"
            placeholder={placeholder}
        />
    </div>
);

// --- Main Component ---

export default function MoreDetailsForm() {
    const navigate = useNavigate();
    const textAreaRef = useRef(null); // Ref for dynamic formatting

    const [detailsData, setDetailsData] = useState({
        activities: "",
        awards: "",
        certifications: "",
        languages: [{ language: "", proficiency: "" }],
        websites: [{ label: "LinkedIn, GitHub, Personal Website or Portfolio", url: "", header: "" }],
        customSections: [{ sectionName: "Custom Section 1", description: "" }],
        referencesAvailable: false,
        availableUponRequest: true,
    });

    // --- Data and Handlers ---

    const handleTextChange = (e, field) => {
        setDetailsData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleContinue = () => {
        alert("All additional details saved! Moving to final review.");
        // navigate("/finalreview"); // Navigate to the final review page
    };
    
    // LANGUAGE HANDLERS
    const handleLanguageChange = (index, field, value) => {
        const newLanguages = [...detailsData.languages];
        newLanguages[index][field] = value;
        setDetailsData(prev => ({ ...prev, languages: newLanguages }));
    };

    const handleAddLanguage = () => {
        setDetailsData(prev => ({ 
            ...prev, 
            languages: [...prev.languages, { language: "", proficiency: "" }] 
        }));
    };

    // Formatting logic (B/I/U) - Simplified for demo
    const handleFormat = (tag, field) => {
        // In a real app, this logic would need to be complex to target the correct textarea (Activities, Awards, or Custom)
        alert(`Formatting action '${tag}' triggered for field: ${field}`);
    };

    // Dummy data structure for ResumePreview (replace with your actual data mapping)
    const dummyResumeData = {
        firstName: "YN", surname: "NAME", email: "yn@email.com",
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar (No numbered steps visible in video, keeping simple dots) */}
            <aside className="w-20 bg-blue-900 text-white flex flex-col items-center py-6 space-y-6">
                <div className="w-8 h-8 bg-white text-blue-900 border-2 border-green-500 rounded-full flex items-center justify-center font-bold">✓</div>
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
                    <AccordionSection title="Activities" icon="🤸" initialOpen={true}>
                        <p className="text-sm text-gray-500 mb-3">Show that you're a well-rounded individual! This highlights your ability to balance different aspects of your life.</p>
                        <DetailEditor
                            value={detailsData.activities}
                            onChange={(e) => handleTextChange(e, 'activities')}
                            placeholder="It could be anything from Beekeeping to Urban Gardening to Ethical Fashion!"
                            onFormat={(tag) => handleFormat(tag, 'activities')}
                            reference={textAreaRef} // Note: Formatting logic needs refinement to track the active textarea
                        />
                    </AccordionSection>
                    
                    {/* AWARDS, ACCOMPLISHMENTS, AND HONORS SECTION */}
                    <AccordionSection title="Awards, Accomplishments, and Honors" icon="🏆">
                        <p className="text-sm text-gray-500 mb-3">Did you receive awards, exceed targets, earn a leadership role or achieve recognition of some sort? Make them shine in this section.</p>
                        <DetailEditor
                            value={detailsData.awards}
                            onChange={(e) => handleTextChange(e, 'awards')}
                            placeholder="Include anything you've authored or co-authored. For example: a brand logo project, a best selling book"
                            onFormat={(tag) => handleFormat(tag, 'awards')}
                        />
                    </AccordionSection>
                    
                    {/* CERTIFICATIONS AND LICENSES SECTION */}
                    <AccordionSection title="Certifications and Licenses" icon="🎓">
                        <p className="text-sm text-gray-500 mb-3">Elevate your resume with noteworthy credentials that prove you are an expert in your field.</p>
                        <textarea
                            value={detailsData.certifications}
                            onChange={(e) => handleTextChange(e, 'certifications')}
                            className="w-full border p-2 resize-none h-24 focus:ring-0"
                            placeholder="Include certificate or license name and date of issuance"
                        />
                    </AccordionSection>

                    {/* LANGUAGES SECTION */}
                    <AccordionSection title="Languages" icon="🗣️">
                        <p className="text-sm text-gray-500 mb-3">If you are proficient in one or more languages, mention them in this section.</p>
                        {detailsData.languages.map((lang, index) => (
                            <div key={index} className="flex space-x-4 mb-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                                <div className="w-2/3">
                                    <label className="text-xs font-semibold block mb-1">LANGUAGE</label>
                                    <input 
                                        type="text" 
                                        value={lang.language}
                                        onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                                        className="w-full border rounded-md px-3 py-2"
                                        placeholder="Select or type language"
                                    />
                                </div>
                                <div className="w-1/3">
                                    <label className="text-xs font-semibold block mb-1">PROFICIENCY</label>
                                    <select
                                        value={lang.proficiency}
                                        onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                                        className="w-full border rounded-md px-3 py-2 appearance-none"
                                    >
                                        <option>Native</option>
                                        <option>Fluent</option>
                                        <option>Beginner (A1)</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                        <button onClick={handleAddLanguage} className="text-blue-600 text-sm font-semibold hover:underline mt-2">+ Add Another</button>
                    </AccordionSection>
                    
                    {/* WEBSITES AND SOCIAL LINKS SECTION */}
                    <AccordionSection title="Websites and Social Links" icon="🔗">
                        <p className="text-sm text-gray-500 mb-3">Include a direct link to your portfolio or samples of your work for an added boost. Let your skills speak for themselves!</p>
                        {detailsData.websites.map((site, index) => (
                            <div key={index} className="flex space-x-4 mb-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                                <div className="w-full">
                                    <label className="text-xs font-semibold block mb-1">LINK / URL</label>
                                    <input 
                                        type="text" 
                                        value={site.url}
                                        onChange={(e) => { /* Update state logic here */ }}
                                        className="w-full border rounded-md px-3 py-2"
                                        placeholder="LinkedIn, GitHub, Personal Website or Portfolio"
                                    />
                                </div>
                                <div className="w-1/3">
                                    <label className="text-xs font-semibold block mb-1">Add to header</label>
                                    <input 
                                        type="checkbox"
                                        checked={site.header}
                                        onChange={(e) => { /* Update state logic here */ }}
                                        className="mt-3"
                                    />
                                </div>
                            </div>
                        ))}
                        <button onClick={() => { /* Add logic */ }} className="text-blue-600 text-sm font-semibold hover:underline mt-2">+ Add Another</button>
                    </AccordionSection>
                    
                    {/* CUSTOM SECTION */}
                    <AccordionSection title="Add Your Own" icon="✍️">
                        <p className="text-sm text-gray-500 mb-3">Use this space to build a custom section, and make it your own.</p>
                        {detailsData.customSections.map((section, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-xs font-semibold">SECTION NAME</label>
                                    <button className="text-red-500 hover:text-red-700 text-sm">🗑️ Delete</button>
                                </div>
                                <input 
                                    type="text" 
                                    value={section.sectionName}
                                    onChange={(e) => { /* Update state logic here */ }}
                                    className="w-full border rounded-md px-3 py-2 mb-3"
                                    placeholder="Custom Section 1"
                                />
                                <label className="text-xs font-semibold block mb-1">BRIEF DESCRIPTION</label>
                                <DetailEditor
                                    value={section.description}
                                    onChange={(e) => { /* Update state logic here */ }}
                                    placeholder="Volunteer work, Memberships, Interests, etc."
                                    onFormat={(tag) => handleFormat(tag, `custom${index}`)}
                                />
                            </div>
                        ))}
                        <button onClick={() => { /* Add logic */ }} className="text-blue-600 text-sm font-semibold hover:underline mt-2">+ Add Another</button>
                    </AccordionSection>

                    {/* REFERENCES SECTION */}
                    <AccordionSection title="References" icon="🚀">
                        <p className="text-sm text-gray-500 mb-3">Checking the box shows that you are willing to share a point of contact. This builds trust and confidence in your candidacy.</p>
                        <label className="flex items-center space-x-2 text-sm">
                            <input 
                                type="checkbox"
                                checked={detailsData.availableUponRequest}
                                onChange={(e) => setDetailsData(prev => ({ ...prev, availableUponRequest: e.target.checked }))}
                            />
                            <span>Available upon request</span>
                        </label>
                        <div className="mt-4 flex justify-end">
                            <button className="bg-orange-400 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-500 transition text-sm">
                                View more sections
                            </button>
                        </div>
                    </AccordionSection>

                </div>

                {/* Footer Buttons and Terms */}
                <div className="mt-10 flex justify-between items-center w-full max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="border border-black rounded-full px-8 py-2 font-bold bg-white hover:bg-gray-100 transition"
                    >
                        Back
                    </button>

                    <button
                        onClick={handleContinue}
                        className="bg-blue-600 text-white px-8 py-2 rounded-full font-bold hover:bg-blue-700 transition"
                    >
                        Continue
                    </button>
                </div>

                <div className="absolute bottom-2 left-10 text-xs text-gray-500">
                    <a href="#" className="underline hover:text-gray-700">Terms</a> | 
                    <a href="#" className="underline hover:text-gray-700">Privacy Policy</a> | 
                    <a href="#" className="underline hover:text-gray-700">Contact Us</a>
                    <span className="ml-2">© 2025. NOW Limited. All rights reserved.</span>
                </div>
            </main>

            {/* Resume Preview Panel */}
            <aside className="w-96 p-4 bg-white shadow-lg border-l sticky top-0 h-screen overflow-y-auto flex flex-col items-center">
                <ResumePreview 
                    formData={dummyResumeData} 
                    // You would pass the relevant sections of detailsData here
                />
                <div className="text-center mt-4">
                    <button className="text-blue-600 font-semibold hover:underline">
                        Change template
                    </button>
                </div>
            </aside>
        </div>
    );
}