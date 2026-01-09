import React, { useState } from 'react';
import { BookOpen, Clock, User, X } from 'lucide-react';

const coursesData = [
    { id: 1, code: 'CSC 301', title: 'Data Structures & Algorithms', instructor: 'Dr. A. O. Olabiyisi', time: 'Mon 10:00 AM', units: 3, description: 'Fundamental concepts of data structures and algorithms including stacks, queues, trees, graphs, sorting and searching techniques.' },
    { id: 2, code: 'GNS 301', title: 'Entrepreneurship Studies', instructor: 'Mrs. Folakemi', time: 'Tue 2:00 PM', units: 2, description: 'Introduction to entrepreneurship, business planning, and management strategies.' },
    { id: 3, code: 'CSC 305', title: 'Operating Systems', instructor: 'Mr. John Doe', time: 'Wed 12:00 PM', units: 3, description: 'Concepts of operating systems, process management, memory management, file systems, and I/O management.' },
    { id: 4, code: 'CSC 303', title: 'Database Management', instructor: 'Dr. Smith', time: 'Thu 8:00 AM', units: 3, description: 'Relational database concepts, SQL, normalization, and database design.' },
];

const Courses = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
                <p className="text-gray-500 text-sm mt-1">Manage and access your course materials</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coursesData.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer group"
                        onClick={() => setSelectedCourse(course)}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100 flex items-center gap-1">
                                <BookOpen size={12} />
                                {course.code}
                            </span>
                            <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">{course.units} Units</span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors line-clamp-2 h-14">{course.title}</h3>

                        <div className="space-y-2.5">
                            <div className="flex items-center gap-2.5 text-sm text-gray-600">
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <User size={14} />
                                </div>
                                <span className="font-medium text-gray-700">{course.instructor}</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-sm text-gray-600">
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <Clock size={14} />
                                </div>
                                <span>{course.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedCourse && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-lg p-0 shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
                        {/* Header Image/Pattern Area */}
                        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 relative">
                            <button
                                onClick={() => setSelectedCourse(null)}
                                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                            >
                                <X size={18} />
                            </button>
                            <div className="absolute -bottom-6 left-8">
                                <div className="bg-white p-1 rounded-2xl shadow-lg inline-block">
                                    <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center text-blue-600">
                                        <BookOpen size={32} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-10 px-8 pb-8">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="text-blue-600 font-bold text-sm tracking-wide uppercase">{selectedCourse.code}</span>
                                    <h2 className="text-2xl font-extrabold text-gray-900 mt-1">{selectedCourse.title}</h2>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 my-6">
                                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                                    <User size={14} className="text-gray-400" />
                                    {selectedCourse.instructor}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                                    <Clock size={14} className="text-gray-400" />
                                    {selectedCourse.time}
                                </div>
                            </div>

                            <div className="prose prose-sm text-gray-500 mb-8">
                                <h4 className="font-bold text-gray-800 text-sm mb-2 uppercase tracking-wider">Course Overview</h4>
                                <p className="leading-relaxed">{selectedCourse.description}</p>
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                                    Access Materials
                                </button>
                                <button
                                    onClick={() => setSelectedCourse(null)}
                                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;
