import React, { useState } from 'react';
import { GraduationCap, Trash2, Search, BookOpen } from 'lucide-react';

const mockEnrollments = [
    { id: 1, student: 'Alice Johnson', course: 'CSC 301', semester: '1st', addedAt: '2025-09-10' },
    { id: 2, student: 'Bob Smith', course: 'CSC 301', semester: '1st', addedAt: '2025-09-11' },
    { id: 3, student: 'Charlie Brown', course: 'GNS 301', semester: '1st', addedAt: '2025-09-12' },
];

const AdminEnrollments = () => {
    const [enrollments, setEnrollments] = useState(mockEnrollments);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to remove this student from the course?')) {
            setEnrollments(enrollments.filter(e => e.id !== id));
        }
    };

    const filteredEnrollments = enrollments.filter(e =>
        e.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <header className="mb-8 flex md:flex-row flex-col md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Enrollment Administration</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage course enrollments</p>
                </div>

                <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-red-100 w-full md:w-80 shadow-sm">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search enrollments..."
                        className="ml-2 bg-transparent border-none outline-none text-sm w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Student</th>
                            <th className="px-6 py-4">Course</th>
                            <th className="px-6 py-4">Semester</th>
                            <th className="px-6 py-4">Enrolled Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredEnrollments.map((enrollment) => (
                            <tr key={enrollment.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
                                            <GraduationCap size={16} />
                                        </div>
                                        <span className="font-bold text-gray-800 text-sm">{enrollment.student}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5">
                                        <BookOpen size={16} className="text-gray-400" />
                                        <span className="text-sm font-bold text-gray-700 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">{enrollment.course}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {enrollment.semester}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                    {enrollment.addedAt}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleDelete(enrollment.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Remove Enrollment"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminEnrollments;
