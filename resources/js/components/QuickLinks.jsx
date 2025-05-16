// QuickLinks.js
import { FiUser, FiCode, FiBriefcase,FiHome } from 'react-icons/fi';

  // Define quick links dynamically
const quickLinks = [
    { href: '/profile', icon: <FiUser />, label: 'About Me' },
    { href: '/projects', icon: <FiCode />, label: 'Projects' },
    { href: '/', icon: <FiHome />, label: 'Home' },
    // { href: '#', icon: <FiSettings />, label: 'Settings' },
];

const QuickLinks = ({ darkMode }) => {
    return (
        <div className="md:w-64 mt-6 md:mt-0">
            <div className={`sticky top-24 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-green-50'} shadow-md`}>
                <h3 className={`font-bold mb-4 ${darkMode ? 'text-green-300' : 'text-green-700'}`}>Quick Links</h3>
                <ul className="space-y-3">
                    {quickLinks.map((link, index) => (
                        <li key={index}>
                            <a
                                href={link.href}
                                className={`flex items-center space-x-2 ${darkMode ? 'text-gray-300 hover:text-green-300' : 'text-gray-700 hover:text-green-600'}`}
                            >
                                {link.icon}
                                <span>{link.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default QuickLinks;
