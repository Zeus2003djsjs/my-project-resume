import { useState, useRef } from "react"; // 👈 CHANGE 1: Import useRef
import ResumePreview from "./ResumePreview";
import { useNavigate } from "react-router-dom";

export default function ExperienceDescription() {
  const navigate = useNavigate();
  const textAreaRef = useRef(null); // 👈 CHANGE 2: Create a ref

  const [experience, setExperience] = useState({
    jobTitle: "Retail Sales Associate",
    employer: "ZARA",
    description: "",
  });

  const [suggestions] = useState([
    "Completed day-to-day duties accurately and efficiently.",
    "Contributed innovative ideas and solutions to enhance team performance and outcomes.",
    "Worked successfully with diverse group of coworkers to accomplish goals and address issues related to our products.",
  ]);

  const handleChange = (e) => {
    setExperience({ ...experience, [e.target.name]: e.target.value });
  };

  // 👈 CHANGE 3: Add the formatting function
  const handleFormat = (tag) => {
    const textarea = textAreaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = experience.description;

    // Do nothing if no text is selected
    if (start === end) return;

    const selectedText = currentText.substring(start, end);

    let prefix = '';
    let suffix = '';

    if (tag === 'bold') {
      prefix = '<b>';
      suffix = '</b>';
    } else if (tag === 'italic') {
      prefix = '<i>';
      suffix = '</i>';
    } else if (tag === 'underline') {
      prefix = '<u>';
      suffix = '</u>';
    }

    // Construct the new formatted text
    const formattedText = currentText.substring(0, start) +
                          prefix + selectedText + suffix +
                          currentText.substring(end);

    // Update the state
    setExperience({ ...experience, description: formattedText });
    
    // Restore cursor position for better UX
    setTimeout(() => {
        const newCursorPosition = start + prefix.length + selectedText.length + suffix.length;
        textarea.selectionStart = newCursorPosition;
        textarea.selectionEnd = newCursorPosition;
    }, 0);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-20 bg-blue-900 text-white flex flex-col items-center py-6 space-y-6">
        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
          ✓
        </div>
        <div className="w-8 h-8 bg-blue-900 text-white border-2 border-white rounded-full flex items-center justify-center font-bold">
          2
        </div>
        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-2">
          Next, write about what you did as a{" "}
          <span className="text-blue-700">{experience.jobTitle}</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Pick from our ready-to-use phrases or write your own and get AI
          writing help.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Suggestions */}
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Search by job title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={experience.jobTitle}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mb-4"
              placeholder="Job title, industry, or keyword"
            />
            <p className="text-xs text-gray-500 mb-2">
              Showing {suggestions.length} results for{" "}
              <b>{experience.jobTitle}</b>
            </p>

            <div className="space-y-3 overflow-y-auto max-h-80">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start p-3 bg-white rounded-md shadow-sm cursor-pointer hover:bg-gray-50"
                  onClick={() =>
                    setExperience({
                      ...experience,
                      description:
                        experience.description.length > 0
                          ? experience.description + "\n" + s
                          : s,
                    })
                  }
                >
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-300 text-black mr-2">
                    +
                  </div>
                  <p className="text-sm text-gray-700">{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col">
            <div className="flex justify-between mb-2">
              <div className="space-x-3">
                {/* 👈 CHANGE 4: Update button handlers */}
                <button type="button" onClick={() => handleFormat('bold')} className="font-bold">B</button>
                <button type="button" onClick={() => handleFormat('italic')} className="italic">I</button>
                <button type="button" onClick={() => handleFormat('underline')} className="underline">U</button>
              </div>
              <button className="bg-yellow-400 px-3 py-1 rounded-md text-sm font-semibold hover:bg-yellow-500">
                ✨ Enhance with AI
              </button>
            </div>
            <textarea
              ref={textAreaRef} // 👈 CHANGE 5: Attach the ref to the textarea
              name="description"
              value={experience.description}
              onChange={handleChange}
              className="flex-1 border rounded-md px-3 py-2 resize-none h-72"
              placeholder="Type your experience details here..."
            />
          </div>

          {/* Resume Preview */}
          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
            <ResumePreview
              formData={{
                firstName: "Fdfd",
                surname: "Dfdf",
                email: "johndoe77@gmail.com",
                jobTitle: experience.jobTitle,
                employer: experience.employer,
                description: experience.description,
              }}
            />
            <a
              href="#"
              className="text-blue-600 mt-4 font-semibold hover:underline"
            >
              Change template
            </a>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center mt-10">
          <button
            onClick={() => navigate(-1)}
            className="border border-black rounded-full px-8 py-2 font-bold"
          >
            Back
          </button>
          <button
            onClick={() => navigate("/review-experience")}
            className="bg-blue-600 text-white px-8 py-2 rounded-full font-bold hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
}