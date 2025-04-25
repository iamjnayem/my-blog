// Header.js
import { FiSearch, FiSun, FiMoon } from 'react-icons/fi';

const Header = ({ darkMode, setDarkMode, currentDate }) => {
    return (
        <header className={`sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-green-50'} shadow-md`}>
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo/Blog Name */}
                <div className="flex items-center space-x-2">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#4CAF50" />
                        <path d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6Z" fill="white" />
                        <path d="M12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16Z" fill="#4CAF50" />
                        <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="white" />
                    </svg>
                    <h1 className={`text-xl font-bold ${darkMode ? 'text-green-300' : 'text-green-700'}`}>DevJourney</h1>
                </div>

                {/* Search Box */}
                <div className="flex-1 max-w-md mx-4">
                    <div className={`relative ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            className={`w-full py-2 px-4 pl-10 rounded-lg focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 focus:ring-green-500' : 'bg-white focus:ring-green-300 border border-gray-300'}`}
                        />
                        <FiSearch className="absolute left-3 top-3" />
                    </div>
                </div>

                {/* Date and Dark Mode Toggle */}
                <div className={`flex flex-col items-end border ${darkMode ? 'border-gray-600' : 'border-green-200'} rounded-lg px-3 py-1`}>
                    <span className="text-sm">{currentDate}</span>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`flex items-center justify-center w-6 h-6 rounded-full mt-1 ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-green-100 text-gray-700'}`}
                        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {darkMode ? <FiSun size={14} /> : <FiMoon size={14} />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
