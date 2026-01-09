import React from 'react';
import { BookOpen, Users, FileText, CheckCircle, Clock } from 'lucide-react';

const TeacherDashboardHome = () => {
    const stats = [
        { label: 'Active Courses', value: '3', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Total Students', value: '145', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Active Assignments', value: '5', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Pending Grading', value: '12', icon: Clock, color: 'text-red-600', bg: 'bg-red-50' },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Welcome back, Dr. Smith!</h1>
                <p className="text-gray-500 mt-2">Here's what's happening in your classes today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
                        </div>
                        <p className="text-gray-500 font-medium text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity / Quick Actions */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-xl text-gray-800 mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all text-left group">
                            <div className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <BookOpen size={20} />
                            </div>
                            <span className="font-bold text-gray-700 block">Create Course</span>
                        </button>
                        <button className="p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all text-left group">
                            <div className="bg-amber-100 text-amber-600 w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <FileText size={20} />
                            </div>
                            <span className="font-bold text-gray-700 block">New Assignment</span>
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-xl text-gray-800 mb-6">Recent Submissions</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                        SJ
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-800">Sarah Jones</p>
                                        <p className="text-xs text-gray-500">submitted linked_list.py</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Just now</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboardHome;
