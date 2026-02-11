import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    PlusCircle,
    Settings,
    LogOut,
    User,
    Bell,
    Search,
    Layout,
    Menu,
    X
} from 'lucide-react';

const AdminLayout = ({ children, onLogout, title }) => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: FileText, label: 'Blogs', path: '/admin/blogs' },
        { icon: PlusCircle, label: 'Add Blog', path: '/admin/add-blog' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 45
                    }}
                />
            )}

            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: 'var(--primary)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <Layout size={18} />
                        </div>
                        <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>SaaSPanel</span>
                    </div>
                    <button className="show-mobile" onClick={toggleSidebar}>
                        <X size={20} />
                    </button>
                </div>

                <nav style={{ padding: '0 1rem', flex: 1 }}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                marginBottom: '0.25rem',
                                color: location.pathname === item.path ? 'var(--primary)' : 'var(--text-light)',
                                background: location.pathname === item.path ? '#f0f7ff' : 'transparent',
                                fontWeight: 600,
                                fontSize: '0.925rem'
                            }}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
                    <button
                        onClick={onLogout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            width: '100%',
                            padding: '0.75rem 1rem',
                            color: 'var(--danger)',
                            fontWeight: 600,
                            fontSize: '0.925rem'
                        }}
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                {/* Top Navbar */}
                <header style={{
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '2rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button className="show-mobile" onClick={toggleSidebar} style={{ color: 'var(--text)' }}>
                            <Menu size={24} />
                        </button>
                        <h2 style={{ fontSize: '1.5rem' }}>{title}</h2>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div className="hidden-mobile" style={{ position: 'relative' }}>
                            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                            <input
                                placeholder="Search..."
                                style={{ background: 'white', paddingLeft: '2.75rem', height: '40px', width: '200px' }}
                            />
                        </div>
                        <button className="hidden-mobile" style={{ color: 'var(--text-light)' }}><Bell size={20} /></button>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text)'
                        }}>
                            <User size={20} />
                        </div>
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
