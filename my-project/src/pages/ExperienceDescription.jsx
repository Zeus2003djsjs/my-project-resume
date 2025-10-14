// src/pages/ExperienceDescription.jsx

import { useState, useRef, useEffect } from "react";
import ResumePreview from "./ResumePreview";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import { useResume } from "../context/ResumeContext";

export default function ExperienceDescription() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL
  const textAreaRef = useRef(null);
  // Get both add and update functions from context
  const { resumeData, addExperience, updateExperience } = useResume(); 

  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");

  // This effect pre-fills the form with data for editing
  useEffect(() => {
    // We use the draft, which was set in the previous step
    const draft = resumeData.currentJobDraft;
    if (draft) {
      setJobTitle(draft.jobTitle || "Job Title");
      setDescription(draft.description || "");
    }
  }, [resumeData.currentJobDraft]);

  const [suggestions] = useState([
    "Completed day-to-day duties accurately and efficiently.",
    "Contributed innovative ideas and solutions to enhance team performance and outcomes.",
    "Worked successfully with diverse group of coworkers to accomplish goals and address issues related to our products.",
  ]);

  const handleFormat = (tag) => { /* ... */ };

  const handleContinue = () => {
    const finalData = {
      // Combine the draft with the current description and job title
      ...resumeData.currentJobDraft,
      description,
      jobTitle,
    };

    if (id) {
      // If an ID exists, we are editing. Call the update function.
      updateExperience(id, finalData);
    } else {
      // Otherwise, we are adding a new experience.
      addExperience(finalData);
    }
    navigate("/review-experience"); // Go back to the review page
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-20 bg-blue-900 text-white flex flex-col items-center py-6 space-y-6">
        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
        <div className="w-8 h-8 bg-blue-900 text-white border-2 border-white rounded-full flex items-center justify-center font-bold">2</div>
        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-2">
          {id ? "Edit the description" : "Next, write about what you did"} as a{" "}
          <span className="text-blue-700">{jobTitle}</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Pick from our ready-to-use phrases or write your own.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Suggestions */}
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Search by job title
            </label>
            <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="w-full border rounded-md px-3 py-2 mb-4"/>
            <p className="text-xs text-gray-500 mb-2">Showing {suggestions.length} results for <b>{jobTitle}</b></p>
            <div className="space-y-3 overflow-y-auto max-h-80">
              {suggestions.map((s, i) => (
                <div key={i} className="flex items-start p-3 bg-white rounded-md shadow-sm cursor-pointer hover:bg-gray-50"
                  onClick={() => setDescription(prev => prev.length > 0 ? prev + "\n" + s : s)}>
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-300 text-black mr-2">+</div>
                  <p className="text-sm text-gray-700">{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col">
            <div className="flex justify-between mb-2">
              <div className="space-x-3">
                <button type="button" onClick={() => handleFormat('bold')} className="font-bold">B</button>
                <button type="button" onClick={() => handleFormat('italic')} className="italic">I</button>
                <button type="button" onClick={() => handleFormat('underline')} className="underline">U</button>
              </div>
              <button className="bg-yellow-400 px-3 py-1 rounded-md text-sm font-semibold hover:bg-yellow-500">✨ Enhance with AI</button>
            </div>
            <textarea ref={textAreaRef} value={description} onChange={(e) => setDescription(e.target.value)} className="flex-1 border rounded-md px-3 py-2 resize-none h-72"/>
          </div>

          {/* Resume Preview */}
          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
            <ResumePreview formData={resumeData.personalInfo} experiences={[{...resumeData.currentJobDraft, description: description}]}/>
            <a href="#" className="text-blue-600 mt-4 font-semibold hover:underline">Change template</a>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center mt-10">
          <button onClick={() => navigate(-1)} className="border border-black rounded-full px-8 py-2 font-bold">Back</button>
          <button onClick={handleContinue} className="bg-blue-600 text-white px-8 py-2 rounded-full font-bold hover:bg-blue-700 transition">Continue</button>
        </div>
      </main>
    </div>
  );
}