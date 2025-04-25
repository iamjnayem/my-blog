// QuickLinks.js
import { FiUser, FiBookmark, FiSettings } from 'react-icons/fi';

const QuickLinks = ({ darkMode, links }) => {
    return (
        <div className="md:w-64 mt-6 md:mt-0">
            <div className={`sticky top-24 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-green-50'} shadow-md`}>
                <h3 className={`font-bold mb-4 ${darkMode ? 'text-green-300' : 'text-green-700'}`}>Quick Links</h3>
                <ul className="space-y-3">
                    {links.map((link, index) => (
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
