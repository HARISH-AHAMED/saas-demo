import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { getAllBlogs } from '../../utils/api';
import { FileText, FileEdit, CheckCircle, TrendingUp, Loader2 } from 'lucide-react';

const Dashboard = ({ onLogout }) => {
    const [stats, setStats] = useState({ total: 0, draft: 0, published: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const blogs = await getAllBlogs();
                setStats({
                    total: blogs.length,
                    draft: blogs.filter(b => b.status === 'Draft').length,
                    published: blogs.filter(b => b.status === 'Published').length
                });
            } catch (err) {
                console.error('Failed to fetch stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Blogs', value: stats.total, icon: FileText, color: '#3b82f6' },
        { label: 'Published Blogs', value: stats.published, icon: CheckCircle, color: '#10b981' },
        { label: 'Draft Blogs', value: stats.draft, icon: FileEdit, color: '#6366f1' },
        { label: 'Avg Reads', value: '1.2k', icon: TrendingUp, color: '#f59e0b' },
    ];

    return (
        <AdminLayout onLogout={onLogout} title="Dashboard Overview">
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                    <Loader2 size={40} className="animate-spin" />
                </div>
            ) : (
                <>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '3rem'
                    }}>
                        {statCards.map((card, i) => (
                            <div key={i} className="card animate-fade-in" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '14px',
                                    background: `${card.color}15`,
                                    color: card.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <card.icon size={26} />
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: 600 }}>{card.label}</p>
                                    <h3 style={{ fontSize: '1.75rem' }}>{card.value}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="card animate-fade-in" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Platform Activity</h3>
                        <div style={{
                            height: '300px',
                            background: '#f8fafc',
                            borderRadius: 'var(--radius)',
                            border: '2px dashed var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-light)',
                            textAlign: 'center',
                            padding: '1rem'
                        }}>
                            <p>Activity Chart Visualization (Connected to Backend - Demo Data)</p>
                        </div>
                    </div>
                </>
            )}
        </AdminLayout>
    );
};

export default Dashboard;
