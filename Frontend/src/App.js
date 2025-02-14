import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import SignupPage from './components/signup';
import LoginPage from './components/login';
import HomePage from './components/home';
import EventPage from './components/events';
import ResultPage from './components/results';
import RegistrationsPage from './components/registrations';
import NewsPage from './components/news';
import ProfilePage from './components/profile';
import Dashboard from './components/admin/admin-dashboard';
import AdminEventsPage from './components/admin/add-event';
import AdminResultsPage from './components/admin/admin-result';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './App.css';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";
        const usertype = sessionStorage.getItem("userType");
        setLoggedIn(isLoggedIn);
        setUserType(usertype);
        if (userType === 'admin'){
            setIsAdmin(true);
        }
    }, []);

    const handleLogout = () => {
        setLoggedIn(false);
        setIsAdmin(false);
        sessionStorage.removeItem("loggedIn");
        sessionStorage.removeItem("isAdmin");
        sessionStorage.removeItem("userType");
    };  

    const ProtectedRoute = ({ children }) => {
        return loggedIn ? children : <Navigate to="/login" replace />;
    };

    return (
        <Router>
            <div className="app-container">
                <Navbar
                    loggedIn={loggedIn}
                    onLogout={handleLogout} 
                />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />} />

                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />

                        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                        <Route path="/events" element={<ProtectedRoute><EventPage /></ProtectedRoute>} />
                        <Route path="/results" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
                        <Route path="/registrations" element={<ProtectedRoute><RegistrationsPage /></ProtectedRoute>} />
                        <Route path="/news" element={<ProtectedRoute><NewsPage /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

                        <Route path="/admin-dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/admin-events" element={<ProtectedRoute><AdminEventsPage /></ProtectedRoute>} />
                        <Route path="/admin-results" element={<ProtectedRoute><AdminResultsPage /></ProtectedRoute>} />
                        <Route path="/admin-profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                        
                    </Routes>
                </div>
                <Footer onLogout={handleLogout}/>
            </div>
        </Router>
    );
};

export default App;

