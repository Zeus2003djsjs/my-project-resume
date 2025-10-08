import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import ResumePreview from "./ResumePreview"; // ✅ if you already have this component
import { useResume } from "../context/ResumeContext.jsx";


export default function ExperienceForm() {

  const [formData, setFormData] = useState({
    jobTitle: "",
    employer: "",
    city: "",
    country: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    current: false,
  });
  const navigate = useNavigate(); // ✅ initialize navigation
  const { setExperience } = useResume();


  const handleChange = (e) => {
  const newData = { ...formData, [e.target.name]: e.target.value };
  setFormData(newData);
  setExperience(newData); // ✅ Add this line — updates preview live
};


  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Experience saved ✅");
    navigate("/education"); // ⬅️ optional next step (can change)
  };
  const { personalInfo } = useResume(); // ✅ get saved info


  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-20 bg-[#1c2756] text-white flex flex-col items-center py-6 space-y-6">
        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
          ✓
        </div>
        <div className="w-8 h-8 bg-white text-[#1c2756] border-2 border-green-500 rounded-full flex items-center justify-center font-bold">
          2
        </div>
        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 flex flex-col p-10">
        <h1 className="text-3xl font-bold mb-2">
          Let’s work on your experience
        </h1>
        <p className="text-gray-600 mb-8">
          Start with your most recent job first.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 bg-gray-100 p-6 rounded-lg shadow">
            {/* Job Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                JOB TITLE
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Retail Sales Associate"
              />
            </div>

            {/* Employer */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                EMPLOYER
              </label>
              <input
                type="text"
                name="employer"
                value={formData.employer}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                placeholder="ZARA"
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
                value={formData.city}
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
                value={formData.country}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                placeholder="India"
              />
            </div>

            {/* START DATE */}
<div>
  <label className="block text-xs font-semibold text-gray-700 mb-1">
    START DATE
  </label>
  <div className="flex space-x-2">
    <select
      name="startMonth"
      value={formData.startMonth}
      onChange={handleChange}
      className="w-1/2 border rounded-md px-3 py-2"
    >
      <option value="">Month</option>
      {[
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ].map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>

    <select
      name="startYear"
      value={formData.startYear}
      onChange={handleChange}
      className="w-1/2 border rounded-md px-3 py-2"
    >
      <option value="">Year</option>
      {Array.from({ length: 50 }, (_, i) => 1980 + i).map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>
</div>

{/* END DATE */}
<div>
  <label className="block text-xs font-semibold text-gray-700 mb-1">
    END DATE
  </label>
  <div className="flex space-x-2">
    <select
      name="endMonth"
      value={formData.endMonth}
      onChange={handleChange}
      className="w-1/2 border rounded-md px-3 py-2"
      disabled={formData.currentlyWorking}
    >
      <option value="">Month</option>
      {[
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ].map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>

    <select
      name="endYear"
      value={formData.endYear}
      onChange={handleChange}
      className="w-1/2 border rounded-md px-3 py-2"
      disabled={formData.currentlyWorking}
    >
      <option value="">Year</option>
      {Array.from({ length: 50 }, (_, i) => 1980 + i).map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>

  <label className="flex items-center space-x-2 mt-2 text-sm text-gray-700">
    <input
      type="checkbox"
      name="currentlyWorking"
      checked={formData.currentlyWorking || false}
      onChange={(e) =>
        setFormData({ ...formData, currentlyWorking: e.target.checked })
      }
    />
    <span>I currently work here</span>
  </label>
</div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-10">
            <button
              type="button"
              onClick={() => navigate("/resumeform")} // ✅ goes back to previous page
              className="border border-black rounded-full px-8 py-2 font-bold hover:bg-gray-100 transition"
            >
              Back
            </button>

            <button
              type="button"
              onClick={() => navigate("/experience-description")}
              className="bg-blue-600 text-white px-8 py-2 rounded-full font-bold hover:bg-blue-700 transition"
            >
              Continue
            </button>
          </div>
        </form>
      </main>

      {/* Resume Preview */}
      <aside className="w-1/3 bg-white flex flex-col items-center p-4 shadow-lg">
        <ResumePreview formData={{}} experienceData={formData} />

        <a
          href="#"
          className="text-blue-600 mt-4 font-semibold hover:underline"
        >
          Change template
        </a>
      </aside>
    </div>
  );
}
