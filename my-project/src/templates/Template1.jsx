// src/templates/Template1.jsx
import React from "react";

const Template1 = React.forwardRef((props, ref) => {
    const { formData, experiences, educationData, skills, summary, moreDetails, color = '#000000' } = props;
    // ... (logic for lists remains the same)
    const experienceList = Array.isArray(experiences) ? experiences : (experiences ? [experiences] : []);
    const educationList = Array.isArray(educationData) ? educationData : (educationData ? [educationData] : []);
    const safeMoreDetails = moreDetails || {};

    return (
        <div ref={ref} className="bg-white w-full max-w-2xl shadow-lg p-8 text-gray-800 font-sans mx-auto">
            <div className="text-center mb-5">
                <h1 className="text-4xl font-bold tracking-wider uppercase" style={{ color }}>{formData?.firstName || "Your"} {formData?.surname || "Name"}</h1>
                <p className="text-sm text-gray-600 mt-2">{formData?.city || "City"}, {formData?.country || "Country"} | {formData?.email || "email@example.com"} | {formData?.phone || "Phone"}</p>
            </div>
            {summary && (<div><h2 className="text-lg font-bold uppercase tracking-widest border-b-2 pb-1 mb-2" style={{ borderColor: color }}>Summary</h2><p className="text-sm" dangerouslySetInnerHTML={{ __html: summary }} /></div>)}
            {skills && (<div className="mt-4"><h2 className="text-lg font-bold uppercase tracking-widest border-b-2 pb-1 mb-2" style={{ borderColor: color }}>Skills</h2><div className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: skills }} /></div>)}
            {experienceList.length > 0 && (<div className="mt-4"><h2 className="text-lg font-bold uppercase tracking-widest border-b-2 pb-1 mb-2" style={{ borderColor: color }}>Experience</h2>{experienceList.map((job, i) => (<div key={job._id || i} className="mb-3"><h3 className="font-semibold text-md">{job.jobTitle || 'Job Title'} at {job.employer || 'Employer'}</h3><p className="text-xs text-gray-500 mb-1">{job.startMonth || 'Month'} {job.startYear || 'Year'} - {job.current ? "Present" : `${job.endMonth || 'Month'} ${job.endYear || 'Year'}`} | {job.city || 'City'}</p>{job.description && (<ul className="list-disc list-inside text-sm">{job.description.split('\n').filter(l => l.trim()).map((l, idx) => (<li key={idx} dangerouslySetInnerHTML={{ __html: l }} />))}</ul>)}</div>))}</div>)}
            {educationList.length > 0 && (<div className="mt-4"><h2 className="text-lg font-bold uppercase tracking-widest border-b-2 pb-1 mb-2" style={{ borderColor: color }}>Education</h2>{educationList.map((edu, i) => (<div key={edu._id || i} className="mb-2"><h3 className="font-semibold text-md">{edu.degree || 'Degree'} in {edu.fieldOfStudy || 'Field of Study'}</h3><p className="text-xs text-gray-500">{edu.schoolName || 'School Name'} | {edu.gradYear || 'Year'}</p></div>))}</div>)}

            {/* ✨ NEW MORE DETAILS SECTION ✨ */}
            {(safeMoreDetails.activities || safeMoreDetails.awards || safeMoreDetails.certifications) && (
                <div className="mt-4">
                    <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 pb-1 mb-2" style={{ borderColor: color }}>
                        Additional Information
                    </h2>
                    {safeMoreDetails.activities && (<div className="mb-2"><h3 className="font-semibold text-md">Activities</h3><p className="text-sm whitespace-pre-wrap">{safeMoreDetails.activities}</p></div>)}
                    {safeMoreDetails.awards && (<div className="mb-2"><h3 className="font-semibold text-md">Awards</h3><p className="text-sm whitespace-pre-wrap">{safeMoreDetails.awards}</p></div>)}
                    {safeMoreDetails.certifications && (<div className="mb-2"><h3 className="font-semibold text-md">Certifications</h3><p className="text-sm whitespace-pre-wrap">{safeMoreDetails.certifications}</p></div>)}
                </div>
            )}
        </div>
    );
});
export default Template1;