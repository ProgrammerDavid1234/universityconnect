import React, { useState } from 'react';
import { FileText, Plus, Edit2, Trash2, Calendar, CheckCircle, X, Save, Clock } from 'lucide-react';

const initialAssignments = [
    { id: 1, course: 'CSC 301', title: 'Implement a Linked List', dueDate: '2025-10-15', points: 20, submissions: 15 },
    { id: 2, course: 'GNS 301', title: 'Business Plan Draft', dueDate: '2025-10-20', points: 50, submissions: 42 },
    { id: 3, course: 'CSC 305', title: 'Process Scheduling Algorithm', dueDate: '2025-10-22', points: 30, submissions: 8 },
];

const mockCourses = ['CSC 301', 'CSC 305', 'GNS 301'];

const TeacherAssignments = () => {
    const [assignments, setAssignments] = useState(initialAssignments);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAssignment, setCurrentAssignment] = useState(null);
    const [formData, setFormData] = useState({ course: '', title: '', dueDate: '', points: 0, description: '' });

    const handleOpenModal = (assignment = null) => {
        if (assignment) {
            setCurrentAssignment(assignment);
            setFormData(assignment);
        } else {
            setCurrentAssignment(null);
            setFormData({ course: '', title: '', dueDate: '', points: 0, description: '' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentAssignment(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this assignment?')) {
            setAssignments(assignments.filter(a => a.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentAssignment) {
            setAssignments(assignments.map(a => a.id === currentAssignment.id ? { ...formData, id: currentAssignment.id, submissions: currentAssignment.submissions } : a));
        } else {
            setAssignments([...assignments, { ...formData, id: Date.now(), submissions: 0 }]);
        }
        handleCloseModal();
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Assignments</h2>
                    <p className="text-gray-500 text-sm mt-1">Create and manage assignments for your courses</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 active:scale-95"
                >
                    <Plus size={18} /> Create Assignment
                </button>
            </header>

            <div className="space-y-4">
                {assignments.map((assignment) => (
                    <div key={assignment.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col md:flex-row md:items-center justify-between hover:shadow-md hover:border-indigo-100 transition-all group">
                        <div className="flex items-start gap-5">
                            <div className="p-4 rounded-2xl shrink-0 bg-indigo-50 text-indigo-600">
                                <FileText size={24} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 uppercase tracking-wide">{assignment.course}</span>
                                </div>
                                <h3 className="font-bold text-gray-800 text-lg group-hover:text-indigo-600 transition-colors">{assignment.title}</h3>

                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} className="text-gray-400" />
                                        <span>Due: {assignment.dueDate}</span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                    <span className="font-medium text-gray-600">{assignment.points} Points</span>
                                    <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                    <span className="font-medium text-green-600">{assignment.submissions} Submissions</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 md:mt-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleOpenModal(assignment)}
                                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
                            >
                                <Edit2 size={16} /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(assignment.id)}
                                className="px-4 py-2 border border-red-100 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                            >
                                <Trash2 size={16} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl scale-100 animate-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-800">{currentAssignment ? 'Edit Assignment' : 'Create Assignment'}</h3>
                            <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Select Course</label>
                                <select
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                    value={formData.course}
                                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                >
                                    <option value="">Select a course...</option>
                                    {mockCourses.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Assignment Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                    placeholder="e.g. Research Project"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Due Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                        value={formData.dueDate}
                                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Points</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                        value={formData.points}
                                        onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Instructions/Description</label>
                                <textarea
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all h-32 resize-none"
                                    placeholder="Detailed instructions..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-5 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 border border-transparent transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
                                >
                                    <Save size={18} /> {currentAssignment ? 'Save Changes' : 'Create Assignment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherAssignments;
