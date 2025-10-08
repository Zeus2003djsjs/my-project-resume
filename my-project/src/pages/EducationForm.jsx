import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ResumePreview from "./ResumePreview"; // Assuming ResumePreview is in the same directory

export default function EducationForm() {
    const navigate = useNavigate();
    const textAreaRef = useRef(null); // Ref for the details editor textarea
    
    // State to control which view is active: basic form (false) or details editor (true)
    const [showDetailsEditor, setShowDetailsEditor] = useState(false); 

    const [educationData, setEducationData] = useState({
        schoolName: "Oxford Software Institute & Oxford School of",
        schoolLocation: "New Delhi, India",
        degree: "",
        fieldOfStudy: "Financial Accounting",
        gradMonth: "",
        gradYear: "",
        isCurrentlyEnrolled: false,
        courseworkDetails: "", 
    });

    // --- Data and Handlers ---
    const degreeOptions = ["Select", "High School Diploma", "Bachelor's Degree", "Master's Degree", "Doctorate", "Certification"];
    const months = ["Month", "January", "February", "March", "April"];
    const years = ["Year", 2025, 2024, 2023, 2022, 2021, 2016]; 
    const suggestions = [
        "Participated in the University's Mentorship Program",
        "Member of the [list the organization or club name here]",
        "Academic Achievements and Honors:",
        "Continuing Education: (list any relevant completed courses here)",
        "3.5 GPA",
        "Semester Abroad at the (insert the name of university here)",
        "Honor Roll (list what semester and year you made the honor roll)"
    ];

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setEducationData(prev => ({ ...prev, [name]: newValue }));
        // Update context here for live preview
    };

    const handleSuggestionClick = (s) => {
        setEducationData(prev => {
            const newText = prev.courseworkDetails.length > 0
                ? prev.courseworkDetails + "\n" + s
                : s;
            return { ...prev, courseworkDetails: newText };
        });
    };
    
    // Formatting logic (B/I/U)
    const handleFormat = (tag) => {
        const textarea = textAreaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentText = educationData.courseworkDetails;
        if (start === end) return;

        const selectedText = currentText.substring(start, end);
        let prefix = '';
        let suffix = '';

        if (tag === 'bold') { prefix = '<b>'; suffix = '</b>'; }
        if (tag === 'italic') { prefix = '<i>'; suffix = '</i>'; }
        if (tag === 'underline') { prefix = '<u>'; suffix = '</u>'; }

        const formattedText = currentText.substring(0, start) +
                              prefix + selectedText + suffix +
                              currentText.substring(end);

        setEducationData(prev => ({ ...prev, courseworkDetails: formattedText }));
        setTimeout(() => {
            textarea.selectionStart = end + prefix.length + suffix.length;
            textarea.selectionEnd = end + prefix.length + suffix.length;
        }, 0);
    };
    
    // Determine the button actions based on the current view state
    const backAction = showDetailsEditor ? () => setShowDetailsEditor(false) : () => navigate(-1);
    const continueAction = showDetailsEditor ? () => setShowDetailsEditor(false) : () => navigate("/skillsform");
    
    const dummyResumeData = {
        firstName: "YN", surname: "NAME", email: "yn@email.com",
    };


    // --- View Rendering Functions ---
    const renderTitle = () => {
        if (showDetailsEditor) {
            return (
                <div className="flex flex-col mb-8 max-w-lg">
                    <h1 className="text-3xl font-bold mb-2">Let’s talk about your education</h1>
                    <p className="text-gray-600">— Add course work or other details</p>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col mb-8 max-w-lg">
                    <h1 className="text-3xl font-bold mb-2">Let’s talk about your education</h1>
                    <p className="text-gray-600">Tell us about any colleges, vocational programs, or training courses you took. Even if you didn’t finish, it’s important to list them.</p>
                </div>
            );
        }
    };

    const renderContent = () => {
        if (showDetailsEditor) {
            // VIEW 2: Coursework Details Editor
            return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
                    {/* Suggestions Panel */}
                    <div className="bg-white p-2 rounded-lg space-y-3">
                        {suggestions.map((s, i) => (
                            <div
                                key={i}
                                className="flex items-start p-3 border border-gray-200 rounded-md shadow-sm cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSuggestionClick(s)}
                            >
                                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-300 text-black mr-3">
                                    +
                                </div>
                                <p className="text-sm text-gray-700">{s}</p>
                            </div>
                        ))}
                    </div>

                    {/* Editor Panel */}
                    <div className="bg-white p-0 rounded-lg flex flex-col border border-gray-300">
                        <div className="flex justify-between p-2 border-b border-gray-200">
                            <div className="space-x-3">
                                <button type="button" onClick={() => handleFormat('bold')} className="font-bold">B</button>
                                <button type="button" onClick={() => handleFormat('italic')} className="italic">I</button>
                                <button type="button" onClick={() => handleFormat('underline')} className="underline">U</button> 
                                <button type="button" className="text-xs">A<span className="text-base align-super">B</span></button>
                            </div>
                            <div className="space-x-3">
                                <button type="button" className="text-xl">↺</button>
                                <button type="button" className="text-xl">↻</button>
                            </div>
                        </div>
                        <textarea
                            ref={textAreaRef}
                            name="courseworkDetails"
                            value={educationData.courseworkDetails}
                            onChange={(e) => setEducationData(prev => ({ ...prev, courseworkDetails: e.target.value }))}
                            className="flex-1 border-0 rounded-md p-3 resize-none h-96 focus:ring-0"
                            placeholder="Type your education details here..."
                        />
                    </div>
                </div>
            );
        } else {
            // VIEW 1: Basic Form Fields
            return (
                <div className="flex-1 max-w-3xl">
                    <div className="grid grid-cols-2 gap-6 bg-gray-100 p-6 rounded-lg shadow">
                        
                        {/* School Name */}
                        <div className="col-span-1">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">SCHOOL NAME</label>
                            <input type="text" name="schoolName" value={educationData.schoolName} onChange={handleFormChange} className="w-full border rounded-md px-3 py-2" placeholder="e.g., Harvard University"/>
                        </div>

                        {/* School Location */}
                        <div className="col-span-1">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">SCHOOL LOCATION</label>
                            <input type="text" name="schoolLocation" value={educationData.schoolLocation} onChange={handleFormChange} className="w-full border rounded-md px-3 py-2" placeholder="e.g., Boston, MA"/>
                        </div>

                        {/* Degree */}
                        <div className="col-span-1">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">DEGREE</label>
                            <select name="degree" value={educationData.degree} onChange={handleFormChange} className="w-full border rounded-md px-3 py-2 appearance-none">
                                {degreeOptions.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                            </select>
                        </div>

                        <div className="col-span-1"></div> {/* Empty space */}

                        {/* Field of Study */}
                        <div className="col-span-1">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">FIELD OF STUDY</label>
                            <input type="text" name="fieldOfStudy" value={educationData.fieldOfStudy} onChange={handleFormChange} className="w-full border rounded-md px-3 py-2" placeholder="e.g., Computer Science"/>
                        </div>

                        {/* Graduation Date */}
                        <div className="col-span-1">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">GRADUATION DATE</label>
                            <div className="flex space-x-2">
                                <select name="gradMonth" value={educationData.gradMonth} onChange={handleFormChange} className="border rounded-md px-3 py-2 w-1/2 appearance-none">
                                    {months.map((m) => (<option key={m} value={m}>{m}</option>))}
                                </select>
                                <select name="gradYear" value={educationData.gradYear} onChange={handleFormChange} className="border rounded-md px-3 py-2 w-1/2 appearance-none">
                                    {years.map((y) => (<option key={y} value={y}>{y}</option>))}
                                </select>
                            </div>
                        </div>

                        {/* I'm still enrolled checkbox */}
                        <div className="col-span-2 mt-2">
                            <label className="flex items-center text-sm text-gray-700">
                                <input type="checkbox" name="isCurrentlyEnrolled" checked={educationData.isCurrentlyEnrolled} onChange={handleFormChange} className="mr-2" />
                                I'm still enrolled
                            </label>
                        </div>

                    </div>

                    {/* Add course work or other details link/button */}
                    <div className="mt-6">
                        <button 
                            type="button" 
                            onClick={() => setShowDetailsEditor(true)} // SWAP CONTENT TO EDITOR VIEW
                            className="text-blue-600 font-semibold hover:underline flex items-center"
                        >
                            + Add course work or other details
                        </button>
                    </div>
                </div>
            );
        }
    };
    
    
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar (Fixed UI) */}
            <aside className="w-20 bg-blue-900 text-white flex flex-col items-center py-6 space-y-6">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <div className="w-8 h-8 bg-white text-blue-900 border-2 border-green-500 rounded-full flex items-center justify-center font-bold">3</div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            </aside>

            {/* Main Content Area (Dynamic Content) */}
            <main className="flex-1 flex flex-col p-10 relative">
                
                {renderTitle()} {/* Renders the appropriate title/subtitle */}
                
                {renderContent()} {/* Renders the appropriate form view */}
                
                {/* Footer Buttons and Terms (Fixed UI) */}
                <div className="mt-20 flex justify-between items-center max-w-3xl">
                    <button
                        type="button"
                        onClick={backAction} // Action determined by current view
                        className="border border-black rounded-full px-8 py-2 font-bold bg-white hover:bg-gray-100 transition"
                    >
                        Back
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/skills")} // Action determined by current view
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

            {/* Resume Preview (Fixed UI) */}
            <aside className="w-96 p-4 bg-white shadow-lg border-l sticky top-0 h-screen overflow-y-auto flex flex-col items-center">
                <ResumePreview 
                    formData={dummyResumeData} 
                    educationData={educationData} // Pass the complete education state
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