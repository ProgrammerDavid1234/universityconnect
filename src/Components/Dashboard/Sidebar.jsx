import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FileText, GraduationCap, Upload, LogOut } from 'lucide-react';
import styles from './Dashboard.module.css';

const Sidebar = ({ isOpen, onClose }) => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: BookOpen, label: 'Courses', path: '/dashboard/courses' },
        { icon: FileText, label: 'Assignments', path: '/dashboard/assignments' },
        { icon: GraduationCap, label: 'Enrollments', path: '/dashboard/enrollments' },
        { icon: Upload, label: 'Submissions', path: '/dashboard/submissions' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside
                className={`${styles.sidebar} fixed lg:static top-0 left-0 z-50 h-full w-[280px] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div className="flex items-center justify-between mb-8">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a2e' }}>
                        <span className="text-2xl font-bold text-green-700">NACOS</span> Connect
                    </div>
                    {/* Close button for mobile */}
                    <button onClick={onClose} className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                        <LogOut size={20} className="rotate-180" /> {/* Reusing Icon or import X */}
                    </button>
                </div>

                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/dashboard'}
                            onClick={onClose} // Close sidebar on nav click (mobile)
                            className={({ isActive }) =>
                                `${styles.navItem} ${isActive ? styles.activeNavItem : ''}`
                            }
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div style={{ marginTop: 'auto' }}>
                    <NavLink to="/" className={styles.navItem}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </NavLink>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
