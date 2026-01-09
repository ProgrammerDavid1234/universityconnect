import React, { useState } from 'react';
import { FileText, Trash2, Search, Calendar, ChevronRight } from 'lucide-react';

const mockAssignments = [
    { id: 1, course: 'CSC 301', title: 'Implement a Linked List', teacher: 'Dr. John Smith', dueDate: '2025-10-15', submissions: 15 },
    { id: 2, course: 'GNS 301', title: 'Business Plan Draft', teacher: 'Prof. Sarah Connor', dueDate: '2025-10-20', submissions: 42 },
    { id: 3, course: 'CSC 305', title: 'Process Scheduling Algorithm', teacher: 'Dr. John Smith', dueDate: '2025-10-22', submissions: 8 },
];

const AdminAssignments = () => {
    const [assignments, setAssignments] = useState(mockAssignments);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this assignment?')) {
            setAssignments(assignments.filter(a => a.id !== id));
        }
    };

    const filteredAssignments = assignments.filter(a =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <header className="mb-8 flex md:flex-row flex-col md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Assignment Administration</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage assignments across all courses</p>
                </div>

                <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-red-100 w-full md:w-80 shadow-sm">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search assignments..."
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
                            <th className="px-6 py-4">Assignment</th>
                            <th className="px-6 py-4">Course & Teacher</th>
                            <th className="px-6 py-4">Due Date</th>
                            <th className="px-6 py-4">Stats</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredAssignments.map((assignment) => (
                            <tr key={assignment.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-orange-50 text-orange-600">
                                            <FileText size={20} />
                                        </div>
                                        <span className="font-bold text-gray-800 text-sm">{assignment.title}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-bold text-xs text-gray-500 uppercase tracking-wide bg-gray-100 px-2 py-0.5 rounded w-fit mb-1">{assignment.course}</p>
                                        <p className="text-xs text-gray-500">{assignment.teacher}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                        <Calendar size={14} className="text-gray-400" />
                                        <span>{assignment.dueDate}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                        {assignment.submissions} Subs
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleDelete(assignment.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

export default AdminAssignments;
