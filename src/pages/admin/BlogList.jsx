import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { getAllBlogs, deleteBlogApi } from '../../utils/api';
import { Edit, Trash2, Plus, ExternalLink, Loader2, Image as ImageIcon } from 'lucide-react';

const BlogList = ({ onLogout }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const data = await getAllBlogs();
            setBlogs(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await deleteBlogApi(id);
                fetchBlogs();
            } catch (err) {
                alert('Failed to delete blog: ' + err.message);
            }
        }
    };

    return (
        <AdminLayout onLogout={onLogout} title="Manage Blogs">
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => navigate('/admin/add-blog')} className="btn btn-primary">
                    <Plus size={18} /> <span className="hidden-mobile">New Blog Post</span>
                </button>
            </div>

            <div className="card animate-fade-in" style={{ overflowX: 'auto' }}>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                        <Loader2 size={32} className="animate-spin" />
                    </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--danger)' }}>{error}</div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)', background: '#f8fafc' }}>
                                <th style={{ padding: '1.25rem 2rem', color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: 700 }}>IMAGE</th>
                                <th style={{ padding: '1.25rem', color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: 700 }}>TITLE</th>
                                <th style={{ padding: '1.25rem', color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: 700 }}>DATE</th>
                                <th style={{ padding: '1.25rem', color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: 700 }}>STATUS</th>
                                <th style={{ padding: '1.25rem 2rem', color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: 700, textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map(blog => (
                                <tr key={blog._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '0.75rem 2rem' }}>
                                        {blog.imageUrl ? (
                                            <img
                                                src={blog.imageUrl}
                                                alt=""
                                                style={{ width: '48px', height: '32px', objectFit: 'cover', borderRadius: '4px' }}
                                            />
                                        ) : (
                                            <div style={{ width: '48px', height: '32px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', color: '#94a3b8' }}>
                                                <ImageIcon size={16} />
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ padding: '1.25rem', fontWeight: 600 }}>{blog.title}</td>
                                    <td style={{ padding: '1.25rem', color: 'var(--text-light)' }}>{new Date(blog.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '1.25rem' }}>
                                        <span className={`badge badge-${blog.status.toLowerCase()}`}>
                                            {blog.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.25rem 2rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                                            <button
                                                onClick={() => navigate(`/blog/${blog._id}`)}
                                                style={{ color: 'var(--primary)', padding: '0.5rem' }}
                                                title="Preview"
                                            >
                                                <ExternalLink size={18} />
                                            </button>
                                            <button
                                                onClick={() => navigate(`/admin/edit-blog/${blog._id}`)}
                                                style={{ color: 'var(--secondary)', padding: '0.5rem' }}
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(blog._id)}
                                                style={{ color: 'var(--danger)', padding: '0.5rem' }}
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AdminLayout>
    );
};

export default BlogList;
