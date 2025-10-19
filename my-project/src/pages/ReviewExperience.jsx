// src/pages/ReviewExperience.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResumePreview from "../templates/Template1"; // Updated path
import { useResume } from '../context/ResumeContext';

const ExperienceCard = ({ job, onDelete, onEdit }) => {
  const duration = `${job.startMonth || ''} ${job.startYear || ''} - ${job.current ? 'Present' : (job.endMonth ? `${job.endMonth} ` : '') + (job.endYear || '')}`;

  const bulletPoints = (job.description || '')
    .split('\n')
    .filter(line => line.trim())
    .map((line, index) => (
      <li key={index} className="list-disc list-inside" dangerouslySetInnerHTML={{ __html: line.trim() }} />
    ));

  return (
    <div className="border border-gray-200 p-6 rounded-lg mb-4 shadow-sm relative">
      <div className="flex items-start">
        <div className="w-1/2 pr-4">
          <p className="font-semibold text-lg">{job.jobTitle || 'Job Title'}, {job.employer || 'Employer'}</p>
          <p className="text-sm text-gray-600">{duration}</p>
        </div>
        <div className="w-1/2 pl-4">
          {bulletPoints.length > 0 ? (
            <ul className="text-sm text-gray-800 list-disc list-inside">{bulletPoints}</ul>
          ) : (
            <p className="text-sm text-gray-800">No description provided.</p>
          )}
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end space-x-3">
        <button
          onClick={() => onEdit(job._id)}
          className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <span className="mr-1">✏️</span> Edit
        </button>
        <button
          onClick={() => onDelete(job._id)}
          className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium"
        >
          <span className="mr-1">🗑️</span> Delete
        </button>
      </div>
    </div>
  );
};

export default function ReviewExperience() {
    const navigate = useNavigate();
    const { resumeData, deleteExperience } = useResume();
    const { experiences, personalInfo } = resumeData;

    // ✨ THIS FUNCTION IS NOW IMPLEMENTED ✨
    const handleEdit = (id) => {
        // Navigate to the experience form with the specific ID
        navigate(`/experience/${id}`);
    };

    const handleAddExperience = () => {
        navigate('/experience');
    };
    
    const handleContinue = () => {
        navigate('/education');
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-20 bg-blue-900 text-white flex flex-col items-center py-6 space-y-6">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                <div className="w-8 h-8 bg-white text-blue-900 border-2 border-green-500 rounded-full flex items-center justify-center font-bold">2</div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-10 relative">
                <h1 className="text-3xl font-bold mb-8">Review your experience</h1>
                <div className="mb-10 max-w-2xl mx-auto">
                    {experiences && experiences.length > 0 ? (
                        experiences.map((job) => (
                            <ExperienceCard 
                                key={job._id}
                                job={job} 
                                onDelete={deleteExperience} 
                                onEdit={handleEdit} 
                            />
                        ))
                    ) : (
                        <p className="text-gray-600 text-center">No experience entries added yet. Click "Add another experience" to get started!</p>
                    )}
                     <button
                        onClick={handleAddExperience}
                        className="w-full mt-4 bg-orange-400 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-500 transition"
                    >
                        + Add another experience
                    </button>
                </div>

                {/* Footer Buttons */}
                <div className="mt-10 flex justify-between items-center w-full max-w-2xl mx-auto">
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
            </main>

            {/* Resume Preview */}
            <aside className="w-96 p-4 bg-white shadow-lg border-l sticky top-0 h-screen overflow-y-auto flex flex-col items-center">
                <ResumePreview 
                    formData={personalInfo} 
                    experiences={experiences} // ✨ Pass the entire experiences array
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