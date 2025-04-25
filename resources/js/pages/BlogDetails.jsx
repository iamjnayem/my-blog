import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For accessing route parameters
import { FiArrowLeft, FiBookmark, FiShare2 } from 'react-icons/fi';
import Header from '../components/Header';

const BlogDetails = () => {
    const { id } = useParams(); // Get the blog ID from the URL
    const [darkMode, setDarkMode] = useState(false);
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simulated API call to fetch blog data
    useEffect(() => {
        setLoading(true);

        // Simulate fetching blog data by ID
        const fetchData = async () => {
            setTimeout(() => {
                const sampleBlogs = [
                    {
                        id: 1,
                        title: 'React 18 New Features Explained',
                        author: 'You',
                        date: '2023-05-15',
                        content: `
                            <p>React 18 introduces several groundbreaking features that enhance performance and developer experience. Below are some highlights:</p>
                            <h3>Concurrent Rendering</h3>
                            <p>React 18 introduces concurrent rendering, which allows React to work on multiple tasks simultaneously without blocking the main thread.</p>
                            <h3>Automatic Batching</h3>
                            <p>Automatic batching groups multiple state updates into a single re-render, improving performance.</p>
                            <p>These changes make React more efficient and scalable for modern web applications.</p>
                        `,
                        isPopular: true,
                    },
                    {
                        id: 2,
                        title: 'Mastering Tailwind CSS for Rapid UI Development',
                        author: 'You',
                        date: '2023-05-10',
                        content: `
                            <p>Tailwind CSS is a utility-first CSS framework that helps developers build responsive and customizable user interfaces quickly.</p>
                            <h3>Why Use Tailwind?</h3>
                            <ul>
                                <li>Highly customizable with configuration files.</li>
                                <li>No need to write custom CSS classes.</li>
                                <li>Built-in responsive design utilities.</li>
                            </ul>
                            <p>With Tailwind, you can focus on building components rather than writing repetitive CSS.</p>
                        `,
                        isPopular: true,
                    },
                    {
                        id: 3,
                        title: 'Laravel with React: The Perfect Full-Stack Combo',
                        author: 'You',
                        date: '2023-05-05',
                        content: `
                            <p>Laravel and React together provide a powerful full-stack solution for building modern web applications.</p>
                            <h3>Backend with Laravel</h3>
                            <p>Laravel provides a robust backend framework with features like Eloquent ORM, routing, and authentication.</p>
                            <h3>Frontend with React</h3>
                            <p>React allows you to build dynamic, interactive user interfaces with reusable components.</p>
                            <p>Together, they form a seamless stack for building scalable applications.</p>
                        `,
                    },
                ];

                const selectedBlog = sampleBlogs.find((blog) => blog.id === parseInt(id));
                if (selectedBlog) {
                    setBlog(selectedBlog);
                }
                setLoading(false);
            }, 800);
        };

        fetchData();
    }, [id]);

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
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />

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

                {/* Blog Content */}
                <article className={`p-6 rounded-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-green-50 hover:bg-green-100'}`}>
                    <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-green-300' : 'text-green-700'}`}>{blog.title}</h1>
                    <div className="flex items-center text-sm mb-4">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>By {blog.author}</span>
                        <span className={`mx-2 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>•</span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{blog.date}</span>
                    </div>
                    <div
                        className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                    <div className="flex items-center mt-6 space-x-4">
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
                    </div>
                </article>
            </main>
        </div>
    );
};

export default BlogDetails;
