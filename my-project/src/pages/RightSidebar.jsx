// src/pages/RightSidebar.jsx

import React from 'react';
import { Download, Printer, Mail, CheckCircle } from 'lucide-react';

const RightSidebar = ({ onDownload, onSave }) => {
  const sections = ["Heading", "Summary", "Education and Training", "Skills", "Experience"];

  return (
    <aside className="w-full lg:w-72 bg-white p-6 shadow-lg">
      <div className="flex items-center space-x-2 mb-4">
        <button onClick={onDownload} className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-bold hover:bg-gray-300 transition flex items-center justify-center">
          <Download size={20} className="mr-2"/> Download
        </button>
        <button onClick={onDownload} className="p-2 bg-gray-200 rounded-lg"><Printer size={20}/></button>
        <button className="p-2 bg-gray-200 rounded-lg"><Mail size={20}/></button>
      </div>

      <button onClick={onSave} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition mb-6">
        Save & Next
      </button>

      <div className="mb-6">
        <h2 className="font-semibold text-gray-700 mb-3">Spell Check</h2>
        <div className="bg-green-100 text-green-800 p-3 rounded-lg text-sm">Looks good!</div>
      </div>

      <div>
        <h2 className="font-semibold text-gray-700 mb-3">Resume Sections</h2>
        <ul className="space-y-2">
          {sections.map(section => (
            <li key={section} className="flex items-center text-gray-600">
              <CheckCircle size={16} className="mr-2 text-green-500"/> {section}
            </li>
          ))}
        </ul>
        <button className="text-blue-600 font-semibold mt-3">+ Add a section</button>
      </div>
    </aside>
  );
};

export default RightSidebar;