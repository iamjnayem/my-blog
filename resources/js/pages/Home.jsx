import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiSearch, FiBookmark, FiUser, FiSettings } from 'react-icons/fi';
import Header from '../components/Header';
import QuickLinks from '../components/QuickLinks';
import { Link } from 'react-router-dom';

const Home = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('latest');
    const [currentDate, setCurrentDate] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Define quick links dynamically
    const quickLinks = [
        { href: '#', icon: <FiUser />, label: 'Profile' },
        { href: '#', icon: <FiBookmark />, label: 'Bookmarks' },
        { href: '#', icon: <FiSettings />, label: 'Settings' },
    ];

    // Fetch blogs from the API
    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/blogs'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const data = await response.json();
                setBlogs(data.data.blogs); // Adjust based on your API response structure
            } catch (error) {
                console.error('Error fetching blogs:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
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
        let filtered = [...blogs];

        // Filter by active tab
        if (activeTab === 'popular') {
            filtered = filtered.filter(blog => blog.is_popular === 1);
        } else if (activeTab === 'latest') {
            filtered = filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        // Filter by search query
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(blog =>
                blog.title.toLowerCase().includes(query) ||
                blog.excerpt.toLowerCase().includes(query)
            );
        }

        return filtered;
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
            {/* Header */}
            <Header darkMode={darkMode} setDarkMode={setDarkMode} currentDate={currentDate} searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6 flex flex-col md:flex-row">
                {/* Blog Content */}
                <div className="flex-1 md:mr-8">
                    {/* Tabs */}
                    <div className={`flex border-b ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-green-200 bg-white'} mb-6 sticky top-19.5 z-10`}>

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
                                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>By {blog.author?.name || 'Unknown Author'}</span>
                                        <span className={`mx-2 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>•</span>
                                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{new Date(blog.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{blog.excerpt}</p>
                                    <Link
                                        to={`/blog/${blog.id}`}
                                        className={`inline-flex items-center font-medium ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800'}`}
                                    >
                                        ...Read more
                                    </Link>
                                </article>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Links - Sticky Sidebar */}
                <QuickLinks darkMode={darkMode} links={quickLinks} />

            </main>
        </div>
    );
};

export default Home;
