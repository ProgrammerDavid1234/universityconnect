import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FileText, GraduationCap, Upload, LogOut } from 'lucide-react';
import styles from './Dashboard.module.css';

const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: BookOpen, label: 'Courses', path: '/dashboard/courses' },
        { icon: FileText, label: 'Assignments', path: '/dashboard/assignments' },
        { icon: GraduationCap, label: 'Enrollments', path: '/dashboard/enrollments' },
        { icon: Upload, label: 'Submissions', path: '/dashboard/submissions' },
    ];

    return (
        <aside className={styles.sidebar}>
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a2e' }}>
                <span className="text-2xl font-bold text-green-700">KDU</span> Connect
            </div>

            <nav className={styles.nav}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/dashboard'}
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
    );
};

export default Sidebar;
