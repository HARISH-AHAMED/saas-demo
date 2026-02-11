import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { getBlogById, createBlog, updateBlogApi } from '../../utils/api';
import { Save, ArrowLeft, X, Upload, Loader2 } from 'lucide-react';

const AddBlog = ({ onLogout, isEditing = false }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        status: 'Draft'
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditing && id) {
            const fetchBlog = async () => {
                setFetching(true);
                try {
                    const blog = await getBlogById(id);
                    setFormData({
                        title: blog.title,
                        description: blog.description,
                        content: blog.content,
                        status: blog.status
                    });
                    if (blog.imageUrl) setPreviewUrl(blog.imageUrl);
                } catch (err) {
                    setError('Failed to fetch blog details');
                } finally {
                    setFetching(false);
                }
            };
            fetchBlog();
        }
    }, [isEditing, id]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('content', formData.content);
        data.append('status', formData.status);
        if (selectedFile) {
            data.append('image', selectedFile);
        }

        try {
            if (isEditing) {
                await updateBlogApi(id, data);
            } else {
                await createBlog(data);
            }
            navigate('/admin/blogs');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return (
        <AdminLayout onLogout={onLogout} title="Loading...">
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                <Loader2 size={40} className="animate-spin" />
            </div>
        </AdminLayout>
    );

    return (
        <AdminLayout onLogout={onLogout} title={isEditing ? 'Edit Blog Post' : 'Create New Blog'}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <button
                    onClick={() => navigate('/admin/blogs')}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', marginBottom: '1.5rem', fontWeight: 600 }}
                >
                    <ArrowLeft size={16} /> Back to list
                </button>

                {error && (
                    <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: 600 }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="card animate-fade-in" style={{ padding: 'clamp(1.5rem, 5vw, 2.5rem)' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem' }}>Cover Image</label>
                        <div
                            onClick={() => fileInputRef.current.click()}
                            style={{
                                width: '100%',
                                height: 'clamp(160px, 30vh, 240px)',
                                border: '2px dashed var(--border)',
                                borderRadius: 'var(--radius)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                background: '#f8fafc',
                                transition: 'all 0.2s ease',
                                position: 'relative'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                        >
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <>
                                    <Upload size={32} style={{ color: 'var(--text-light)', marginBottom: '1rem' }} />
                                    <p style={{ color: 'var(--text-light)', fontWeight: 500, textAlign: 'center' }}>Click to upload image</p>
                                    <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.5rem' }}>PNG, JPG or WebP (max. 5MB)</p>
                                </>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Blog Title</label>
                        <input
                            type="text"
                            placeholder="e.g., 10 Tips for Better SaaS UX"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            style={{ width: '100%' }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Short Description</label>
                        <textarea
                            placeholder="A brief summary for the blog card..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            style={{ width: '100%', height: '100px', resize: 'vertical' }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Main Content</label>
                        <textarea
                            placeholder="Write your blog post content here..."
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            style={{ width: '100%', height: '300px', resize: 'vertical' }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Publishing Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            style={{ width: '100%', maxWidth: '200px' }}
                        >
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            {isEditing ? 'Update Post' : 'Save & Publish'}
                        </button>
                        <button type="button" onClick={() => navigate('/admin/blogs')} className="btn btn-outline" disabled={loading} style={{ width: '100%' }}>
                            <X size={18} /> Cancel
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AddBlog;
