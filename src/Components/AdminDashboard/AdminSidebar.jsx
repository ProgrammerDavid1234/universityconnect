import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, FileText, Upload, GraduationCap, BarChart2, LogOut } from 'lucide-react';
import styles from '../Dashboard/Dashboard.module.css'; // Reusing styles

const AdminSidebar = ({ isOpen, onClose }) => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/admin-dashboard' },
        { icon: Users, label: 'Users', path: '/admin-dashboard/users' },
        { icon: BookOpen, label: 'Courses', path: '/admin-dashboard/courses' },
        { icon: FileText, label: 'Assignments', path: '/admin-dashboard/assignments' },
        { icon: Upload, label: 'Submissions', path: '/admin-dashboard/submissions' },
        { icon: GraduationCap, label: 'Enrollments', path: '/admin-dashboard/enrollments' },
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
                        <span className="text-2xl font-bold text-red-700">NACOS</span> Admin
                    </div>
                    {/* Close button for mobile */}
                    <button onClick={onClose} className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                        <LogOut size={20} className="rotate-180" />
                    </button>
                </div>

                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/admin-dashboard'}
                            onClick={onClose}
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

export default AdminSidebar;
