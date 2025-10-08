import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResumePreview from './ResumePreview'; // Assuming ResumePreview is in the same directory

// --- DUMMY DATA for demonstration purposes ---
// You will replace this with data from your actual ResumeContext
const DUMMY_EXPERIENCES = [
    {
        id: 'exp1', // Unique ID for editing/deleting
        jobTitle: 'sdaasd',
        employer: 'sdasdsa',
        startMonth: 'Feb',
        startYear: '2024',
        endMonth: 'Current',
        endYear: '', // Empty for 'Current'
        city: 'City', // Added for ResumePreview
        country: 'Country', // Added for ResumePreview
        description: 'Contributed innovative ideas and solutions to enhance team performance and outcomes.\nTeamwork\nManaged inventory and restocked shelves.'
        // Note: The description here is a single string that you would have saved from ExperienceDescription.jsx
    },
    // You can add more dummy experiences here to see them listed
    // {
    //     id: 'exp2',
    //     jobTitle: 'Sales Manager',
    //     employer: 'Tech Innovations',
    //     startMonth: 'Jan',
    //     startYear: '2022',
    //     endMonth: 'Jan',
    //     endYear: '2024',
    //     city: 'New York',
    //     country: 'USA',
    //     description: 'Led a team of 5 sales associates.\nAchieved 15% growth in Q4.\nDeveloped new customer acquisition strategies.'
    // }
];

// --- DUMMY useResume hook (REPLACE this with your actual ResumeContext logic) ---
// This mock hook provides dummy data and functions.
// In your real app, this would use useContext(ResumeContext) to get global state.
const useResume = () => ({
    experiences: DUMMY_EXPERIENCES,
    deleteExperience: (id) => {
        alert(`(Mock) Deleting experience with ID: ${id}`);
        // In a real app: update context state to remove the experience
        // setExperiences(prev => prev.filter(exp => exp.id !== id));
    },
    // This function should return all personal details needed for the ResumePreview
    // and ideally, the first experience for the "experienceData" prop of ResumePreview
    getResumeData: () => ({
        firstName: "FDFD", 
        surname: "DFDF", 
        email: "johndoe77@gmail.com",
        city: "City",
        country: "Country",
        // Pass the first experience details here for the main preview
        // In a real app, ResumePreview would iterate over all experiences
        // but for a quick demo of the single card on preview, we pick one.
        jobTitle: DUMMY_EXPERIENCES[0]?.jobTitle,
        employer: DUMMY_EXPERIENCES[0]?.employer,
        description: DUMMY_EXPERIENCES[0]?.description,
        startMonth: DUMMY_EXPERIENCES[0]?.startMonth,
        startYear: DUMMY_EXPERIENCES[0]?.startYear,
        endMonth: DUMMY_EXPERIENCES[0]?.endMonth === 'Current' ? 'Current' : DUMMY_EXPERIENCES[0]?.endMonth,
        endYear: DUMMY_EXPERIENCES[0]?.endYear,
        current: DUMMY_EXPERIENCES[0]?.endMonth === 'Current',
        // ... include other resume sections like skills, education etc.
    })
});
// --------------------------------------------------------------------------------

