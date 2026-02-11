import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBlogById } from '../../utils/api';
import PublicNavbar from '../../components/layout/PublicNavbar';
import { ArrowLeft, Calendar, Loader2 } from 'lucide-react';

const BlogPost = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlogById(id);
                setBlog(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loader2 size={40} className="animate-spin" style={{ color: 'var(--primary)' }} />
        </div>
    );

    if (error || !blog) return (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2 style={{ color: 'var(--danger)' }}>Error: {error || 'Blog not found'}</h2>
            <Link to="/" className="btn btn-outline" style={{ marginTop: '1rem' }}>Go Back Home</Link>
        </div>
    );

    return (
        <div>
            <PublicNavbar />
            <main className="container" style={{ margin: '3rem auto' }}>
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '2rem' }}>
                    <ArrowLeft size={16} /> Back to stories
                </Link>

                <article className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {blog.imageUrl && (
                        <div style={{ width: '100%', maxHeight: '450px', borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: '2.5rem', boxShadow: 'var(--shadow)' }}>
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    )}

                    <header style={{ marginBottom: '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                            <Calendar size={14} />
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>{blog.title}</h1>
                        <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.25rem)', color: 'var(--text-light)', lineHeight: 1.6 }}>{blog.description}</p>
                    </header>

                    <div style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#334155' }}>
                        {blog.content.split('\n').map((paragraph, i) => (
                            <p key={i} style={{ marginBottom: '1.5rem' }}>{paragraph}</p>
                        ))}
                    </div>
                </article>
            </main>
        </div>
    );
};

export default BlogPost;
