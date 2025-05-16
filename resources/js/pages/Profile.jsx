import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiCheckCircle } from 'react-icons/fi';
import Header from '../components/Header';
import QuickLinks from '../components/QuickLinks';

const Profile = ({ darkMode }) => {
    const user = {
        name: 'Md Janntul Nayem',
        bio: 'Software Engineer | Polyglot Programmer | Health Tech Lover',
        email: 'iamj.nayem@gmail.com',
        location: 'Dhaka, Bangladesh',
        github: 'https://github.com/iamjnayem',
        linkedin: 'https://linkedin.com/in/jnayem',
        jobHistory: [
            {
                company: 'SSL Wireless',
                companyUrl: 'https://www.sslwireless.com/',
                role: 'Backend Specialist',
                duration: '2023 - Present',
                responsibilities: [
                    'Designing and developing scalable backend APIs',
                    'Finding api troubleshooting and performance tuning',
                    'Collaborating with Tech Lead & Others',
                    'Deployment and monitoring of applications',
                ],
            },
            {
                company: 'Sharetrip Ltd',
                companyUrl: 'https://www.sharetrip.net/',
                role: 'Backend Developer',
                duration: '2022 - 2023',
                responsibilities: [
                    'Built RESTful APIs for STPay systems.',
                    'Optimized database queries & improved application performance.',
                    'Integrated third-party services like payment gateways & SMS APIs.',
                ],
            },
        ],
        education: [
            {
                institution: 'Prime University',
                degree: 'B.Sc in Computer Science & Engineering',
                year: '2017 - 2021',
            },
        ],
    };

    return (
        <>
            <Header darkMode={darkMode} setDarkMode={() => { }} currentDate={new Date().toLocaleDateString()} />
            <div className={`min-h-screen px-4 py-10 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
                <div className="container mx-auto flex flex-col md:flex-row gap-10">
                    {/* Profile Content */}
                    <div className="flex-1 space-y-8">
                        {/* Profile Card */}
                        <div className={`rounded-2xl shadow-lg p-8 backdrop-blur-md border ${darkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-green-50/80 border-green-200'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-3xl font-bold">{user.name}</h1>
                            </div>
                            <p className="text-base leading-relaxed text-gray-400">{user.bio}</p>

                            <div className="mt-6 space-y-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <FiMail /> <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiMapPin /> <span>{user.location}</span>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-6 flex gap-4">
                                <a href={user.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-500 hover:text-green-600 transition">
                                    <FiGithub /> GitHub
                                </a>
                                <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-500 hover:text-green-600 transition">
                                    <FiLinkedin /> LinkedIn
                                </a>
                            </div>
                        </div>

                        {/* Job History */}
                        <div className={`rounded-2xl shadow-lg p-8 border ${darkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-green-50/80 border-green-200'}`}>
                            <h2 className="text-2xl font-semibold mb-6">Job History</h2>
                            <div className="space-y-6">
                                {user.jobHistory.map((job, index) => (
                                    <div
                                        key={index}
                                        className={`p-5 rounded-xl border shadow-sm transition transform hover:-translate-y-1 hover:shadow-md ${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-white border-gray-200 hover:bg-green-100'}`}
                                    >
                                        <h3 className="font-semibold text-green-600">{job.role}</h3>
                                        <p className="text-sm text-gray-900">
                                            <a href={job.companyUrl} target="_blank" rel="noopener noreferrer" className="text-black-500 hover:underline">
                                                {job.company}
                                            </a>
                                        </p>
                                        <span className="text-xs text-gray-900">{job.duration}</span>

                                        {/* Responsibilities */}
                                        {job.responsibilities && (
                                            <ul className="mt-3 space-y-2 text-sm">
                                                {job.responsibilities.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-gray-500">
                                                        <FiCheckCircle className="text-green-500 mt-0.5" /> {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Education Background */}
                        <div className={`rounded-2xl shadow-lg p-8 border ${darkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-green-50/80 border-green-200'}`}>
                            <h2 className="text-2xl font-semibold mb-6">Education</h2>
                            <div className="space-y-4">
                                {user.education.map((edu, index) => (
                                    <div
                                        key={index}
                                        className={`p-5 rounded-xl border shadow-sm transition transform hover:-translate-y-1 hover:shadow-md ${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-white border-gray-200 hover:bg-green-100'}`}
                                    >
                                        <h3 className="font-semibold text-green-600">{edu.degree}</h3>
                                        <p className="text-sm text-gray-400">{edu.institution}</p>
                                        <span className="text-xs text-gray-400">{edu.year}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="md:w-1/3">
                        <QuickLinks darkMode={darkMode} />
                    </aside>
                </div>
            </div>
        </>
    );
};

export default Profile;
