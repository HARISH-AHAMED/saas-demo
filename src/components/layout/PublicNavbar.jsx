import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, X } from 'lucide-react';

const PublicNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav style={{
            background: 'white',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="container" style={{
                height: '70px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.5rem', color: 'var(--primary)' }}>
                    <Layout size={28} />
                    <span>SaaSBlog</span>
                </Link>

                <div className="hidden-mobile" style={{ display: 'flex', gap: '2.5rem', fontWeight: 600 }}>
                    <Link to="/" style={{ color: 'var(--text)' }}>Home</Link>
                    <Link to="/admin" style={{ color: 'var(--primary)' }}>Admin Portal</Link>
                </div>

                <button className="show-mobile" onClick={() => setIsOpen(!isOpen)} style={{ color: 'var(--text)' }}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="animate-fade-in show-mobile" style={{
                    padding: '1.5rem',
                    background: 'white',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    <Link to="/" onClick={() => setIsOpen(false)} style={{ color: 'var(--text)', fontWeight: 600, fontSize: '1.1rem' }}>Home</Link>
                    <Link to="/admin" onClick={() => setIsOpen(false)} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.1rem' }}>Admin Portal</Link>
                </div>
            )}
        </nav>
    );
};

export default PublicNavbar;
