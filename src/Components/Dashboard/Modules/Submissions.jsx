import React, { useState } from 'react';
import { Upload, Trash2, Edit2, File } from 'lucide-react';

const initialSubmissions = [
    { id: 1, assignment: 'Business Plan Draft', file: 'business_plan_v1.pdf', date: '2025-10-18', grade: 'A' },
    { id: 2, assignment: 'Linked List Implementation', file: 'linked_list.cpp', date: '2025-10-12', grade: 'B+' },
];

const Submissions = () => {
    const [submissions, setSubmissions] = useState(initialSubmissions);
    const [isEditing, setIsEditing] = useState(null); // id of submission being edited

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this submission?')) {
            setSubmissions(submissions.filter(s => s.id !== id));
        }
    };

    const handleEdit = (id) => {
        // Mock edit - just alerting for now
        alert(`Edit functionality for submission ${id} would open a form here.`);
    };

    const handleUpload = () => {
        // Mock upload
        const newSub = {
            id: Date.now(),
            assignment: 'New Assignment Submission',
            file: 'uploaded_file.docx',
            date: new Date().toISOString().split('T')[0],
            grade: 'Pending'
        };
        setSubmissions([newSub, ...submissions]);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">My Submissions</h2>
                    <p className="text-gray-500 text-sm mt-1">History of your uploaded assignments</p>
                </div>
                <button onClick={handleUpload} className="bg-gray-900 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95 text-sm font-bold">
                    <Upload size={18} /> New Submission
                </button>
            </header>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Assignment</th>
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">File</th>
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Date Submitted</th>
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Grade</th>
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {submissions.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                                                <File size={32} />
                                            </div>
                                            <p className="text-gray-500 font-medium">No submissions yet.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : submissions.map((sub) => (
                                <tr key={sub.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="p-6">
                                        <div className="font-bold text-gray-800">{sub.assignment}</div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                                                <File size={16} />
                                            </div>
                                            <span className="text-sm text-gray-600 font-medium underline decoration-gray-300 underline-offset-4 hover:decoration-blue-400 transition-colors cursor-pointer">{sub.file}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 text-sm text-gray-500 font-medium">{sub.date}</td>
                                    <td className="p-6">
                                        <span className={`inline-flex items-center justify-center min-w-[3rem] px-2.5 py-1 rounded-lg text-xs font-bold border ${sub.grade === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                                            {sub.grade}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(sub.id)} className="w-8 h-8 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors" title="Edit">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(sub.id)} className="w-8 h-8 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Submissions;
