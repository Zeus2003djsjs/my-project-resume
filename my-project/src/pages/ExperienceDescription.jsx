// src/pages/ExperienceDescription.jsx

import { useState, useRef, useEffect } from "react";
import ResumePreview from "../templates/Template1";
import { useNavigate, useParams } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import api from "../utils/api"; // ✨ Import the api utility
import toast from 'react-hot-toast'; // ✨ Import toast for notifications

export default function ExperienceDescription() {
  const navigate = useNavigate();
  const { id } = useParams();
  const textAreaRef = useRef(null);
  const { resumeData, addExperience, updateExperience } = useResume();

  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false); // ✨ State for loading indicator

  useEffect(() => {
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

  // ✨ NEW FUNCTION TO HANDLE THE AI BUTTON CLICK ✨
  const handleEnhance = async () => {
    if (!description || description.trim() === '') {
        toast.error("Please write a description first.");
        return;
    }
    setIsEnhancing(true);
    try {
        const res = await api.post('/ai/enhance', { text: description, promptType: 'experience description' });
        setDescription(res.data.enhancedText); // Update the text area with the AI's response
        toast.success("Description enhanced by AI!");
    } catch (err) {
        console.error("AI enhancement failed:", err);
        toast.error("Sorry, AI enhancement failed.");
    }
    setIsEnhancing(false);
  };

  const handleContinue = () => {
    const finalData = { ...resumeData.currentJobDraft, description, jobTitle };

    if (id) {
      updateExperience(id, finalData);
    } else {
      addExperience(finalData);
    }
    navigate("/review-experience");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-20 bg-blue-900 text-white flex flex-col items-center py-6 space-y-6">{/* ... */}</aside>

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
          <div className="bg-gray-100 p-6 rounded-lg shadow">{/* ... */}</div>

          {/* Editor */}
          <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col">
            <div className="flex justify-between mb-2">
              <div className="space-x-3">
                <button type="button" onClick={() => handleFormat('bold')} className="font-bold">B</button>
                <button type="button" onClick={() => handleFormat('italic')} className="italic">I</button>
                <button type="button" onClick={() => handleFormat('underline')} className="underline">U</button>
              </div>
              {/* ✨ UPDATED AI BUTTON ✨ */}
              <button
                onClick={handleEnhance}
                disabled={isEnhancing}
                className="bg-yellow-400 px-3 py-1 rounded-md text-sm font-semibold hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isEnhancing ? "Enhancing..." : "✨ Enhance with AI"}
              </button>
            </div>
            <textarea ref={textAreaRef} value={description} onChange={(e) => setDescription(e.target.value)} className="flex-1 border rounded-md px-3 py-2 resize-none h-72"/>
          </div>

          {/* Resume Preview */}
          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
            <ResumePreview experiences={[{...resumeData.currentJobDraft, description: description}]} formData={resumeData.personalInfo} />
            
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