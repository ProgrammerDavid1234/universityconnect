import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, FileText, Upload, GraduationCap, BarChart2, LogOut } from 'lucide-react';
import styles from '../Dashboard/Dashboard.module.css'; // Reusing styles

const AdminSidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/admin-dashboard' },
        { icon: Users, label: 'Users', path: '/admin-dashboard/users' },
        { icon: BookOpen, label: 'Courses', path: '/admin-dashboard/courses' },
        { icon: FileText, label: 'Assignments', path: '/admin-dashboard/assignments' },
        { icon: Upload, label: 'Submissions', path: '/admin-dashboard/submissions' },
        { icon: GraduationCap, label: 'Enrollments', path: '/admin-dashboard/enrollments' },
    ];

    return (
        <aside className={styles.sidebar}>
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a2e' }}>
                <span className="text-2xl font-bold text-red-700">NACOS</span> Admin
            </div>

            <nav className={styles.nav}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/admin-dashboard'}
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

export default AdminSidebar;
