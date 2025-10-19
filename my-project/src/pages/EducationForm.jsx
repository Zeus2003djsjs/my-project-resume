// src/pages/EducationForm.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ResumePreview from "../templates/Template1"; // Updated path
import { useResume } from "../context/ResumeContext";

export default function EducationForm() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL for editing
    const { resumeData, addEducation, updateEducation } = useResume();

    const [educationData, setEducationData] = useState({
        schoolName: "", schoolLocation: "", degree: "", fieldOfStudy: "",
        gradMonth: "", gradYear: "", isCurrentlyEnrolled: false,
    });

    // Effect to pre-fill form if in edit mode
    useEffect(() => {
        if (id && resumeData.education) {
            const eduToEdit = resumeData.education.find(edu => edu._id === id);
            if (eduToEdit) {
                setEducationData(eduToEdit);
            }
        }
    }, [id, resumeData.education]);


    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setEducationData(prev => ({ ...prev, [name]: newValue }));
    };

    const handleContinue = () => {
        if (id) {
            // We are editing
            updateEducation(id, educationData);
        } else {
            // We are adding a new entry
            addEducation(educationData);
        }
        navigate("/review-education"); // Go to the review page after saving
    };
    
    const degreeOptions = ["Select", "High School Diploma", "Bachelor's Degree", "Master's Degree", "Doctorate", "Certification"];
    const months = ["Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const years = ["Year", ...Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i)];
    
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-20 bg-blue-900 text-white flex flex-col items-center py-6 space-y-6">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <div className="w-8 h-8 bg-white text-blue-900 border-2 border-green-500 rounded-full flex items-center justify-center font-bold">3</div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col p-10 relative">
                <div className="flex flex-col mb-8 max-w-lg">
                    <h1 className="text-3xl font-bold mb-2">{id ? "Edit your education" : "Let’s talk about your education"}</h1>
                    <p className="text-gray-600">Tell us about any colleges, vocational programs, or training courses you took.</p>
                </div>
                
                <div className="flex-1 max-w-3xl">
                    <div className="grid grid-cols-2 gap-6 bg-gray-100 p-6 rounded-lg shadow">
                        {/* School Name */}
                        <div className="col-span-1">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">SCHOOL NAME</label>
                            <input type="text" name="schoolName" value={educationData.schoolName || ''} onChange={handleFormChange} className="w-full border rounded-md px-3 py-2" placeholder="e.g., Harvard University"/>
                        </div>

                        {/* School Location */}
                        <div className="col-span-1">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">SCHOOL LOCATION</label>
                            <input type="text" name="schoolLocation" value={educationData.schoolLocation || ''} onChange={handleFormChange} className="w-full border rounded-md px-3 py-2" placeholder="e.g., Boston, MA"/>
                        </div>

                        {/* Degree */}
                        <div className="col-span-1">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">DEGREE</label>
                            <select name="degree" value={educationData.degree || ''} onChange={handleFormChange} className="w-full border rounded-md px-3 py-2 appearance-none">
                                {degreeOptions.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                            </select>
                        </div>
                        <div className="col-span-1"></div>

                        {/* Field of Study */}
                        <div className="col-span-1">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">FIELD OF STUDY</label>
                            <input type="text" name="fieldOfStudy" value={educationData.fieldOfStudy || ''} onChange={handleFormChange} className="w-full border rounded-md px-3 py-2" placeholder="e.g., Computer Science"/>
                        </div>

                        {/* Graduation Date */}
                        <div className="col-span-1">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">GRADUATION DATE</label>
                            <div className="flex space-x-2">
                                <select name="gradMonth" value={educationData.gradMonth || ''} onChange={handleFormChange} className="border rounded-md px-3 py-2 w-1/2 appearance-none">
                                    {months.map((m) => (<option key={m} value={m}>{m}</option>))}
                                </select>
                                <select name="gradYear" value={educationData.gradYear || ''} onChange={handleFormChange} className="border rounded-md px-3 py-2 w-1/2 appearance-none">
                                    {years.map((y) => (<option key={y} value={y}>{y}</option>))}
                                </select>
                            </div>
                        </div>

                        {/* I'm still enrolled checkbox */}
                        <div className="col-span-2 mt-2">
                            <label className="flex items-center text-sm text-gray-700">
                                <input type="checkbox" name="isCurrentlyEnrolled" checked={educationData.isCurrentlyEnrolled || false} onChange={handleFormChange} className="mr-2" />
                                I'm still enrolled
                            </label>
                        </div>
                    </div>
                </div>
                
                {/* Footer Buttons */}
                <div className="mt-20 flex justify-between items-center max-w-3xl">
                    <button type="button" onClick={() => navigate(-1)} className="border border-black rounded-full px-8 py-2 font-bold bg-white hover:bg-gray-100 transition">Back</button>
                    <button type="button" onClick={handleContinue} className="bg-blue-600 text-white px-8 py-2 rounded-full font-bold hover:bg-blue-700 transition">
                        {id ? "Save Changes" : "Save & Continue"}
                    </button>
                </div>
            </main>

            {/* Resume Preview */}
            <aside className="w-96 p-4 bg-white shadow-lg border-l sticky top-0 h-screen overflow-y-auto flex flex-col items-center">
                <ResumePreview 
                    formData={resumeData.personalInfo}
                    experiences={resumeData.experiences}
                    educationData={[educationData]} // Use the live form data for education
                    skills={resumeData.skills}
                    summary={resumeData.summary}
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