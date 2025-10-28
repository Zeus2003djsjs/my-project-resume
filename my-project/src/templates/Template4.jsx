// src/templates/Template4.jsx
import React from "react";

const Template4 = React.forwardRef((props, ref) => {
    const { formData, experiences, educationData, skills, summary, moreDetails, color = '#333' } = props;
    const experienceList = Array.isArray(experiences) ? experiences : (experiences ? [experiences] : []);
    const educationList = Array.isArray(educationData) ? educationData : (educationData ? [educationData] : []);
    const safeMoreDetails = moreDetails || {};

    return (
        <div ref={ref} className="bg-white w-full max-w-2xl shadow-lg p-10 font-light text-gray-700 mx-auto">
            {/* Header */}
            <header className="text-left mb-8">
                <h1 className="text-5xl font-extrabold tracking-tighter" style={{ color }}>{formData?.firstName || "Your"} {formData?.surname || "Name"}</h1>
                <p className="text-md text-gray-500 mt-2">
                    {formData?.city || "City"}, {formData?.country || "Country"} | {formData?.email || "email@example.com"} | {formData?.phone || "Phone"}
                </p>
            </header>

            {/* Body */}
            <div className="text-sm leading-relaxed">
                {summary && (<div className="mb-6"><h2 className="text-sm font-bold uppercase tracking-widest mb-2 border-b pb-1" style={{ borderColor: color }}>Profile</h2><p className="text-sm" dangerouslySetInnerHTML={{ __html: summary }} /></div>)}
                
                <div className="grid grid-cols-3 gap-8">
                    {/* Main Content (Experience & Education) */}
                    <div className="col-span-2">
                        {experienceList.length > 0 && (<div className="mb-6"><h2 className="text-sm font-bold uppercase tracking-widest mb-2 border-b pb-1" style={{ borderColor: color }}>Experience</h2>{experienceList.map((job, i) => (<div key={job._id || i} className="mb-4"><h3 className="font-semibold text-md">{job.jobTitle || 'Job Title'}</h3><p className="text-sm text-gray-600">{job.employer || 'Employer'} | {job.startMonth || 'Month'} {job.startYear || 'Year'} - {job.current ? "Present" : `${job.endMonth || 'Month'} ${job.endYear || 'Year'}`}</p>{job.description && (<ul className="list-disc list-inside mt-1">{job.description.split('\n').filter(l => l.trim()).map((l, idx) => (<li key={idx} dangerouslySetInnerHTML={{ __html: l }} />))}</ul>)}</div>))}</div>)}
                        {educationList.length > 0 && (<div><h2 className="text-sm font-bold uppercase tracking-widest mb-2 border-b pb-1" style={{ borderColor: color }}>Education</h2>{educationList.map((edu, i) => (<div key={edu._id || i} className="mb-3"><h3 className="font-semibold text-md">{edu.degree || 'Degree'}</h3><p className="text-sm text-gray-600">{edu.schoolName || 'School Name'}, {edu.gradYear || 'Year'}</p></div>))}</div>)}
                    </div>

                    {/* Sidebar Content (Skills & More) */}
                    <div className="col-span-1">
                        {skills && (<div className="mb-6"><h2 className="text-sm font-bold uppercase tracking-widest mb-2 border-b pb-1" style={{ borderColor: color }}>Skills</h2><div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: skills }} /></div>)}
                        {safeMoreDetails.activities && (<div className="mb-6"><h2 className="text-sm font-bold uppercase tracking-widest mb-2 border-b pb-1" style={{ borderColor: color }}>Activities</h2><p className="whitespace-pre-wrap">{safeMoreDetails.activities}</p></div>)}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Template4;