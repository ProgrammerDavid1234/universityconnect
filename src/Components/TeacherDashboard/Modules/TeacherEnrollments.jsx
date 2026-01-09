import React, { useState } from 'react';
import { Search, Filter, Mail, MoreHorizontal, Download } from 'lucide-react';

const mockCourses = ['CSC 301', 'CSC 305', 'GNS 301'];

const mockStudents = [
    { id: 101, name: 'Alice Johnson', matric: 'KDU/2021/0045', email: 'alice.j@kdu.edu.ng', department: 'Computer Science', level: '300' },
    { id: 102, name: 'Bob Smith', matric: 'KDU/2021/0052', email: 'bob.s@kdu.edu.ng', department: 'Computer Science', level: '300' },
    { id: 103, name: 'Charlie Brown', matric: 'KDU/2021/0061', email: 'charlie.b@kdu.edu.ng', department: 'Software Engineering', level: '300' },
    { id: 104, name: 'Diana Prince', matric: 'KDU/2021/0022', email: 'diana.p@kdu.edu.ng', department: 'Computer Science', level: '300' },
    { id: 105, name: 'Evan Wright', matric: 'KDU/2021/0088', email: 'evan.w@kdu.edu.ng', department: 'Information Technology', level: '300' },
];

const TeacherEnrollments = () => {
    const [selectedCourse, setSelectedCourse] = useState(mockCourses[0]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStudents = mockStudents.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.matric.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Enrollments</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage students enrolled in your courses</p>
                </div>

                <div className="flex items-center gap-3">
                    <select
                        className="px-4 py-2 rounded-xl border border-gray-200 bg-white font-medium text-gray-700 focus:ring-2 focus:ring-indigo-100 outline-none"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        {mockCourses.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>

                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                        <Download size={18} /> Export CSV
                    </button>
                </div>
            </header>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                    <h3 className="font-bold text-gray-700 flex items-center gap-2">
                        <span className="w-2 h-6 rounded-full bg-indigo-500"></span>
                        {selectedCourse} Students
                        <span className="bg-indigo-50 text-indigo-600 text-xs px-2 py-0.5 rounded-full border border-indigo-100">{filteredStudents.length} Enrolled</span>
                    </h3>

                    <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-indigo-100 w-64">
                        <Search size={16} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search student..."
                            className="ml-2 bg-transparent border-none outline-none text-sm w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Student Name</th>
                                <th className="px-6 py-4">Matric No</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4">Level</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                                {student.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">{student.name}</p>
                                                <p className="text-xs text-gray-500">{student.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{student.matric}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{student.department}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{student.level}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors">
                                            <Mail size={18} />
                                        </button>
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

export default TeacherEnrollments;
