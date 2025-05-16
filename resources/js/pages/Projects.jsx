import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import QuickLinks from '../components/QuickLinks';

const Projects = ({ darkMode }) => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                if (!response.ok) throw new Error('Failed to fetch projects');
                const data = await response.json();
                setProjects(data.data || []);
            } catch (error) {
                console.error('Error fetching projects:', error.message);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
            {/* Header */}
            <Header darkMode={darkMode} setDarkMode={() => { }} currentDate={new Date().toLocaleDateString()} />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row">

                {/* Projects Content */}
                <div className="flex-1 md:mr-8">
                    {/* Page Heading */}
                    <div className="mb-6">
                        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            Here are my <span className="text-green-500">Projects</span>
                        </h1>
                        <p className={`mt-2 text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            A showcase of what I've built, crafted with love & caffeine.
                        </p>
                    </div>

                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <Link
                                    key={project.id}
                                    to={`/projects/${project.id}`}
                                    className={`block rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-green-50'
                                        }`}
                                >
                                    <div className="p-6">
                                        <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                                            {project.name}
                                        </h2>
                                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-3`}>
                                            {project.description}
                                        </p>
                                    </div>
                                    <div className={`px-6 py-3 text-sm font-medium text-right ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-green-100 text-green-800'
                                        }`}>
                                        View Details →
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className={`col-span-full p-8 text-center rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                                <p className="text-lg">No projects found.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Links - Sticky Sidebar */}
                <aside className="md:w-64 mt-10 md:mt-0">
                    <QuickLinks darkMode={darkMode} />
                </aside>
            </main>
        </div>
    );
};

export default Projects;
