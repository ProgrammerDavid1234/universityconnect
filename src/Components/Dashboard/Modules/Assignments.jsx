import React, { useState } from 'react';
import { FileText, Calendar, CheckCircle, Upload, Type, X, Paperclip, Send } from 'lucide-react';

const assignmentsData = [
    { id: 1, course: 'CSC 301', title: 'Implement a Linked List', dueDate: '2025-10-15', status: 'Pending', points: 20 },
    { id: 2, course: 'GNS 301', title: 'Business Plan Draft', dueDate: '2025-10-20', status: 'Submitted', points: 50 },
    { id: 3, course: 'CSC 305', title: 'Process Scheduling Algorithm', dueDate: '2025-10-22', status: 'Pending', points: 30 },
];

const Assignments = () => {
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [submissionType, setSubmissionType] = useState('text'); // 'text' or 'file'

    const handleSubmitClick = (assignment) => {
        setSelectedAssignment(assignment);
        setSubmissionType('text');
    };

    const handleCloseModal = () => {
        setSelectedAssignment(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock submission logic
        alert(`Submitted ${submissionType} for ${selectedAssignment.title}`);
        handleCloseModal();
    };

    return (
        <div className="p-6 max-w-5xl mx-auto relative">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Assignments</h2>
                    <p className="text-gray-500 text-sm mt-1">Track your pending tasks and submissions</p>
                </div>
                <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {assignmentsData.filter(a => a.status === 'Pending').length} Pending
                </div>
            </header>

            <div className="space-y-4">
                {assignmentsData.map((assignment) => (
                    <div key={assignment.id} className="group bg-white rounded-2xl border border-gray-100 p-5 flex flex-col md:flex-row md:items-center justify-between hover:shadow-md hover:border-gray-200 transition-all duration-300">
                        <div className="flex items-start gap-5">
                            <div className={`p-4 rounded-2xl shrink-0 transition-colors ${assignment.status === 'Submitted' ? 'bg-green-50 text-green-600 group-hover:bg-green-100' : 'bg-amber-50 text-amber-600 group-hover:bg-amber-100'}`}>
                                <FileText size={24} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 uppercase tracking-wide">{assignment.course}</span>
                                    {assignment.status === 'Pending' && (
                                        <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Due Soon</span>
                                    )}
                                </div>
                                <h3 className="font-bold text-gray-800 text-lg group-hover:text-amber-600 transition-colors">{assignment.title}</h3>

                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} className="text-gray-400" />
                                        <span>Due: <span className="text-gray-700 font-medium">{assignment.dueDate}</span></span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                    <span className="font-medium text-gray-600">{assignment.points} Points</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 md:mt-0 flex items-center justify-end">
                            {assignment.status === 'Submitted' ? (
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold bg-green-50 text-green-700 border border-green-100">
                                    <CheckCircle size={16} />
                                    Submitted
                                </span>
                            ) : (
                                <button
                                    onClick={() => handleSubmitClick(assignment)}
                                    className="px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 active:scale-95 transform"
                                >
                                    Submit Now
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Submission Modal */}
            {selectedAssignment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl scale-100 animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Submit Assignment</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {selectedAssignment.course} • {selectedAssignment.title}
                                </p>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 bg-white hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors border border-gray-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto">
                            {/* Tabs */}
                            <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                                <button
                                    onClick={() => setSubmissionType('text')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${submissionType === 'text' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    <Type size={16} /> Type Answer
                                </button>
                                <button
                                    onClick={() => setSubmissionType('file')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${submissionType === 'file' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    <Upload size={16} /> Upload Document
                                </button>
                            </div>

                            {/* Text Input Mode */}
                            {submissionType === 'text' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                    <div className="relative">
                                        <textarea
                                            placeholder="Type your answer here..."
                                            className="w-full h-64 p-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none resize-none text-gray-700 leading-relaxed"
                                        ></textarea>
                                        <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-medium bg-white px-2 py-1 rounded border border-gray-100">
                                            Markdown Supported
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* File Upload Mode */}
                            {submissionType === 'file' && (
                                <div className="h-64 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-center p-8 hover:border-indigo-400 hover:bg-indigo-50/30 transition-colors cursor-pointer group animate-in fade-in slide-in-from-bottom-2">
                                    <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Paperclip size={28} />
                                    </div>
                                    <h4 className="font-bold text-gray-700 mb-1">Click to upload or drag and drop</h4>
                                    <p className="text-sm text-gray-500 max-w-xs">
                                        PDF, DOCX, or TXT files allowed. Max size 10MB.
                                    </p>
                                    <button className="mt-6 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                                        Browse Files
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
                            <button
                                onClick={handleCloseModal}
                                className="px-5 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-white hover:text-gray-800 border border-transparent hover:border-gray-200 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
                            >
                                <Send size={16} /> Submit Assignment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Assignments;
