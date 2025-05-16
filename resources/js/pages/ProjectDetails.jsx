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

    // Fetch project details by slug
    const fetchProject = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/projects/${slug}`);
            if (!response.ok) throw new Error('Failed to fetch project');

            const data = await response.json();

            if (data.code !== "200") {
                throw new Error(data.message || 'Something went wrong');
            }

            setProject(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Set current date on load
    useEffect(() => {
        const date = new Date();
        setCurrentDate(date.toLocaleDateString('en-US', {
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
            {/* Header */}
            <Header darkMode={darkMode} setDarkMode={setDarkMode} currentDate={currentDate} />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6 flex flex-col md:flex-row">
                {/* Project Content */}
                <div className="flex-1 md:mr-8">
                    {/* Project Title */}
                    <h1 className="text-3xl font-bold mb-2">{project.name}</h1>

                    {/* Project Description */}
                    <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.description}</p>

                    {/* Status Badge */}
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${project.status === 'active'
                            ? darkMode ? 'bg-green-800 text-green-100' : 'bg-green-100 text-green-800'
                            : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                        }`}>
                        {project.status}
                    </span>

                    {/* GitHub Link */}
                    {project.github && (
                        <div className="mt-4">
                            <strong>GitHub:</strong>{' '}
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                {project.github}
                            </a>
                        </div>
                    )}

                    {/* Live Demo URL */}
                    {project.url && (
                        <div className="mt-2">
                            <strong>Demo:</strong>{' '}
                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                {project.url}
                            </a>
                        </div>
                    )}

                    {/* Markdown Readme */}
                    <div className="mt-8 prose prose-green max-w-none">
                        <ReactMarkdown>{project.readme}</ReactMarkdown>
                    </div>

                    {/* Timestamps */}
                    <div className="mt-8 text-sm text-gray-500">
                        Created at: {moment(project.created_at).format('DD-MM-YYYY HH:mm')} <br />
                        Last updated: {moment(project.updated_at).format('DD-MM-YYYY HH:mm')}
                    </div>
                </div>

                {/* Sidebar - Quick Links */}
                <QuickLinks darkMode={darkMode} />
            </main>
        </div>
    );
};

export default ProjectDetails;