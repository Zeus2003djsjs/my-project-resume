// src/pages/ResumeForm.jsx

import React, { useState, useEffect } from "react";
import ResumePreview from "../templates/Template1";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext.jsx";
import toast from 'react-hot-toast';

export default function ResumeForm() {
    const navigate = useNavigate();
    const { resumeData, updateSection } = useResume();

    const [formData, setFormData] = useState(resumeData.personalInfo);
    const [errors, setErrors] = useState({}); // State to hold validation errors

    useEffect(() => {
        setFormData(resumeData.personalInfo);
    }, [resumeData.personalInfo]);

    // ✨ NEW VALIDATION FUNCTION ✨
    const validateForm = () => {
        const newErrors = {};
        // Required field checks
        if (!formData.firstName?.trim()) newErrors.firstName = "First name is required.";
        if (!formData.surname?.trim()) newErrors.surname = "Surname is required.";
        
        // Email validation
        if (!formData.email?.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email format is invalid.";
        }

        // Optional numeric checks
        if (formData.pin && !/^\d+$/.test(formData.pin)) {
            newErrors.pin = "Pin code must contain only numbers.";
        }
        if (formData.phone && !/^[+\d\s()-]+$/.test(formData.phone)) {
            newErrors.phone = "Phone number contains invalid characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear the error for a field as the user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate the form before proceeding
        if (validateForm()) {
            updateSection('personalInfo', formData);
            toast.success("Personal Info Saved!");
            navigate("/experience");
        } else {
            toast.error("Please fix the errors to continue.");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-20 bg-blue-900 text-white flex flex-col items-center py-6 space-y-6">
                 <div className="w-8 h-8 bg-white text-blue-900 rounded-full flex items-center justify-center font-bold">1</div>
                 <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                 <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                 <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            </aside>

            {/* Main Form Section */}
            <main className="flex-1 flex flex-col justify-between p-10">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto w-full">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        
                        {/* First Name with Error Message */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">FIRST NAME*</label>
                            <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} className={`w-full border rounded-md px-3 py-2 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>

                        {/* Surname with Error Message */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">SURNAME*</label>
                            <input type="text" name="surname" value={formData.surname || ''} onChange={handleChange} className={`w-full border rounded-md px-3 py-2 ${errors.surname ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.surname && <p className="text-red-500 text-xs mt-1">{errors.surname}</p>}
                        </div>

                        {/* City */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">CITY</label>
                            <input type="text" name="city" value={formData.city || ''} onChange={handleChange} className="w-full border rounded-md px-3 py-2 border-gray-300" />
                        </div>

                        {/* Country */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">COUNTRY</label>
                            <input type="text" name="country" value={formData.country || ''} onChange={handleChange} className="w-full border rounded-md px-3 py-2 border-gray-300" />
                        </div>

                        {/* Pin Code with Error Message */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">PIN CODE</label>
                            <input type="text" name="pin" value={formData.pin || ''} onChange={handleChange} className={`w-full border rounded-md px-3 py-2 ${errors.pin ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.pin && <p className="text-red-500 text-xs mt-1">{errors.pin}</p>}
                        </div>

                        {/* Phone with Error Message */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">PHONE</label>
                            <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} className={`w-full border rounded-md px-3 py-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>

                        {/* Email with Error Message */}
                        <div className="col-span-2">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">EMAIL*</label>
                            <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className={`w-full border rounded-md px-3 py-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="flex justify-between items-center mt-10 max-w-4xl mx-auto w-full">
                    <button onClick={() => navigate("/dashboard")} className="border border-black rounded-full px-8 py-2 font-bold hover:bg-gray-100">Back</button>
                    <button onClick={handleSubmit} className="bg-blue-600 text-white px-8 py-2 rounded-full font-bold hover:bg-blue-700 transition">Continue</button>
                </div>
            </main>

            {/* Resume Preview */}
            <aside className="w-1/3 bg-white flex flex-col items-center p-4 shadow-lg">
                <ResumePreview formData={formData} />
            </aside>
        </div>
    );
}