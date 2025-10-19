// src/pages/ReviewEducation.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResumePreview from "../templates/Template1"; // Updated path
import { useResume } from '../context/ResumeContext';

// Card component for a single education entry
const EducationCard = ({ edu, onDelete, onEdit }) => {
  const gradDate = `${edu.gradMonth || ''} ${edu.gradYear || ''}`;

  return (
    <div className="border border-gray-200 p-6 rounded-lg mb-4 shadow-sm relative">
      <div className="pr-4">
        <p className="font-semibold text-lg">{edu.schoolName || 'School Name'}</p>
        <p className="text-sm text-gray-600">{edu.degree || 'Degree'}, {edu.fieldOfStudy || 'Field of Study'}</p>
        <p className="text-sm text-gray-600">{gradDate}</p>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end space-x-3">
        <button
          onClick={() => onEdit(edu._id)}
          className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <span className="mr-1">✏️</span> Edit
        </button>
        <button
          onClick={() => onDelete(edu._id)}
          className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium"
        >
          <span className="mr-1">🗑️</span> Delete
        </button>
      </div>
    </div>
  );
};

// Main review page component
export default function ReviewEducation() {
    const navigate = useNavigate();
    const { resumeData, deleteEducation } = useResume();
    const { education, personalInfo } = resumeData;

    const handleEdit = (id) => {
        navigate(`/education/${id}`);
    };

    const handleAddEducation = () => {
        navigate('/education');
    };
    
    const handleContinue = () => {
        navigate('/skills'); // Navigate to the next step
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-20 bg-blue-900 text-white flex flex-col items-center py-6 space-y-6">
                 {/* ... (your sidebar steps) ... */}
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <div className="w-8 h-8 bg-white text-blue-900 border-2 border-green-500 rounded-full flex items-center justify-center font-bold">3</div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-10 relative">
                <h1 className="text-3xl font-bold mb-8">Review your education</h1>
                <div className="mb-10 max-w-2xl mx-auto">
                    {education && education.length > 0 ? (
                        education.map((edu) => (
                            <EducationCard 
                                key={edu._id}
                                edu={edu} 
                                onDelete={deleteEducation} 
                                onEdit={handleEdit} 
                            />
                        ))
                    ) : (
                        <p className="text-gray-600 text-center">No education entries added yet.</p>
                    )}
                     <button
                        onClick={handleAddEducation}
                        className="w-full mt-4 bg-orange-400 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-500 transition"
                    >
                        + Add another education
                    </button>
                </div>

                {/* Footer Buttons */}
                <div className="mt-10 flex justify-between items-center w-full max-w-2xl mx-auto">
                    <button
                        onClick={() => navigate('/review-experience')} // Go back to the previous review page
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
            </main>

            {/* Resume Preview */}
            <aside className="w-96 p-4 bg-white shadow-lg border-l sticky top-0 h-screen overflow-y-auto flex flex-col items-center">
                <ResumePreview 
                    formData={personalInfo} 
                    educationData={education} // Pass the whole array to the preview
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