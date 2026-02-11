import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/public/Home';
import BlogPost from './pages/public/BlogPost';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import BlogList from './pages/admin/BlogList';
import AddBlog from './pages/admin/AddBlog';
import Settings from './pages/admin/Settings';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('demo_auth') === 'true';
    });

    const handleLogin = () => {
        localStorage.setItem('demo_auth', 'true');
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('demo_auth');
        setIsAuthenticated(false);
    };

    const ProtectedRoute = ({ children }) => {
        if (!isAuthenticated) return <Navigate to="/admin/login" />;
        return children;
    };

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/blog/:id" element={<BlogPost />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<Login onLogin={handleLogin} />} />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <Dashboard onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/blogs"
                    element={
                        <ProtectedRoute>
                            <BlogList onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/add-blog"
                    element={
                        <ProtectedRoute>
                            <AddBlog onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/edit-blog/:id"
                    element={
                        <ProtectedRoute>
                            <AddBlog onLogout={handleLogout} isEditing={true} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/settings"
                    element={
                        <ProtectedRoute>
                            <Settings onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
