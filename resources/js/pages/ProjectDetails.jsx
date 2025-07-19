import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import QuickLinks from '../components/QuickLinks';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';

const ProjectDetails = () => {
    const { slug } = useParams();
    const [darkMode, setDarkMode] = useState(false);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const fetchProject = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/projects/${slug}`);
                if (!response.ok) throw new Error('Failed to fetch project');
                const data = await response.json();
                if (data.code != "200") throw new Error(data.message || 'Something went wrong');
                setProject(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        setCurrentDate(new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }));

        fetchProject();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                Error: {error || 'Project not found'}
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} currentDate={currentDate} />

            <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
                {/* Main Project Content */}
                <div className="flex-1 md:mr-8">
                    {/* Title */}
                    <h1 className="text-4xl font-bold mb-3">
                        {project.name}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${project.status === 'active'
                            ? darkMode ? 'bg-green-800 text-green-100' : 'bg-green-100 text-green-800'
                            : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                            }`}>
                            {project.status}
                        </span>
                        <span className="text-sm text-gray-500">
                            Created: {moment(project.created_at).format('DD MMM YYYY')}
                        </span>
                        <span className="text-sm text-gray-500">
                            Updated: {moment(project.updated_at).format('DD MMM YYYY')}
                        </span>
                    </div>

                    {/* Description */}
                    <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {project.description}
                    </p>

                    {/* Links */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.373 0 12a12 12 0 008.208 11.438c.6.112.82-.262.82-.582 0-.288-.012-1.236-.018-2.236-3.338.726-4.042-1.61-4.042-1.61-.546-1.388-1.334-1.758-1.334-1.758-1.09-.746.082-.73.082-.73 1.204.084 1.84 1.238 1.84 1.238 1.07 1.834 2.808 1.304 3.492.996.108-.776.42-1.304.762-1.604-2.664-.304-5.466-1.334-5.466-5.934 0-1.31.468-2.384 1.236-3.222-.124-.304-.536-1.526.118-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.006-.404c1.02.004 2.046.138 3.006.404 2.292-1.552 3.3-1.23 3.3-1.23.656 1.65.244 2.872.12 3.176.77.838 1.236 1.912 1.236 3.222 0 4.61-2.806 5.628-5.478 5.924.432.372.816 1.102.816 2.222 0 1.606-.014 2.898-.014 3.292 0 .324.216.7.828.582A12.003 12.003 0 0024 12c0-6.627-5.373-12-12-12z" />
                                </svg>
                                View on GitHub
                            </a>
                        )}
                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-500 transition"
                            >
                                🚀 Live Demo
                            </a>
                        )}
                    </div>

                    {/* Readme Content */}
                    <div className={`prose ${darkMode ? 'prose-invert' : ''} prose-green max-w-none`}>
                        <ReactMarkdown>{project.readme}</ReactMarkdown>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="md:w-64 mt-10 md:mt-0">
                    <QuickLinks darkMode={darkMode} />
                </aside>
            </main>
        </div>
    );
};

export default ProjectDetails;
