import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home.jsx';

const App = () => {
    return (
        <Home/>
    );
}

ReactDOM.createRoot(document.getElementById('app')).render(
        <App />
);


