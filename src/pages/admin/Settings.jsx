import AdminLayout from '../../components/layout/AdminLayout';
import { Settings as SettingsIcon, User, Globe, Shield, CreditCard } from 'lucide-react';

const Settings = ({ onLogout }) => {
    const sections = [
        { name: 'Profile Settings', icon: User, desc: 'Update your personal information' },
        { name: 'General Settings', icon: Globe, desc: 'Manage global site configuration' },
        { name: 'Security', icon: Shield, desc: 'Update password and security' },
        { name: 'Billing', icon: CreditCard, desc: 'Manage your subscription' },
    ];

    return (
        <AdminLayout onLogout={onLogout} title="Settings">
            <div style={{ maxWidth: '800px' }} className="animate-fade-in">
                <div className="card" style={{ padding: '1rem' }}>
                    {sections.map((sec, i) => (
                        <div
                            key={i}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '1.5rem',
                                borderBottom: i === sections.length - 1 ? 'none' : '1px solid var(--border)',
                                cursor: 'pointer'
                            }}
                            className="settings-item"
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                <div style={{ color: 'var(--primary)' }}>
                                    <sec.icon size={24} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{sec.name}</h4>
                                    <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>{sec.desc}</p>
                                </div>
                            </div>
                            <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Manage</button>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default Settings;
