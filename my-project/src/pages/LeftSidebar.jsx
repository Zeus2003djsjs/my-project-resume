// src/pages/LeftSidebar.jsx

import React from 'react';

// Import your template thumbnails
// Make sure you have created these screenshot images in the assets folder
import thumb1 from '../assets/template1_thumb.png'; 
import thumb2 from '../assets/template2_thumb.png';
import thumb3 from '../assets/template3_thumb.png';
import thumb4 from '../assets/template4_thumb.png'; // ✨ Import the new thumbnail
import thumb5 from '../assets/template5_thumb.png'; // ✨ Import the new thumbnail

const LeftSidebar = ({ selectedColor, setSelectedColor, selectedTemplate, setSelectedTemplate }) => {
  const colors = ['#000000', '#1E3A8A', '#2c3e50', '#4A90E2', '#50E3C2', '#B8E986', '#F5A623', '#D0021B'];
  
  // Create a list of your templates with their names and thumbnails
  const templates = [
    { id: 'Template1', name: 'Classic', thumb: thumb1 },
    { id: 'Template2', name: 'Modern', thumb: thumb2 },
    { id: 'Template3', name: 'Professional', thumb: thumb3 },
    { id: 'Template4', name: 'Minimalist', thumb: thumb4 }, // ✨ Add the new template
    { id: 'Template5', name: 'Corporate', thumb: thumb5 }, // ✨ Add the new template
    // Add more templates here as you create them
  ];

  return (
    <aside className="w-full lg:w-96 bg-white p-6 shadow-lg flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Resume Now.</h1>
      
      <div className="mb-6">
        <button className="font-bold text-blue-600 border-b-2 border-blue-600 pb-2">Design</button>
      </div>

      {/* Colors Section */}
      <div className="mb-6">
        <h2 className="font-semibold text-gray-700 mb-3">Colors</h2>
        <div className="grid grid-cols-8 gap-2">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Templates Section - Now a scrollable grid */}
      <div className="flex-1 flex flex-col min-h-0">
        <h2 className="font-semibold text-gray-700 mb-3">Templates</h2>
        <div className="flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
            {templates.map(template => (
                <div key={template.id} className="text-center">
                <button 
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`w-full border-2 rounded-lg overflow-hidden ${selectedTemplate === template.id ? 'border-blue-500' : 'border-transparent'}`}
                >
                    <img src={template.thumb} alt={template.name} className="w-full h-auto object-cover" />
                </button>
                <p className="text-sm mt-1">{template.name}</p>
                </div>
            ))}
            </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;