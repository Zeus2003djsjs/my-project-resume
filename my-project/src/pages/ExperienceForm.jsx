// src/pages/ExperienceForm.jsx

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import ResumePreview from "../templates/Template1"; // Updated path
import { useResume } from "../context/ResumeContext.jsx";

export default function ExperienceForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL if it exists
  const { resumeData, updateSection } = useResume(); 

  const [formData, setFormData] = useState({
    jobTitle: "", employer: "", city: "", country: "",
    startMonth: "", startYear: "", endMonth: "", endYear: "", current: false,
  });

  // This effect checks if we are in "edit mode"
  useEffect(() => {
    if (id && resumeData.experiences) {
      // Find the specific experience entry from the global state
      const experienceToEdit = resumeData.experiences.find(exp => exp._id === id);
      if (experienceToEdit) {
        setFormData(experienceToEdit); // Pre-fill the form with its data
      }
    }
  }, [id, resumeData.experiences]); // Rerun if the ID or experiences data changes

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const handleContinue = () => {
    // The existing 'id' tells us we are editing
    const draftData = id ? { ...formData, _id: id } : formData;
    updateSection('currentJobDraft', draftData);
    
    // Navigate to the correct description page (with or without ID)
    navigate(id ? `/experience-description/${id}` : "/experience-description");
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-20 bg-[#1c2756] text-white flex flex-col items-center py-6 space-y-6">
        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
        <div className="w-8 h-8 bg-white text-[#1c2756] border-2 border-green-500 rounded-full flex items-center justify-center font-bold">2</div>
        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 flex flex-col p-10">
        <h1 className="text-3xl font-bold mb-2">
            {id ? "Edit your experience" : "Let’s work on your experience"}
        </h1>
        <p className="text-gray-600 mb-8">
            {id ? "Make any changes you need below." : "Start with your most recent job first."}
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-6 bg-gray-100 p-6 rounded-lg shadow">
            {/* Form fields remain the same, but are now controlled by the updated state */}
            {/* Job Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">JOB TITLE</label>
              <input type="text" name="jobTitle" value={formData.jobTitle || ''} onChange={handleChange} className="w-full border rounded-md px-3 py-2"/>
            </div>
            {/* Employer */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">EMPLOYER</label>
              <input type="text" name="employer" value={formData.employer || ''} onChange={handleChange} className="w-full border rounded-md px-3 py-2"/>
            </div>
             {/* City */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">CITY</label>
              <input type="text" name="city" value={formData.city || ''} onChange={handleChange} className="w-full border rounded-md px-3 py-2"/>
            </div>
            {/* Country */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">COUNTRY</label>
              <input type="text" name="country" value={formData.country || ''} onChange={handleChange} className="w-full border rounded-md px-3 py-2"/>
            </div>
            {/* START DATE */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">START DATE</label>
              <div className="flex space-x-2">
                <select name="startMonth" value={formData.startMonth || ''} onChange={handleChange} className="w-1/2 border rounded-md px-3 py-2"><option value="">Month</option>{["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => <option key={m} value={m}>{m}</option>)}</select>
                <select name="startYear" value={formData.startYear || ''} onChange={handleChange} className="w-1/2 border rounded-md px-3 py-2"><option value="">Year</option>{Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(y => <option key={y} value={y}>{y}</option>)}</select>
              </div>
            </div>
            {/* END DATE */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">END DATE</label>
              <div className="flex space-x-2">
                <select name="endMonth" value={formData.endMonth || ''} onChange={handleChange} className="w-1/2 border rounded-md px-3 py-2" disabled={formData.current}><option value="">Month</option>{["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => <option key={m} value={m}>{m}</option>)}</select>
                <select name="endYear" value={formData.endYear || ''} onChange={handleChange} className="w-1/2 border rounded-md px-3 py-2" disabled={formData.current}><option value="">Year</option>{Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(y => <option key={y} value={y}>{y}</option>)}</select>
              </div>
              <label className="flex items-center space-x-2 mt-2 text-sm text-gray-700">
                <input type="checkbox" name="current" checked={formData.current || false} onChange={handleChange}/>
                <span>I currently work here</span>
              </label>
            </div>
          </div>
          {/* Footer */}
          <div className="flex justify-between items-center mt-10">
            <button type="button" onClick={() => navigate(-1)} className="border border-black rounded-full px-8 py-2 font-bold hover:bg-gray-100 transition">Back</button>
            <button type="button" onClick={handleContinue} className="bg-blue-600 text-white px-8 py-2 rounded-full font-bold hover:bg-blue-700 transition">Continue</button>
          </div>
        </form>
      </main>
      {/* Resume Preview */}
      <aside className="w-1/3 bg-white flex flex-col items-center p-4 shadow-lg">
        <ResumePreview formData={resumeData.personalInfo} experiences={[formData]} />
        
      </aside>
    </div>
  );
}