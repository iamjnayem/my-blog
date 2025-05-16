import { useState } from 'react';
import { FiEdit2, FiMail, FiBriefcase, FiMapPin } from 'react-icons/fi';
import Header from '../components/Header';
import QuickLinks from '../components/QuickLinks';

const Profile = ({ darkMode }) => {
    const user = {
        name: 'John Doe',
        bio: 'Full Stack Developer | Laravel & React Enthusiast',
        email: 'john.doe@example.com',
        location: 'Dhaka, Bangladesh',
        jobHistory: [
            { company: 'ABC Software', role: 'Frontend Developer', duration: '2020 - Present' },
            { company: 'XYZ Tech', role: 'Junior Developer', duration: '2018 - 2020' },
        ],
    };

    return (
        <>
            <Header darkMode={darkMode} setDarkMode={() => { }} currentDate={new Date().toLocaleDateString()} />
            <div className={`min-h-screen px-4 py-6 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
                <div className="container mx-auto flex flex-col md:flex-row md:space-x-8">
                    {/* Main Profile Content */}
                    <div className="flex-1">
                        {/* Profile Card */}
                        <div className={`rounded-lg shadow-md p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-green-50'}`}>
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold">{user.name}</h1>
                                <button className="flex items-center text-sm px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition">
                                    <FiEdit2 className="mr-2" /> Edit Profile
                                </button>
                            </div>
                            <p className="mt-2 text-sm">{user.bio}</p>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center text-sm">
                                    <FiMail className="mr-2" /> {user.email}
                                </div>
                                <div className="flex items-center text-sm">
                                    <FiMapPin className="mr-2" /> {user.location}
                                </div>
                            </div>
                        </div>

                        {/* Job History */}
                        <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-green-50'}`}>
                            <h2 className="text-xl font-semibold mb-4">Job History</h2>
                            <ul className="space-y-4">
                                {user.jobHistory.map((job, index) => (
                                    <li key={index} className={`p-4 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                                        <h3 className="font-medium text-green-600">{job.role}</h3>
                                        <p className="text-sm">{job.company}</p>
                                        <span className="text-xs text-gray-400">{job.duration}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* QuickLinks Sidebar */}
                    <div className="mt-8 md:mt-0 md:w-1/3">
                        <QuickLinks darkMode={darkMode} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
