import React from 'react';
import { Users, BookOpen, FileText, Upload, TrendingUp, Activity, AlertCircle } from 'lucide-react';

const AdminDashboardHome = () => {
    const stats = [
        { label: 'Total Users', value: '1,245', sub: '+12% from last month', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Active Courses', value: '84', sub: 'Across 6 departments', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Assignments', value: '342', sub: 'Active this semester', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Submissions', value: '12.4k', sub: 'Total uploaded files', icon: Upload, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    const recentActivity = [
        { id: 1, user: 'Dr. John Smith', action: 'Created a new course', target: 'CSC 401: AI Fundamentals', time: '10 mins ago', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50' },
        { id: 2, user: 'Admin User', action: 'Deleted user account', target: 'Temp Student (NACOS/2021/9999)', time: '45 mins ago', icon: Users, color: 'text-red-600 bg-red-50' },
        { id: 3, user: 'System', action: 'Backup completed', target: 'Daily Database Backup', time: '2 hours ago', icon: Activity, color: 'text-green-600 bg-green-50' },
        { id: 4, user: 'Prof. Sarah Connor', action: 'Posted assignment', target: 'Project Phase 1', time: '3 hours ago', icon: FileText, color: 'text-amber-600 bg-amber-50' },
    ];

    const topCourses = [
        { code: 'GNS 301', title: 'Entrepreneurship', students: 450, growth: '+5%' },
        { code: 'CSC 201', title: 'Intro to Python', students: 320, growth: '+12%' },
        { code: 'MTH 101', title: 'General Mathematics', students: 310, growth: '+2%' },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">System Overview</h1>
                    <p className="text-gray-500 mt-2">Welcome back, Administrator. Here's what's happening.</p>
                </div>
                <div className="text-sm font-bold text-gray-500 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm">
                    Last updated: Just now
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                <TrendingUp size={12} /> {stat.sub.split(' ')[0]}
                            </span>
                        </div>
                        <span className="text-3xl font-bold text-gray-800 block mb-1">{stat.value}</span>
                        <p className="text-gray-500 font-medium text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-xl text-gray-800">Recent System Activity</h3>
                        <button className="text-sm font-bold text-red-600 hover:text-red-700">View All</button>
                    </div>

                    <div className="space-y-6">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${activity.color}`}>
                                    <activity.icon size={20} />
                                </div>
                                <div className="flex-1 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">
                                                {activity.user} <span className="font-medium text-gray-500">{activity.action}</span>
                                            </p>
                                            <p className="text-sm text-gray-600 mt-0.5 font-medium">{activity.target}</p>
                                        </div>
                                        <span className="text-xs font-bold text-gray-400">{activity.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Performing Courses */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-fit">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-xl text-gray-800">Top Courses</h3>
                        <AlertCircle size={20} className="text-gray-400" />
                    </div>

                    <div className="space-y-4">
                        {topCourses.map((course, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">{course.title}</h4>
                                    <p className="text-xs text-gray-500 font-bold">{course.code}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-800">{course.students}</p>
                                    <p className="text-xs text-green-600 font-bold">{course.growth}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <h4 className="font-bold text-gray-800 mb-4">System Health</h4>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-gray-500">Server Load</span>
                                    <span className="text-green-600">24%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[24%] rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-gray-500">Storage Usage</span>
                                    <span className="text-amber-600">68%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 w-[68%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
