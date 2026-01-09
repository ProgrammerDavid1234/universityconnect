import React, { useState } from 'react';
import { FileText, Search, CheckCircle, X, Download, Eye, Award } from 'lucide-react';

const mockAssignments = [
    { id: 1, title: 'Implement a Linked List (CSC 301)', totalPoints: 20 },
    { id: 2, title: 'Business Plan Draft (GNS 301)', totalPoints: 50 },
];

const mockSubmissions = [
    { id: 201, studentName: 'Alice Johnson', matric: 'KDU/2021/0045', submittedAt: '2025-10-14 14:30', status: 'Graded', score: 18, feedback: 'Great work!', file: 'linked_list.py' },
    { id: 202, studentName: 'Bob Smith', matric: 'KDU/2021/0052', submittedAt: '2025-10-15 09:15', status: 'Pending', score: null, feedback: '', file: 'list_impl.java' },
    { id: 203, studentName: 'Charlie Brown', matric: 'KDU/2021/0061', submittedAt: '2025-10-15 10:00', status: 'Pending', score: null, feedback: '', file: 'solution.cpp' },
];

const TeacherSubmissions = () => {
    const [selectedAssignment, setSelectedAssignment] = useState(mockAssignments[0].id);
    const [submissions, setSubmissions] = useState(mockSubmissions);
    const [gradingModalOpen, setGradingModalOpen] = useState(false);
    const [currentSubmission, setCurrentSubmission] = useState(null);
    const [gradeData, setGradeData] = useState({ score: '', feedback: '' });

    const handleOpenGrading = (submission) => {
        setCurrentSubmission(submission);
        setGradeData({
            score: submission.score || '',
            feedback: submission.feedback || ''
        });
        setGradingModalOpen(true);
    };

    const handleCloseGrading = () => {
        setGradingModalOpen(false);
        setCurrentSubmission(null);
    };

    const handleSaveGrade = (e) => {
        e.preventDefault();
        setSubmissions(submissions.map(s =>
            s.id === currentSubmission.id
                ? { ...s, status: 'Graded', score: Number(gradeData.score), feedback: gradeData.feedback }
                : s
        ));
        handleCloseGrading();
    };

    const getAssignmentDetails = (id) => mockAssignments.find(a => a.id === Number(id));

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Submissions</h2>
                    <p className="text-gray-500 text-sm mt-1">Review and grade student work</p>
                </div>

                <div className="w-full md:w-auto">
                    <select
                        className="w-full md:w-80 px-4 py-2.5 rounded-xl border border-gray-200 bg-white font-medium text-gray-700 focus:ring-2 focus:ring-indigo-100 outline-none shadow-sm"
                        value={selectedAssignment}
                        onChange={(e) => setSelectedAssignment(e.target.value)}
                    >
                        {mockAssignments.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
                    </select>
                </div>
            </header>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center gap-4 bg-gray-50/30">
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-700">Student Submissions</h3>
                    </div>
                    <div className="flex text-sm text-gray-500 gap-4">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Graded: {submissions.filter(s => s.status === 'Graded').length}</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Pending: {submissions.filter(s => s.status === 'Pending').length}</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Student</th>
                                <th className="px-6 py-4">Submitted At</th>
                                <th className="px-6 py-4">File</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Score</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {submissions.map((submission) => (
                                <tr key={submission.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">{submission.studentName}</p>
                                            <p className="text-xs text-gray-500">{submission.matric}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-medium font-mono">{submission.submittedAt}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg w-fit text-xs font-bold border border-indigo-100 cursor-pointer hover:bg-indigo-100 transition-colors">
                                            <FileText size={14} /> {submission.file}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${submission.status === 'Graded' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                                            {submission.status === 'Graded' ? <CheckCircle size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>}
                                            {submission.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-800">
                                        {submission.score !== null ? `${submission.score} / ${getAssignmentDetails(selectedAssignment).totalPoints}` : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Submission">
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleOpenGrading(submission)}
                                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                            title="Grade"
                                        >
                                            <Award size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Grading Modal */}
            {gradingModalOpen && currentSubmission && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl scale-100 animate-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Grade Submission</h3>
                                <p className="text-sm text-gray-500 mt-0.5">{currentSubmission.studentName} • {currentSubmission.matric}</p>
                            </div>
                            <button onClick={handleCloseGrading} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveGrade} className="p-6 space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="block text-sm font-bold text-gray-700">Score</label>
                                    <span className="text-xs font-bold text-gray-400">Total: {getAssignmentDetails(selectedAssignment).totalPoints} pts</span>
                                </div>
                                <input
                                    type="number"
                                    required
                                    max={getAssignmentDetails(selectedAssignment).totalPoints}
                                    min="0"
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-lg font-bold"
                                    placeholder="0"
                                    value={gradeData.score}
                                    onChange={(e) => setGradeData({ ...gradeData, score: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Feedback</label>
                                <textarea
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all h-32 resize-none"
                                    placeholder="Enter feedback for the student..."
                                    value={gradeData.feedback}
                                    onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleCloseGrading}
                                    className="px-5 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 border border-transparent transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
                                >
                                    <Award size={18} /> Save Grade
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherSubmissions;
