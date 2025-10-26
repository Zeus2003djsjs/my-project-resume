// my-project/src/pages/MyResumes.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

function MyResumes() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await api.get('/resumes/all');
        setResumes(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Resumes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resumes.map((resume) => (
          <div key={resume._id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{resume.personalInfo.firstName} {resume.personalInfo.surname}</h2>
            <p className="text-gray-600">{resume.personalInfo.email}</p>
            <div className="mt-4 flex justify-end">
              <Link to={`/resumeform?resumeId=${resume._id}`} className="text-blue-500 hover:underline mr-4">Edit</Link>
              <button onClick={async () => {
                await api.delete(`/resumes/${resume._id}`);
                setResumes(resumes.filter(r => r._id !== resume._id));
              }} className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyResumes;