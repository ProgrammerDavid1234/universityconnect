import React, { useMemo } from 'react';
import { Clock, Calendar, MessageSquare, UserX, GraduationCap, BookOpen, FileText, AlertCircle, ArrowRight, TrendingUp, CreditCard, User, Bell } from 'lucide-react';

const CircularProgress = ({ value, color, size = 60, strokeWidth = 5 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90" aria-hidden="true">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="text-gray-100"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className={color}
                />
            </svg>
            <span className="absolute text-xs font-bold text-gray-700" aria-label={`${value} percent`}>{value}%</span>
        </div>
    );
};

const StatCard = ({ stat, index }) => (
    <div 
        className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
        style={{ animationDelay: `${index * 100}ms` }}
    >
        <div className="flex justify-between items-start mb-4">
            <div 
                className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110`}
                aria-hidden="true"
            >
                <stat.icon size={24} />
            </div>
            <span 
                className={`text-xs font-bold px-2 py-1 rounded-full ${
                    stat.trend === 'Urgent' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'
                }`}
            >
                {stat.trend}
            </span>
        </div>
        <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
        </div>
    </div>
);

const AttendanceCard = ({ item }) => (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/80 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm transition-all duration-300">
        <CircularProgress value={item.percentage} color={item.color} size={50} />
        <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-800 text-sm truncate">{item.subject}</h4>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-bold text-gray-400">{item.attended}/{item.total} Classes</span>
            </div>
        </div>
    </div>
);

const GradeItem = ({ grade }) => (
    <div className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
        <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-800 text-sm">{grade.code}</h4>
            <p className="text-xs text-gray-400 truncate">{grade.title}</p>
        </div>
        <div className="text-right ml-4">
            <span className="block font-bold text-gray-800">{grade.grade}</span>
            <span className="text-xs text-gray-400">{grade.score}%</span>
        </div>
    </div>
);

const QuickActionButton = ({ icon: Icon, label, color }) => (
    <button 
        className="flex flex-col items-center gap-1 group"
        aria-label={label}
    >
        <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <Icon size={18} />
        </div>
        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">{label}</span>
    </button>
);

const DashboardHome = () => {
    const stats = useMemo(() => [
        { label: 'Score', value: '100%', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-100', trend: '+0.12' },
        { label: 'Enrolled Courses', value: '8', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100', trend: 'Active' },
        { label: 'Pending Assignments', value: '3', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-100', trend: 'Urgent' },
        { label: 'Next Exam', value: '4 Days', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-100', trend: 'Prepare' },
    ], []);

    const attendanceData = useMemo(() => [
        { subject: 'Engineering Graphics', attended: 12, total: 14, percentage: 85, color: 'text-blue-500' },
        { subject: 'Mathematical Engineering', attended: 27, total: 29, percentage: 93, color: 'text-green-500' },
        { subject: 'Computer Architecture', attended: 27, total: 30, percentage: 90, color: 'text-indigo-500' },
        { subject: 'Database Management', attended: 24, total: 25, percentage: 96, color: 'text-purple-500' },
    ], []);

    const timetable = useMemo(() => [
        { time: '10:00 AM', course: 'PHY 202', subject: 'Engineering Physics', room: 'Lecture Hall 1' },
        { time: '11:00 AM', course: 'CSC 204', subject: 'Logic Circuits', room: 'Lab 3' },
        { time: '02:00 PM', course: 'GNS 301', subject: 'Entrepreneurship', room: 'Auditorium' },
    ], []);

    const deadlines = useMemo(() => [
        { course: 'CSC 204', task: 'Lab Report 3', due: 'Tomorrow, 11:59 PM', priority: 'high', date: '24', month: 'Oct' },
        { course: 'GNS 301', task: 'Business Plan Draft', due: 'Fri, 20 Oct', priority: 'medium', date: '20', month: 'Oct' },
    ], []);

    const recentGrades = useMemo(() => [
        { code: 'MTH 201', grade: 'A', score: 92, title: 'Calculus II' },
        { code: 'PHY 202', grade: 'B+', score: 88, title: 'Physics Lab' },
        { code: 'GST 101', grade: 'A', score: 95, title: 'Use of English' }
    ], []);

    const performanceData = useMemo(() => [65, 80, 75, 90, 85, 95], []);

    const teachers = useMemo(() => ['Dr. Adebayo', 'Prof. Sarah'], []);

    return (
        <div className="p-4 sm:p-8 max-w-[1600px] mx-auto space-y-6 sm:space-y-8">
            {/* Top Stats Row */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, idx) => (
                    <StatCard key={stat.label} stat={stat} index={idx} />
                ))}
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                {/* Left Column (Main Content) */}
                <div className="xl:col-span-2 space-y-6 sm:space-y-8">
                    {/* Attendance Details */}
                    <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Attendance Overview</h2>
                                <p className="text-sm text-gray-500 mt-1">Track your class participation</p>
                            </div>
                            <button className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full transition-colors self-start sm:self-auto">
                                View Full Report <ArrowRight size={14} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {attendanceData.map((item) => (
                                <AttendanceCard key={item.subject} item={item} />
                            ))}
                        </div>
                    </section>

                    {/* Semester Performance & Recent Grades */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {/* Performance Chart */}
                        <section className="bg-gradient-to-br from-indigo-900 to-purple-900 p-6 sm:p-8 rounded-3xl shadow-lg text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="text-lg font-bold">Performance</h2>
                                    <TrendingUp className="text-purple-300" size={20} />
                                </div>
                                <div className="h-40 flex items-end gap-2 sm:gap-3 justify-between">
                                    {performanceData.map((h, i) => (
                                        <div key={i} className="flex flex-col items-center gap-2 w-full">
                                            <div
                                                className="w-full bg-white/20 rounded-t-lg hover:bg-white/30 transition-all cursor-pointer relative group"
                                                style={{ height: `${h}%` }}
                                                role="img"
                                                aria-label={`Test ${i + 1}: ${h}% score`}
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                    {h}% Score
                                                </div>
                                            </div>
                                            <span className="text-xs text-purple-200 font-medium">T{i + 1}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Recent Grades */}
                        <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-gray-800">Recent Grades</h2>
                                <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">View All</button>
                            </div>
                            <div className="space-y-4">
                                {recentGrades.map((grade) => (
                                    <GradeItem key={grade.code} grade={grade} />
                                ))}
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center">
                                <div className="flex gap-4 items-center">
                                    <QuickActionButton 
                                        icon={CreditCard} 
                                        label="Pay Fees" 
                                        color="bg-orange-50 text-orange-600" 
                                    />
                                    <QuickActionButton 
                                        icon={BookOpen} 
                                        label="Reg Course" 
                                        color="bg-indigo-50 text-indigo-600" 
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Timetable Section */}
                    <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                            <h2 className="text-xl font-bold text-gray-800">Today's Timetable</h2>
                            <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 flex items-center gap-2 self-start sm:self-auto">
                                <Calendar size={14} /> Oct 24, 2025
                            </div>
                        </div>
                        <div className="overflow-x-auto -mx-6 sm:mx-0">
                            <div className="min-w-[600px] px-6 sm:px-0">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100">
                                            <th className="pb-4 font-semibold pl-4">Time</th>
                                            <th className="pb-4 font-semibold">Course Details</th>
                                            <th className="pb-4 font-semibold">Location</th>
                                            <th className="pb-4 font-semibold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {timetable.map((slot, idx) => (
                                            <tr key={`${slot.course}-${idx}`} className="group hover:bg-gray-50 transition-colors">
                                                <td className="py-4 pl-4 font-semibold text-gray-800 w-32">
                                                    {slot.time}
                                                </td>
                                                <td className="py-4">
                                                    <div className="font-bold text-gray-800">{slot.course}</div>
                                                    <div className="text-xs text-gray-500">{slot.subject}</div>
                                                </td>
                                                <td className="py-4 text-gray-600 text-sm">
                                                    <span className="flex items-center gap-1">
                                                        <div className="w-2 h-2 rounded-full bg-gray-300"></div> {slot.room}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Upcoming</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column (Sidebar Widgets) */}
                <div className="space-y-6 sm:space-y-8">
                    {/* Upcoming Deadlines */}
                    <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-gray-800">Deadlines</h2>
                                <Calendar size={18} className="text-gray-400" />
                            </div>
                            <div className="space-y-4">
                                {deadlines.map((item, idx) => (
                                    <div key={`${item.course}-${idx}`} className="flex gap-4 items-start p-3 rounded-2xl border border-gray-50 hover:border-red-100 hover:bg-red-50/30 transition-colors cursor-pointer group">
                                        <div className={`w-10 h-10 rounded-xl shrink-0 flex flex-col items-center justify-center text-xs font-bold ${
                                            item.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                                        }`}>
                                            <span>{item.date}</span>
                                            <span className="text-[8px] uppercase">{item.month}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-800 text-sm group-hover:text-red-700 transition-colors truncate">{item.task}</h4>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                <span className="font-semibold text-gray-700">{item.course}</span> •
                                                <span className={item.priority === 'high' ? 'text-red-500 font-medium' : ''}>{item.due}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                                View Calendar
                            </button>
                        </div>
                    </section>

                    {/* Announcements */}
                    <section className="bg-gray-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-gray-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-lg font-bold">Announcements</h2>
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                    <Bell size={16} />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="pl-4 border-l-2 border-green-500 relative">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-green-500"></div>
                                    <h4 className="font-bold text-sm text-gray-100">Exam Timetable Released</h4>
                                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">Fall 2025 semester exams start next week. Check the student portal for details.</p>
                                </div>
                                <div className="pl-4 border-l-2 border-yellow-500 relative">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-yellow-500"></div>
                                    <h4 className="font-bold text-sm text-gray-100">Fee Contribution</h4>
                                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">Sports levy deadline has been extended till Friday 2pm.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Teachers on Leave */}
                    <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Teachers on Leave</h2>
                        <div className="space-y-4">
                            {teachers.map((name) => (
                                <div key={name} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                                        <UserX size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-gray-700 text-sm truncate">{name}</h4>
                                        <p className="text-xs text-gray-400 truncate">Computer Science Dept.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;