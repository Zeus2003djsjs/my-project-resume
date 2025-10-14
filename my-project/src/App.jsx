// src/App.jsx (Final Corrected Version)

// 🛑 REMOVED: import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// 🛑 REMOVED: import { ResumeProvider } from './context/ResumeContext';
// 🛑 ADDED: We only import the necessary components and the Routes/Route functions.

import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ResumeForm from "./pages/ResumeForm";
import Login from "./pages/Login"; 
import Register from "./pages/Register"; // 👈 Import the new component
import ExperienceForm from "./pages/ExperienceForm";
import ExperienceDescription from "./pages/ExperienceDescription";
import ReviewExperience from "./pages/ReviewExperience.jsx";
import ReviewEducation from "./pages/ReviewEducation.jsx";
import EducationForm from "./pages/EducationForm.jsx";
import SkillsForm from "./pages/SkillsForm.jsx";
import SummaryForm from "./pages/SummaryForm.jsx"; 
import MoreDetailsForm from "./pages/MoreDetailsForm.jsx";
import Finalize from "./pages/Finalize.jsx"; // ✨ IMPORT THE NEW PAGE

function App() {
  return (
    // 🛑 CORRECT: The component now only defines the routing structure.
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} /> {/* 👈 Add this route */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/resumeform" element={<ResumeForm />} />
      <Route path="/myresumes" element={<h1>My Resumes Page (WIP)</h1>} />
      <Route path="/profile" element={<h1>Profile Settings Page (WIP)</h1>} />
      <Route path="/experience" element={<ExperienceForm />} />
      <Route path="/experience-description" element={<ExperienceDescription />} />
      
      {/* ✨ NEW DYNAMIC ROUTES FOR EDITING ✨ */}
      <Route path="/experience/:id" element={<ExperienceForm />} />
      <Route path="/experience-description/:id" element={<ExperienceDescription />} />

        {/* ✨ NEW EDUCATION ROUTES ✨ */}
      <Route path="/education" element={<EducationForm />} />
      <Route path="/education/:id" element={<EducationForm />} /> {/* For editing */}
      <Route path="/review-education" element={<ReviewEducation />} /> {/* For reviewing */}

      <Route path="/review-experience" element={<ReviewExperience />} />
      <Route path="/education" element={<EducationForm />} />
      <Route path="/skills" element={<SkillsForm />} />
      <Route path="/summary" element={<SummaryForm />} />
      <Route path="/more-details" element={<MoreDetailsForm />} />
      <Route path="/finalize" element={<Finalize />} /> {/* ✨ ADD THIS ROUTE ✨ */}
    </Routes>
  );
}

export default App;