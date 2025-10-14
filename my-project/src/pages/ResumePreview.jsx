// src/pages/ResumePreview.jsx

import React from "react";

// ✨ NO MORE forwardRef! This is now a simple component. ✨
const ResumePreview = (props) => {
    const { formData, experiences, educationData, skills, summary, moreDetails } = props;

    const experienceList = Array.isArray(experiences) ? experiences : (experiences ? [experiences] : []);
    const educationList = Array.isArray(educationData) ? educationData : (educationData ? [educationData] : []);
    const safeMoreDetails = moreDetails || {};

    return (
        // The ref is no longer needed here
        <div className="bg-white w-full max-w-sm border rounded-xl shadow-lg p-4 text-gray-800">
            {/* Personal Info */}
            <div className="text-center mb-4">
                <div className="text-2xl font-bold">{formData?.firstName || "Your"} {formData?.surname || "Name"}</div>
                <p className="text-sm text-gray-600">{formData?.city || "City"}, {formData?.country || "Country"}</p>
                <p className="text-sm text-gray-600">{formData?.email || "email@example.com"} | {formData?.phone || "Phone"}</p>
            </div>

            {/* Summary */}
            {summary && (<><hr className="my-2" /><section className="text-left text-sm"><h3 className="font-semibold mb-1 text-gray-900">Summary</h3><p dangerouslySetInnerHTML={{ __html: summary }} /></section></>)}

            {/* Skills */}
            {skills && (<><hr className="my-2" /><section className="text-left text-sm"><h3 className="font-semibold mb-1 text-gray-900">Skills</h3><div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: skills }} /></section></>)}

            {/* Experience */}
            {experienceList.length > 0 && (<><hr className="my-2" /><section className="text-left text-sm"><h3 className="font-semibold mb-1 text-gray-900">Experience</h3>{experienceList.map((job, index) => (<div key={job._id || index} className="mb-3"><p className="font-medium">{job.jobTitle || 'Job Title'} @ {job.employer || 'Employer'}</p><p className="text-xs text-gray-500 mb-1">{job.startMonth || 'Month'} {job.startYear || 'Year'} - {job.current ? "Present" : `${job.endMonth || 'Month'} ${job.endYear || 'Year'}`} | {job.city || 'City'}</p>{job.description && (<ul className="list-disc list-inside">{job.description.split('\n').filter(line => line.trim()).map((line, idx) => (<li key={idx} dangerouslySetInnerHTML={{ __html: line }} />))}</ul>)}</div>))}</section></>)}

            {/* Education */}
            {educationList.length > 0 && (<><hr className="my-2" /><section className="text-left text-sm"><h3 className="font-semibold mb-1 text-gray-900">Education</h3>{educationList.map((edu, index) => (<div key={edu._id || index} className="mb-2"><p className="font-medium">{edu.degree || 'Degree'} in {edu.fieldOfStudy || 'Field of Study'}</p><p className="text-xs text-gray-500">{edu.schoolName || 'School Name'} | {edu.gradYear || 'Year'}</p></div>))}</section></>)}

            {/* More Details */}
            {(safeMoreDetails.activities || safeMoreDetails.awards || safeMoreDetails.certifications || safeMoreDetails.languages?.some(l => l.language)) && (<hr className="my-2" />)}
            <section className="text-left text-sm">
                {safeMoreDetails.activities && (<div className="mb-2"><h3 className="font-semibold mb-1 text-gray-900">Activities</h3><p className="whitespace-pre-wrap">{safeMoreDetails.activities}</p></div>)}
                {safeMoreDetails.awards && (<div className="mb-2"><h3 className="font-semibold mb-1 text-gray-900">Awards</h3><p className="whitespace-pre-wrap">{safeMoreDetails.awards}</p></div>)}
                {safeMoreDetails.certifications && (<div className="mb-2"><h3 className="font-semibold mb-1 text-gray-900">Certifications</h3><p className="whitespace-pre-wrap">{safeMoreDetails.certifications}</p></div>)}
                {safeMoreDetails.languages?.some(lang => lang.language) && (<div><h3 className="font-semibold mb-1 text-gray-900">Languages</h3><ul className="list-disc list-inside">{safeMoreDetails.languages.filter(lang => lang.language).map((lang, index) => (<li key={index}>{lang.language} ({lang.proficiency})</li>))}</ul></div>)}
            </section>
        </div>
    );
};

export default ResumePreview;