// src/templates/Template3.jsx
import React from "react";

const Template3 = React.forwardRef((props, ref) => {
    const { formData, experiences, educationData, skills, summary, color = '#2c3e50' } = props;
    const experienceList = Array.isArray(experiences) ? experiences : (experiences ? [experiences] : []);
    const educationList = Array.isArray(educationData) ? educationData : (educationData ? [educationData] : []);

    return (
        <div ref={ref} className="bg-white w-full max-w-2xl shadow-lg p-8 font-serif mx-auto">
            {/* Header */}
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold uppercase" style={{ color }}>{formData?.firstName || "Your"} {formData?.surname || "Name"}</h1>
                <p className="text-sm text-gray-500 mt-2">
                    {formData?.city || "City"}, {formData?.country || "Country"} | {formData?.email || "email@example.com"} | {formData?.phone || "Phone"}
                </p>
            </header>

            {/* Body */}
            <div className="text-sm">
                {summary && (<div className="mb-4"><h2 className="text-center text-lg font-bold uppercase tracking-widest border-y-2 py-1 mb-2" style={{ borderColor: color }}>Summary</h2><p dangerouslySetInnerHTML={{ __html: summary }} /></div>)}
                {skills && (<div className="mb-4"><h2 className="text-center text-lg font-bold uppercase tracking-widest border-y-2 py-1 mb-2" style={{ borderColor: color }}>Skills</h2><div className="columns-2 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: skills }} /></div>)}
                {experienceList.length > 0 && (<div className="mb-4"><h2 className="text-center text-lg font-bold uppercase tracking-widest border-y-2 py-1 mb-2" style={{ borderColor: color }}>Experience</h2>{experienceList.map((job, i) => (<div key={job._id || i} className="mb-3"><h3 className="font-semibold text-md">{job.jobTitle || 'Job Title'} | <span className="font-normal">{job.employer || 'Employer'}</span></h3><p className="text-xs text-gray-500">{job.startMonth || 'Month'} {job.startYear || 'Year'} - {job.current ? "Present" : `${job.endMonth || 'Month'} ${job.endYear || 'Year'}`}</p>{job.description && (<ul className="list-disc list-inside mt-1">{job.description.split('\n').filter(l => l.trim()).map((l, idx) => (<li key={idx} dangerouslySetInnerHTML={{ __html: l }} />))}</ul>)}</div>))}</div>)}
                {educationList.length > 0 && (<div className="mb-4"><h2 className="text-center text-lg font-bold uppercase tracking-widest border-y-2 py-1 mb-2" style={{ borderColor: color }}>Education</h2>{educationList.map((edu, i) => (<div key={edu._id || i} className="mb-2"><h3 className="font-semibold text-md">{edu.degree || 'Degree'}, {edu.fieldOfStudy || 'Field of Study'}</h3><p className="text-sm">{edu.schoolName || 'School Name'} - {edu.gradYear || 'Year'}</p></div>))}</div>)}
                {/* ✨ NEW MORE DETAILS SECTION ✨ */}
                {props.moreDetails && (props.moreDetails.activities || props.moreDetails.awards) && (
                    <div>
                        <h2 className="text-center text-lg font-bold uppercase tracking-widest border-y-2 py-1 mb-2" style={{ borderColor: color }}>Additional Information</h2>
                        {props.moreDetails.activities && (<div className="mb-2"><h3 className="font-semibold text-lg">Activities</h3><p className="text-sm whitespace-pre-wrap">{props.moreDetails.activities}</p></div>)}
                        {props.moreDetails.awards && (<div className="mb-2"><h3 className="font-semibold text-lg">Awards</h3><p className="text-sm whitespace-pre-wrap">{props.moreDetails.awards}</p></div>)}
                    </div>
                )}
            </div>
        </div>
    );
});

export default Template3;