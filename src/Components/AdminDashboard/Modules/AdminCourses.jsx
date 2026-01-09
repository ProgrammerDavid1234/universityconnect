import React, { useState } from 'react';
import { BookOpen, Trash2, Search, Users } from 'lucide-react';

const mockCourses = [
    { id: 1, code: 'CSC 301', title: 'Data Structures', teacher: 'Dr. John Smith', students: 45, semester: '1st' },
    { id: 2, code: 'CSC 305', title: 'Operating Systems', teacher: 'Dr. John Smith', students: 50, semester: '1st' },
    { id: 3, code: 'GNS 301', title: 'Business Plan Draft', teacher: 'Prof. Sarah Connor', students: 120, semester: '1st' },
];

const AdminCourses = () => {
    const [courses, setCourses] = useState(mockCourses);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            setCourses(courses.filter(c => c.id !== id));
        }
    };

    const filteredCourses = courses.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <header className="mb-8 flex md:flex-row flex-col md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Course Administration</h2>
                    <p className="text-gray-500 text-sm mt-1">View and manage all system courses</p>
                </div>

                <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-red-100 w-full md:w-80 shadow-sm">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="ml-2 bg-transparent border-none outline-none text-sm w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                    <div key={course.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleDelete(course.id)}
                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                title="Delete Course"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-xl mb-4">
                            <BookOpen size={24} />
                        </div>

                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{course.code}</span>
                                <span className="text-xs font-bold text-gray-400">• {course.semester} Sem</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 leading-tight">{course.title}</h3>
                            <p className="text-sm text-gray-500 mt-1 font-medium">{course.teacher}</p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-600">
                            <Users size={16} className="text-gray-400" />
                            <span>{course.students} Students Enrolled</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminCourses;
