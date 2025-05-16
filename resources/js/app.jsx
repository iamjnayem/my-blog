import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogDetails from './pages/BlogDetails';
import Profile from './pages/Profile.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetails from './pages/ProjectDetails.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog/:slug" element={<BlogDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/projects" element={<Projects />} />
                {/* <Route path="/projects/:slug" element={ProjectDetails} />
                 */}
                <Route path="/projects/:slug" element={<ProjectDetails darkMode={false} />} />
            </Routes>
        </Router>
    );
}

ReactDOM.createRoot(document.getElementById('app')).render(
        <App />
);


