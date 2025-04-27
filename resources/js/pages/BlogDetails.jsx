import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For accessing route parameters
import { FiArrowLeft, FiBookmark, FiShare2 } from 'react-icons/fi';
import Header from '../components/Header';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import QuickLinks from '../components/QuickLinks';
import moment from 'moment';

const BlogDetails = () => {
    const { slug } = useParams(); // Get the blog ID from the URL
    const [darkMode, setDarkMode] = useState(false);
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

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

    // Fetch blog data from the API
    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/blogs/${slug}`); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Blog not found');
                }
                const data = await response.json();
                setBlog(data.data); // Adjust based on your API response structure
            } catch (error) {
                console.error('Error fetching blog:', error.message);
                setBlog(null); // Set blog to null if there's an error
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    // Highlight code blocks after rendering
    useEffect(() => {
        if (blog) {
            Prism.highlightAll(); // Apply Prism.js highlighting to all code blocks
        }
    }, [blog, darkMode]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                <p>Blog not found!</p>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
            {/* Header */}
            <Header darkMode={darkMode} setDarkMode={setDarkMode} currentDate={currentDate} searchQuery={searchQuery}
            setSearchQuery={setSearchQuery} />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                {/* Back Button */}
                <div className="mb-6">
                    <button
                        onClick={() => window.history.back()}
                        className={`flex items-center font-medium ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800'}`}
                    >
                        <FiArrowLeft className="mr-2" /> Back to Blogs
                    </button>
                </div>

                {/* Layout with Blog Details and Sticky Quick Links */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Blog Content */}
                    <article className={`flex-1 p-6 rounded-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-green-50 hover:bg-green-100'}`}>
                        <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-green-300' : 'text-green-700'}`}>{blog.title}</h1>
                        <div className="flex items-center text-sm mb-4">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>By {blog.author?.name || 'Unknown Author'}</span>
                            <span className={`mx-2 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>•</span>
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                                {moment(blog.created_at).format('DD-MM-YYYY')}
                            </span>
                        </div>
                        <div
                            className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                        {/* <div className="flex items-center mt-6 space-x-4">
                            <button
                                className={`flex items-center font-medium ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800'}`}
                            >
                                <FiBookmark className="mr-2" /> Bookmark
                            </button>
                            <button
                                className={`flex items-center font-medium ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800'}`}
                            >
                                <FiShare2 className="mr-2" /> Share
                            </button>
                        </div> */}
                    </article>

                    {/* Quick Links - Sticky Sidebar */}
                    <aside className="md:w-64 flex-shrink-0 sticky top-20 self-start">
                        <QuickLinks darkMode={darkMode}  />
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default BlogDetails;
