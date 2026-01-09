import React, { useState } from 'react';
import { Upload, Trash2, Search, FileText, CheckCircle, Clock } from 'lucide-react';

const mockSubmissions = [
    { id: 201, student: 'Alice Johnson', assignment: 'Implement a Linked List', course: 'CSC 301', submittedAt: '2025-10-14 14:30', status: 'Graded', score: 18 },
    { id: 202, student: 'Bob Smith', assignment: 'Implement a Linked List', course: 'CSC 301', submittedAt: '2025-10-15 09:15', status: 'Pending', score: null },
    { id: 203, student: 'Charlie Brown', assignment: 'Business Plan Draft', course: 'GNS 301', submittedAt: '2025-10-15 10:00', status: 'Pending', score: null },
];

const AdminSubmissions = () => {
    const [submissions, setSubmissions] = useState(mockSubmissions);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            setSubmissions(submissions.filter(s => s.id !== id));
        }
    };

    const filteredSubmissions = submissions.filter(s =>
        s.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.assignment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <header className="mb-8 flex md:flex-row flex-col md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Submission Administration</h2>
                    <p className="text-gray-500 text-sm mt-1">Monitor and manage student submissions</p>
                </div>

                <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-red-100 w-full md:w-80 shadow-sm">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search submissions..."
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
                            <th className="px-6 py-4">Assignment Info</th>
                            <th className="px-6 py-4">Submitted At</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredSubmissions.map((submission) => (
                            <tr key={submission.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                                            {submission.student.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="font-bold text-gray-800 text-sm">{submission.student}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-bold text-sm text-gray-800">{submission.assignment}</p>
                                        <p className="text-xs text-gray-500">{submission.course}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                                    {submission.submittedAt}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${submission.status === 'Graded' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                                        {submission.status === 'Graded' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                        {submission.status} {submission.score !== null && `(${submission.score})`}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleDelete(submission.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete Submission"
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

export default AdminSubmissions;
