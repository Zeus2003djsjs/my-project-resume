// src/pages/ResumeForm.jsx

import React, { useState, useEffect } from "react"; 
import ResumePreview from "../templates/Template1"; // Updated path
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext.jsx"; 

export default function ResumeForm() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { resumeData, updateSection } = useResume(); 

    // Initialize local state with data from context
    const [formData, setFormData] = useState(resumeData.personalInfo); 

    // ✨ ADD THIS useEffect HOOK ✨
    // This effect ensures that if the resume data is loaded from the server
    // after the component has already mounted, the form will update with the new data.
    useEffect(() => {
        setFormData(resumeData.personalInfo);
    }, [resumeData.personalInfo]); // The effect runs whenever personalInfo in the context changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData); // Update local state for immediate UI feedback
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateSection('personalInfo', formData); // Save final state to context and backend
        navigate("/experience");
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-20 bg-blue-900 text-white flex flex-col items-center py-6 space-y-6">
                <div className="w-8 h-8 bg-white text-blue-900 rounded-full flex items-center justify-center font-bold">
                    1
                </div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            </aside>

            {/* Main Form Section */}
            <main className="flex-1 flex flex-col justify-between p-10">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto w-full">
                    <div className="grid grid-cols-2 gap-6 bg-gray-100 p-6 rounded-lg shadow">
                        {/* First Name */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                FIRST NAME
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName || ''}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                                placeholder="Diya"
                            />
                        </div>

                        {/* Surname */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                SURNAME
                            </label>
                            <input
                                type="text"
                                name="surname"
                                value={formData.surname || ''}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                                placeholder="Agarwal"
                            />
                        </div>

                        {/* City */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                CITY
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city || ''}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                                placeholder="New Delhi"
                            />
                        </div>

                        {/* Country */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                COUNTRY
                            </label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country || ''}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                                placeholder="India"
                            />
                        </div>

                        {/* Pin Code */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                PIN CODE
                            </label>
                            <input
                                type="text"
                                name="pin"
                                value={formData.pin || ''}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                                placeholder="110034"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                PHONE
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone || ''}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                                placeholder="+91 11 1234 5677"
                            />
                        </div>

                        {/* Email */}
                        <div className="col-span-2">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                EMAIL*
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                                placeholder="d.agarwal@sample.in"
                            />
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="flex justify-between items-center mt-10">
                    <button className="border border-black rounded-full px-8 py-2 font-bold"
                    onClick={() => navigate("/dashboard")}
                    >
                        Back
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-8 py-2 rounded-full font-bold hover:bg-blue-700 transition"
                    >
                        Continue
                    </button>
                </div>

                {/* Footer Links */}
                <footer className="mt-10 text-center text-xs text-gray-600">
                    <p>
                        Terms | Privacy Policy | Contact Us
                        <br />
                        © 2025, NOW Limited. All rights reserved.
                    </p>
                </footer>
            </main>

            {/* Resume Preview (Clickable) */}
            <aside className="w-1/3 bg-white flex flex-col items-center p-4 shadow-lg">
                <div
                    onClick={() => setShowModal(true)} 
                    className="cursor-pointer hover:scale-105 transition-transform"
                >
                    <ResumePreview formData={formData} />
                </div>

                <a
                    href="#"
                    className="text-blue-600 mt-4 font-semibold hover:underline"
                >
                    Change template
                </a>
            </aside>

            {/* Popup Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 p-6 relative overflow-y-auto max-h-[90vh]">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            ✕
                        </button>
                        <ResumePreview formData={formData} />
                    </div>
                </div>
            )}

        </div>
    );
}