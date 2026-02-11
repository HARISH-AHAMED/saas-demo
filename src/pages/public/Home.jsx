import { useState, useEffect } from 'react';
import { getPublishedBlogs } from '../../utils/api';
import PublicNavbar from '../../components/layout/PublicNavbar';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getPublishedBlogs();
                setBlogs(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div>
            <PublicNavbar />
            <main className="container" style={{ margin: '4rem auto' }}>
                <header style={{ textAlign: 'center', marginBottom: '4rem' }} className="animate-fade-in">
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Modern Insights for Modern SaaS</h1>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>Strategies, tips, and articles to help you build better software and scale your business.</p>
                </header>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                        <Loader2 size={40} className="animate-spin" style={{ color: 'var(--primary)' }} />
                    </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', color: 'var(--danger)', padding: '2rem' }}>
                        <p>Error: {error}</p>
                    </div>
                ) : (
                    <div className="responsive-grid">
                        {blogs.map(blog => (
                            <article key={blog._id} className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
                                {blog.imageUrl && (
                                    <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                                        <img
                                            src={blog.imageUrl}
                                            alt={blog.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                                <div style={{ padding: '2rem', flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                                        <Calendar size={14} />
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </div>
                                    <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', lineHeight: 1.3 }}>{blog.title}</h2>
                                    <p style={{ color: 'var(--text-light)', marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{blog.description}</p>
                                </div>
                                <footer style={{ padding: '1.5rem 2rem', background: '#f8fafc', borderTop: '1px solid var(--border)' }}>
                                    <Link to={`/blog/${blog._id}`} className="btn btn-primary" style={{ width: '100%' }}>
                                        Read More <ArrowRight size={16} />
                                    </Link>
                                </footer>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
