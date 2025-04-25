import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiSearch, FiBookmark, FiUser, FiSettings } from 'react-icons/fi';

const Home = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('latest');
    const [currentDate, setCurrentDate] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    // Sample blog data - replace with your actual data fetching logic
    useEffect(() => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setBlogs([
                {
                    id: 1,
                    title: 'React 18 New Features Explained',
                    author: 'You',
                    date: '2023-05-15',
                    excerpt: 'Discover the latest features in React 18 including concurrent rendering, automatic batching and more...',
                    isPopular: true
                },
                {
                    id: 2,
                    title: 'Mastering Tailwind CSS for Rapid UI Development',
                    author: 'You',
                    date: '2023-05-10',
                    excerpt: 'Learn how to leverage Tailwind CSS to build beautiful, responsive interfaces in record time...',
                    isPopular: true
                },
                {
                    id: 3,
                    title: 'Laravel with React: The Perfect Full-Stack Combo',
                    author: 'You',
                    date: '2023-05-05',
                    excerpt: 'Explore how to integrate Laravel backend with React frontend for powerful full-stack applications...'
                },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    // Set current date
    useEffect(() => {
        const date = new Date();
        setCurrentDate(date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }));
    }, []);

    // Filter blogs based on active tab
    const filteredBlogs = () => {
        switch (activeTab) {
            case 'popular':
                return blogs.filter(blog => blog.isPopular);
            case 'all':
                return blogs;
            case 'latest':
            default:
                return [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
            {/* Header */}
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

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6 flex flex-col md:flex-row">
                {/* Blog Content */}
                <div className="flex-1 md:mr-8">
                    {/* Tabs */}
                    <div className={`flex border-b ${darkMode ? 'border-gray-700' : 'border-green-200'} mb-6`}>
                        <button
                            onClick={() => setActiveTab('latest')}
                            className={`py-2 px-4 font-medium ${activeTab === 'latest' ? (darkMode ? 'text-green-300 border-b-2 border-green-300' : 'text-green-600 border-b-2 border-green-600') : (darkMode ? 'text-gray-400' : 'text-gray-600')}`}
                        >
                            Latest
                        </button>
                        <button
                            onClick={() => setActiveTab('popular')}
                            className={`py-2 px-4 font-medium ${activeTab === 'popular' ? (darkMode ? 'text-green-300 border-b-2 border-green-300' : 'text-green-600 border-b-2 border-green-600') : (darkMode ? 'text-gray-400' : 'text-gray-600')}`}
                        >
                            Popular
                        </button>
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`py-2 px-4 font-medium ${activeTab === 'all' ? (darkMode ? 'text-green-300 border-b-2 border-green-300' : 'text-green-600 border-b-2 border-green-600') : (darkMode ? 'text-gray-400' : 'text-gray-600')}`}
                        >
                            All Blogs
                        </button>
                    </div>

                    {/* Blog List */}
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredBlogs().map(blog => (
                                <article
                                    key={blog.id}
                                    className={`p-6 rounded-lg transition-all duration-300 hover:shadow-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-green-50 hover:bg-green-100'}`}
                                >
                                    <h2 className={`text-xl font-bold mb-2 ${darkMode ? 'text-green-300' : 'text-green-700'}`}>{blog.title}</h2>
                                    <div className="flex items-center text-sm mb-3">
                                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>By {blog.author}</span>
                                        <span className={`mx-2 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>•</span>
                                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{blog.date}</span>
                                    </div>
                                    <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{blog.excerpt}</p>
                                    <a
                                        href={`/blog/${blog.id}`}
                                        className={`inline-flex items-center font-medium ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800'}`}
                                    >
                                        ...Read more
                                    </a>
                                </article>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Links - Sticky Sidebar */}
                <div className="md:w-64 mt-6 md:mt-0">
                    <div className={`sticky top-24 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-green-50'} shadow-md`}>
                        <h3 className={`font-bold mb-4 ${darkMode ? 'text-green-300' : 'text-green-700'}`}>Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className={`flex items-center space-x-2 ${darkMode ? 'text-gray-300 hover:text-green-300' : 'text-gray-700 hover:text-green-600'}`}
                                >
                                    <FiUser className="flex-shrink-0" />
                                    <span>Profile</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={`flex items-center space-x-2 ${darkMode ? 'text-gray-300 hover:text-green-300' : 'text-gray-700 hover:text-green-600'}`}
                                >
                                    <FiBookmark className="flex-shrink-0" />
                                    <span>Bookmarks</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={`flex items-center space-x-2 ${darkMode ? 'text-gray-300 hover:text-green-300' : 'text-gray-700 hover:text-green-600'}`}
                                >
                                    <FiSettings className="flex-shrink-0" />
                                    <span>Settings</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
