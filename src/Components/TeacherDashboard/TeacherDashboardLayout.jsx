import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import styles from '../Dashboard/Dashboard.module.css'; // Reusing styles
import { Bell, Search, ChevronDown } from 'lucide-react';

const TeacherDashboardLayout = () => {
    const location = useLocation();

    // Get page title based on path
    const getPageTitle = () => {
        const path = location.pathname.split('/').pop();
        if (!path || path === 'teacher-dashboard') return 'Teacher Dashboard';
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <div className={styles.container}>
            <TeacherSidebar />
            <div className={styles.mainContent}>
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            {getPageTitle()}
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Search Bar - Hidden on mobile, visible on lg */}
                        <div className="hidden lg:flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 w-64 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                            <Search size={18} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-600 placeholder:text-gray-400"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="h-8 w-px bg-gray-200 mx-1"></div>

                            <div className="bg-blue-50 text-blue-700 text-xs font-bold px-4 py-2 rounded-full border border-blue-100 shadow-sm">
                                2025/2026 Session
                            </div>

                            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <Bell size={20} />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                            </button>

                            <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white group-hover:ring-indigo-100 transition-all">
                                    DR
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-bold text-gray-700 group-hover:text-indigo-600 transition-colors">Dr. Smith</p>
                                    <p className="text-xs text-gray-500">Lecturer</p>
                                </div>
                                <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </div>
                        </div>
                    </div>
                </header>
                <main className={styles.contentArea}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default TeacherDashboardLayout;
