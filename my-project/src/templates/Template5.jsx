// src/templates/Template5.jsx
import React from "react";

const Template5 = React.forwardRef((props, ref) => {
    const { formData, experiences, educationData, skills, summary, moreDetails, color = '#111827' } = props;
    const experienceList = Array.isArray(experiences) ? experiences : (experiences ? [experiences] : []);
    const educationList = Array.isArray(educationData) ? educationData : (educationData ? [educationData] : []);

    return (
        <div ref={ref} className="bg-white w-full max-w-2xl shadow-lg p-10 font-sans text-gray-800 mx-auto">
            {/* Header */}
            <header className="text-left mb-8 border-b-4 pb-4" style={{ borderColor: color }}>
                <h1 className="text-5xl font-bold tracking-tight">{formData?.firstName || "Your"} {formData?.surname || "Name"}</h1>
                <p className="text-md text-gray-600 mt-2">
                    {formData?.city || "City"}, {formData?.country || "Country"} | {formData?.email || "email@example.com"} | {formData?.phone || "Phone"}
                </p>
            </header>

            {/* Body */}
            <div className="text-sm">
                {summary && (<div className="mb-6"><h2 className="text-xl font-semibold mb-2" style={{ color }}>Summary</h2><p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }} /></div>)}
                {skills && (<div className="mb-6"><h2 className="text-xl font-semibold mb-2" style={{ color }}>Skills</h2><div className="whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{ __html: skills }} /></div>)}
                {experienceList.length > 0 && (<div className="mb-6"><h2 className="text-xl font-semibold mb-2" style={{ color }}>Experience</h2>{experienceList.map((job, i) => (<div key={job._id || i} className="mb-4"><h3 className="font-bold text-md">{job.jobTitle || 'Job Title'}</h3><p className="text-sm font-semibold text-gray-700">{job.employer || 'Employer'}</p><p className="text-xs text-gray-500 mb-1">{job.startMonth || 'Month'} {job.startYear || 'Year'} - {job.current ? "Present" : `${job.endMonth || 'Month'} ${job.endYear || 'Year'}`}</p>{job.description && (<ul className="list-disc list-inside mt-1 text-gray-600 leading-relaxed">{job.description.split('\n').filter(l => l.trim()).map((l, idx) => (<li key={idx} dangerouslySetInnerHTML={{ __html: l }} />))}</ul>)}</div>))}</div>)}
                {educationList.length > 0 && (<div className="mb-6"><h2 className="text-xl font-semibold mb-2" style={{ color }}>Education</h2>{educationList.map((edu, i) => (<div key={edu._id || i} className="mb-3"><h3 className="font-bold text-md">{edu.degree || 'Degree'} in {edu.fieldOfStudy || 'Field of Study'}</h3><p className="text-sm text-gray-600">{edu.schoolName || 'School Name'}, {edu.gradYear || 'Year'}</p></div>))}</div>)}
            </div>
        </div>
    );
});

export default Template5;