// src/templates/Template2.jsx
import React from "react";

const Template2 = React.forwardRef((props, ref) => {
    const { formData, experiences, educationData, skills, summary, moreDetails, color = '#1E3A8A' } = props;
    // ... (logic for lists remains the same)
    const experienceList = Array.isArray(experiences) ? experiences : (experiences ? [experiences] : []);
    const educationList = Array.isArray(educationData) ? educationData : (educationData ? [educationData] : []);

    return (
        <div ref={ref} className="bg-white w-full max-w-2xl shadow-lg font-serif mx-auto">
            <div className="flex">
                <div className="w-1/3 text-white p-6" style={{ backgroundColor: color }}>
                    <h1 className="text-3xl font-bold uppercase">{formData?.firstName || "Your"}</h1>
                    <h1 className="text-3xl font-bold uppercase mb-6">{formData?.surname || "Name"}</h1>
                    <div className="mb-4"><h2 className="text-md font-semibold tracking-wider uppercase border-b pb-1 mb-2" style={{borderColor: 'rgba(255,255,255,0.5)'}}>Contact</h2><p className="text-xs mb-1">{formData?.phone || "Phone"}</p><p className="text-xs mb-1">{formData?.email || "email@example.com"}</p><p className="text-xs">{formData?.city || "City"}, {formData?.country || "Country"}</p></div>
                    {skills && (<div className="mb-4"><h2 className="text-md font-semibold tracking-wider uppercase border-b pb-1 mb-2" style={{borderColor: 'rgba(255,255,255,0.5)'}}>Skills</h2><div className="text-xs whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: skills }} /></div>)}
                    {educationList.length > 0 && (<div><h2 className="text-md font-semibold tracking-wider uppercase border-b pb-1 mb-2" style={{borderColor: 'rgba(255,255,255,0.5)'}}>Education</h2>{educationList.map((edu, i) => (<div key={edu._id || i} className="mb-2"><h3 className="font-bold text-sm">{edu.degree || 'Degree'}</h3><p className="text-xs">{edu.schoolName || 'School Name'}</p><p className="text-xs">{edu.gradYear || 'Year'}</p></div>))}</div>)}
                </div>
                <div className="w-2/3 p-6">
                    {summary && (<div className="mb-6"><h2 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color }}>Summary</h2><p className="text-sm" dangerouslySetInnerHTML={{ __html: summary }} /></div>)}
                    {experienceList.length > 0 && (<div><h2 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color }}>Experience</h2>{experienceList.map((job, i) => (<div key={job._id || i} className="mb-4"><h3 className="font-semibold text-lg">{job.jobTitle || 'Job Title'}</h3><p className="text-sm text-gray-600 mb-1">{job.employer || 'Employer'} | {job.startMonth || 'Month'} {job.startYear || 'Year'} - {job.current ? "Present" : `${job.endMonth || 'Month'} ${job.endYear || 'Year'}`}</p>{job.description && (<ul className="list-disc list-inside text-sm text-gray-700">{job.description.split('\n').filter(l => l.trim()).map((l, idx) => (<li key={idx} dangerouslySetInnerHTML={{ __html: l }} />))}</ul>)}</div>))}</div>)}
                    {/* ✨ NEW MORE DETAILS SECTION ✨ */}
                    {moreDetails && moreDetails.projects && (
                        <div className="mt-6">
                            <h2 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color }}>Projects</h2>
                            {moreDetails.projects.map((project, i) => (
                                <div key={i} className="mb-4">
                                    <h3 className="font-semibold text-lg">{project.title || 'Project Title'}</h3>
                                    <p className="text-sm text-gray-600 mb-1">{project.description || 'Project Description'}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
        </div>
    );
});
export default Template2;