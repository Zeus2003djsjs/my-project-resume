// src/pages/ResumePreview.jsx
import React from "react";

export default function ResumePreview({ formData, experienceData }) {
    
    // 1. Destructure basic job details from experienceData (used by ExperienceForm.jsx)
    const { 
        jobTitle: expJobTitle, 
        employer: expEmployer, 
        city, country, 
        startMonth, startYear, endMonth, endYear, current 
    } = experienceData || {};
    
    // 2. Destructure description and overrides from formData (used by ExperienceDescription.jsx)
    const { 
        description: descFromForm, // This holds the description text
        jobTitle: formJobTitle,   // These may override expJobTitle/expEmployer
        employer: formEmployer,
    } = formData || {};
    
    // Determine the final values, prioritizing the data from formData where available
    const finalJobTitle = formJobTitle || expJobTitle || "Job Title";
    const finalEmployer = formEmployer || expEmployer || "Employer";
    
    // The description is the text area content from ExperienceDescription.jsx
    const finalDescription = descFromForm; 

    return (
        <div className="bg-white w-full max-w-sm border rounded-xl shadow-lg p-4">
            <div className="text-center mb-4">
                <div className="text-2xl font-bold">
                    {formData.firstName || "Your"} {formData.surname || "Name"}
                </div>
                <p className="text-sm text-gray-600">
                    {formData.city || "City"}, {formData.country || "Country"}{" "}
                    {formData.pin && `, ${formData.pin}`}
                </p>
                <p className="text-sm text-gray-600">
                    {formData.email || "email@example.com"} | {formData.phone || "+91 XXXXX XXXXX"}
                </p>
            </div>

            <hr className="my-2" />

            <section className="text-left text-sm text-gray-700">
                <h3 className="font-semibold mb-1 text-gray-900">Summary</h3>
                <p>
                    Customer-focused Retail Sales professional with strong understanding of
                    marketing, communication, and customer service. Demonstrated record of
                    achieving goals and exceeding targets.
                </p>
            </section>

            <hr className="my-2" />

            <section className="text-left text-sm text-gray-700">
                <h3 className="font-semibold mb-1 text-gray-900">Skills</h3>
                <ul className="list-disc list-inside">
                    <li>Cash register operation</li>
                    <li>POS system operation</li>
                    <li>Sales expertise</li>
                    <li>Inventory management</li>
                </ul>
            </section>

            <hr className="my-2" />

            <section className="text-left text-sm text-gray-700">
                <h3 className="font-semibold mb-1 text-gray-900">Experience</h3>

                {/* Check if any essential experience data exists to show the dynamic content */}
                {finalJobTitle !== "Job Title" || finalEmployer !== "Employer" || startYear || finalDescription ? (
                    <>
                        {/* Job Title and Employer (now using the combined final variables) */}
                        <p className="font-medium">
                            {finalJobTitle} @ {finalEmployer}
                        </p>
                        
                        {/* Duration and Location */}
                        <p className="text-xs text-gray-500 mb-2">
                            {/* Start Date: Conditionally display month and year */}
                            {(startMonth && startMonth !== 'Month' ? `${startMonth} ` : '')}
                            {(startYear && startYear !== 'Year' ? startYear : 'Start Year')}
                            
                            {' - '}
                            
                            {/* End Date: Check 'current' checkbox first, otherwise show month/year */}
                            {current ? 
                                "Present" : 
                                (
                                    (endMonth && endMonth !== 'Month' ? `${endMonth} ` : '') + 
                                    (endYear && endYear !== 'Year' ? endYear : 'End Year')
                                )
                            } 
                            
                            {/* Location: Combine city and country */}
                            {' | '}
                            {city || "City"} {country ? `, ${country}` : ''}
                        </p>

                        {/* Bullet Points/Description: Use the finalDescription variable */}
                        {finalDescription ? (
                            // NEW CODE - Correctly renders the HTML
<ul className="list-disc list-inside mt-1">
    {finalDescription
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line, index) => (
            <li 
                key={index}
                // Use dangerouslySetInnerHTML to process the HTML tags
                dangerouslySetInnerHTML={{ __html: line.trim() }}
            />
        ))}
</ul>
                        ) : (
                            // Fallback to static bullet points if only job title/employer are present
                            <ul className="list-disc list-inside">
                                <li>Increased monthly sales by 10% through effective upselling.</li>
                                <li>Maintained high customer satisfaction ratings.</li>
                            </ul>
                        )}
                    </>
                ) : (
                    /* Show STATIC placeholder data when no dynamic data is entered in either step */
                    <>
                        <p className="font-medium">Retail Sales Associate @ ZARA</p>
                        <p className="text-xs text-gray-500 mb-2">2017 - Present | New Delhi</p>
                        <ul className="list-disc list-inside">
                            <li>Increased monthly sales by 10% through effective upselling.</li>
                            <li>Maintained high customer satisfaction ratings.</li>
                        </ul>
                    </>
                )}
            </section>

            <hr className="my-2" />

            <section className="text-left text-sm text-gray-700">
                <h3 className="font-semibold mb-1 text-gray-900">Education</h3>
                <p className="font-medium">Diploma in Financial Accounting</p>
                <p className="text-xs text-gray-500">Oxford Software Institute, 2016</p>
            </section>
        </div>
    );
}