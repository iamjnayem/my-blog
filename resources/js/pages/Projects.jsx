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
                const projects = await response.json();
                setProjects(projects.data || []);
            } catch (error) {
                console.error('Error fetching projects:', error.message);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
            <Header darkMode={darkMode} setDarkMode={() => { }} currentDate={new Date().toLocaleDateString()} />

            <main className="container mx-auto px-4 py-6 flex flex-col md:flex-row">
                {/* Projects Content */}
                <div className="flex-1 md:mr-8">
                    <h1 className="text-3xl font-bold mb-6">My Projects</h1>

                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                        {projects.map((project) => (
                            <Link
                                key={project.id}
                                to={`/projects/${project.id}`}
                                className={`block rounded-lg shadow-md p-5 transition transform hover:scale-105 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-green-50 hover:bg-green-100'}`}
                            >
                                <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                                <p className="text-sm">{project.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Quick Links - Sticky Sidebar */}
                <QuickLinks darkMode={darkMode} />
            </main>
        </div>
    );
};

export default Projects;