// Component for a single experience entry in the review list
const ExperienceCard = ({ job, onDelete, onEdit }) => {
    // Format the duration string
    const duration = `${job.startMonth || ''} ${job.startYear || ''} - ${job.endMonth === 'Current' ? 'Current' : (job.endMonth ? `${job.endMonth} ` : '') + (job.endYear || '')}`;

    // Split the description into bullet points.
    // Ensure `dangerouslySetInnerHTML` is used for rendering potential HTML tags (<b>, <i>, <u>)
    const bulletPoints = job.description
        .split('\n')
        .filter(line => line.trim())
        .map((line, index) => (
            <li key={index} className="list-disc list-inside" dangerouslySetInnerHTML={{ __html: line.trim() }} />
        ));

    return (
        <div className="border border-gray-200 p-6 rounded-lg mb-4 shadow-sm relative">
            <div className="flex items-start">
                {/* Left side: Job Title, Employer, Duration */}
                <div className="w-1/2 pr-4"> {/* Added pr-4 for spacing */}
                    <p className="font-semibold text-lg">{job.jobTitle || 'Job Title'}, {job.employer || 'Employer'}</p>
                    <p className="text-sm text-gray-600">{duration}</p>
                </div>

                {/* Right side: Description/Bullet Points */}
                <div className="w-1/2 pl-4"> {/* Added pl-4 for spacing */}
                    {bulletPoints.length > 0 ? (
                        <ul className="text-sm text-gray-800 list-disc list-inside">
                            {bulletPoints}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-800">{job.description || 'No description provided.'}</p>
                    )}
                </div>
            </div>

            {/* Edit/Delete Buttons */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end space-x-3">
                <button
                    onClick={() => onEdit(job.id)}
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    <span className="mr-1">✏️</span> Edit
                </button>
                <button
                    onClick={() => onDelete(job.id)}
                    className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium"
                >
                    <span className="mr-1">🗑️</span> Delete
                </button>
            </div>
        </div>
    );
};

export default function ReviewExperience() {
    const navigate = useNavigate();
    // Fetch experiences and functions from your context (or mock for now)
    const { experiences, deleteExperience, getResumeData } = useResume();
    
    // Get the consolidated data for theonClick={() => navigate(-1)}  ResumePreview
    // This assumes getResumeData provides a complete object including personal info
    const fullPreviewData = getResumeData(); 

    // Handler for editing an experience. You'll likely navigate to a form.
    const handleEdit = (id) => {
        // Example: Navigate to an experience form, passing the ID to pre-fill the form
        navigate(`/experienceform/${id}`);
    };

    // Handler for adding a new experience
    const handleAddExperience = () => {
        navigate('/experiencedescription'); // Or '/experienceform' depending on your flow
    };
    
    // Handler for continuing to the next section
    const handleContinue = () => {
        navigate('/education'); // Replace with your next page path
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left Sidebar - Matches your image */}
            <aside className="w-20 bg-blue-900 text-white flex flex-col items-center py-6 space-y-6">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                    ✓
                </div>
                <div className="w-8 h-8 bg-blue-900 text-white border-2 border-white rounded-full flex items-center justify-center font-bold">
                    2
                </div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-10 relative"> {/* Added relative for footer positioning */}
                <h1 className="text-3xl font-bold mb-8">Review your experience</h1>

                {/* List of Experience Cards */}
                <div className="mb-10 max-w-2xl mx-auto"> {/* Max width for content area */}
                    {experiences.length > 0 ? (
                        experiences.map((job) => (
                            <ExperienceCard 
                                key={job.id} 
                                job={job} 
                                onDelete={deleteExperience} 
                                onEdit={handleEdit} 
                            />
                        ))
                    ) : (
                        <p className="text-gray-600 text-center">No experience entries added yet. Click "Add experience" to get started!</p>
                    )}
                </div>

                {/* Footer Buttons - Fixed to bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-10 bg-gray-50 border-t flex justify-between items-center">
                    <button
                        // Goes back to the previous page
                        className="border border-black rounded-lg px-8 py-3 font-bold bg-white hover:bg-gray-100 transition"
                        onClick={() => navigate("/resumeform")}
                    >
                        Back
                    </button>

                    <button
                        onClick={() => navigate("/experience")}
                        className="bg-orange-400 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-500 transition"
                    >
                        + Add experience
                    </button>
                    
                    <button
                        onClick={handleContinue}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                    >
                        Continue
                    </button>
                </div>

                 {/* Terms and Conditions - Matches your image */}
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-500 flex space-x-2">
                    <span>© 2025. NOW Limited. All rights reserved.</span>
                    <a href="#" className="underline hover:text-gray-700">Terms</a>
                    <a href="#" className="underline hover:text-gray-700">Privacy Policy</a>
                    <a href="#" className="underline hover:text-gray-700">Contact Us</a>
                </div>
            </main>

            {/* Right Resume Preview Sidebar - Fixed position */}
            <aside className="w-96 p-4 bg-white shadow-lg border-l sticky top-0 h-screen overflow-y-auto flex flex-col items-center">
                {/* ResumePreview component. Pass appropriate data from your context. */}
                {/* NOTE: ResumePreview expects personal info in formData, and ONE experience in experienceData */}
                {/* If your ResumePreview can render multiple experiences, adjust props accordingly. */}
                <ResumePreview 
                    formData={fullPreviewData} 
                    // For the preview, we usually show the first entry or a consolidated view.
                    // Adjust this to match how your ResumePreview expects multiple experiences if applicable.
                    experienceData={fullPreviewData} // Passing fullPreviewData which contains first experience details
                />
                <div className="text-center mt-4">
                    <button className="text-blue-600 font-semibold hover:underline">
                        Change template
                    </button>
                </div>
            </aside>
        </div>
    );
}