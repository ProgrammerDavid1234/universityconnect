import React, { useState } from 'react';
import { Users, GraduationCap, Plus, Search, Mail, Phone, Trash2, X, Save } from 'lucide-react';

const mockTeachers = [
    { id: 1, name: 'Dr. John Smith', email: 'john.smith@nacos.org.ng', phone: '08012345678', department: 'Computer Science', courses: 3 },
    { id: 2, name: 'Prof. Sarah Connor', email: 'sarah.c@nacos.org.ng', phone: '08087654321', department: 'Engineering', courses: 2 },
];

const mockStudents = [
    { id: 101, name: 'Alice Johnson', matric: 'NACOS/2021/0045', email: 'alice.j@nacos.org.ng', department: 'Computer Science', level: '300' },
    { id: 102, name: 'Bob Smith', matric: 'NACOS/2021/0052', email: 'bob.s@nacos.org.ng', department: 'Accounting', level: '200' },
];

const UserManagement = () => {
    const [activeTab, setActiveTab] = useState('teachers'); // 'teachers' or 'students'
    const [teachers, setTeachers] = useState(mockTeachers);
    const [students, setStudents] = useState(mockStudents);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form Stats
    const [formData, setFormData] = useState({});

    const handleOpenModal = () => {
        setFormData(activeTab === 'teachers' ? { name: '', email: '', phone: '', department: '' } : { name: '', matric: '', email: '', department: '', level: '' });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete this ${activeTab === 'teachers' ? 'teacher' : 'student'}?`)) {
            if (activeTab === 'teachers') {
                setTeachers(teachers.filter(t => t.id !== id));
            } else {
                setStudents(students.filter(s => s.id !== id));
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeTab === 'teachers') {
            setTeachers([...teachers, { ...formData, id: Date.now(), courses: 0 }]);
        } else {
            setStudents([...students, { ...formData, id: Date.now() }]);
        }
        handleCloseModal();
    };

    const filteredData = activeTab === 'teachers'
        ? teachers.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.email.toLowerCase().includes(searchTerm.toLowerCase()))
        : students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.matric.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage system users, teachers, and students</p>
                </div>

                <button
                    onClick={handleOpenModal}
                    className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-95"
                >
                    <Plus size={18} /> Create {activeTab === 'teachers' ? 'Teacher' : 'Student'}
                </button>
            </header>

            <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
                <button
                    onClick={() => setActiveTab('teachers')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'teachers' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Users size={18} /> Teachers
                </button>
                <button
                    onClick={() => setActiveTab('students')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'students' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <GraduationCap size={18} /> Students
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                    <h3 className="font-bold text-gray-700">
                        All {activeTab === 'teachers' ? 'Teachers' : 'Students'}
                        <span className="ml-2 bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">{filteredData.length}</span>
                    </h3>

                    <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-red-100 w-64">
                        <Search size={16} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder={`Search ${activeTab}...`}
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
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">{activeTab === 'teachers' ? 'Contact' : 'Matric No'}</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4">{activeTab === 'teachers' ? 'Courses' : 'Level'}</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredData.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${activeTab === 'teachers' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {activeTab === 'teachers' ? user.phone : <span className="font-mono font-medium">{user.matric}</span>}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{user.department}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {activeTab === 'teachers'
                                            ? <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-bold">{user.courses} Courses</span>
                                            : user.level
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(user.id)}
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

            {/* Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl scale-100 animate-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-800">Create New {activeTab === 'teachers' ? 'Teacher' : 'Student'}</h3>
                            <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Department</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    />
                                </div>
                                {activeTab === 'teachers' ? (
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Level</label>
                                        <select
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                            value={formData.level}
                                            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                        >
                                            <option value="">Select...</option>
                                            <option value="100">100</option>
                                            <option value="200">200</option>
                                            <option value="300">300</option>
                                            <option value="400">400</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            {activeTab === 'students' && (
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Matric Number</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                                        value={formData.matric}
                                        onChange={(e) => setFormData({ ...formData, matric: e.target.value })}
                                    />
                                </div>
                            )}

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
                                    className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 flex items-center gap-2"
                                >
                                    <Save size={18} /> Create User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
