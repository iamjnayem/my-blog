import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiSearch, FiBookmark, FiUser, FiSettings } from 'react-icons/fi';
import Header from '../components/Header';
import QuickLinks from '../components/QuickLinks';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BiTrim } from 'react-icons/bi';

const Home = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('latest');
    const [currentDate, setCurrentDate] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        total: 0,
        perPage: 10,
    });
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null); 


    // Fetch blogs from the API with pagination and search
    const fetchBlogs = async (page = 1) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: page,
                limit: pagination.perPage,
                // search: searchQuery,
                tab: activeTab,
                category: selectedCategory,
            }).toString();

            const response = await fetch(`/api/blogs?${queryParams}`);
            if (!response.ok) {
                throw new Error('Failed to fetch blogs');
            }
            const responseDetails = await response.json();


            setBlogs(responseDetails.data.blogs);
            setPagination({
                currentPage: responseDetails.data.current_page,
                lastPage: responseDetails.data.last_page,
                total: responseDetails.data.total,
                perPage: responseDetails.data.per_page,
            });
        } catch (error) {
            console.error('Error fetching blogs:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const searchBlogs = async (query) => {
       
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: 1,
                limit: 10,
                search: query,
                tab: activeTab,
            }).toString();

            const response = await fetch(`/api/blogs?${queryParams}`);
            if (!response.ok) {
                throw new Error('Failed to fetch blogs');
            }
            const responseDetails = await response.json();


            setBlogs(responseDetails.data.blogs);
            setPagination({
                currentPage: responseDetails.data.current_page,
                lastPage: responseDetails.data.last_page,
                total: responseDetails.data.total,
                perPage: responseDetails.data.per_page,
            });
        } catch (error) {
            console.error('Error fetching blogs:', error.message);
        } finally {
            setLoading(false);
        }
    };

    // Set current date
    useEffect(() => {
        const date = new Date();
        setCurrentDate(date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }));
        fetchBlogs();
    }, [selectedCategory]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                if (!response.ok) throw new Error('Failed to fetch categories');
                const categories = await response.json();        
                setCategories(categories.data || []);
                setSelectedCategory(categories.data[0]?.id || null); 
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            }
        };

        fetchCategories();
        
        // fetchBlogs();
    }, []);
    

    // Handle page change
    const handlePageChange = (page) => {
        fetchBlogs(page);
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
            {/* Header */}
            <Header darkMode={darkMode} setDarkMode={setDarkMode} currentDate={currentDate} searchBlogs={searchBlogs}/>

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

                        {/* // add search able drop down here */}
                        <div className="relative ml-auto w-64 py-2">
                            <select
                                className={`px-4 py-2 rounded-md w-full appearance-none ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Select A  Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {/* <FiSearch className={`pointer-events-none absolute right-3 top-2.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} /> */}
                        </div>
                    </div>

                    {/* Blog List */}
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {blogs.map(blog => (
                                <article
                                    key={blog.id}
                                    className={`p-6 rounded-lg transition-all duration-300 hover:shadow-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-green-50 hover:bg-green-100'}`}
                                >
                                    <h2 className={`text-xl font-bold mb-2 ${darkMode ? 'text-green-300' : 'text-green-700'}`}>{blog.title}</h2>
                                    <div className="flex items-center text-sm mb-3">
                                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>By {blog.author?.name || 'Unknown Author'}</span>
                                        <span className={`mx-2 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>•</span>
                                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{moment(blog.created_at).format('DD-MM-YYYY')}</span>
                                    </div>
                                    <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{blog.excerpt}</p>
                                    <Link
                                        to={`/blog/${blog.slug}`}
                                        className={`inline-flex items-center font-medium ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800'}`}
                                    >
                                        ...Read more
                                    </Link>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        <nav className="flex space-x-2">
                            {Array.from({ length: pagination.lastPage }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 py-1 rounded-md transition-colors duration-300 ${page === pagination.currentPage
                                        ? darkMode
                                            ? 'bg-green-600 text-white'
                                            : 'bg-green-500 text-white'
                                        : darkMode
                                            ? 'bg-gray-700 text-gray-400 hover:bg-green-600 hover:text-white'
                                            : 'bg-gray-200 text-gray-600 hover:bg-green-500 hover:text-white'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Quick Links - Sticky Sidebar */}
                <QuickLinks darkMode={darkMode} />
            </main>
        </div>
    );
};

export default Home;
