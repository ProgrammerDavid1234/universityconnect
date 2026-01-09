import React, { useState } from 'react';
import { BookOpen, Plus, Edit2, Trash2, Calendar, Users, X, Save } from 'lucide-react';

const initialCourses = [
    { id: 1, code: 'CSC 301', title: 'Data Structures', students: 45, semester: '1st', description: 'Advanced data structures and algorithms.' },
    { id: 2, code: 'CSC 305', title: 'Operating Systems', students: 50, semester: '1st', description: 'Concepts of operating systems design.' },
];

const TeacherCourses = () => {
    const [courses, setCourses] = useState(initialCourses);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null); // If null, we are creating. Else editing.

    const [formData, setFormData] = useState({ code: '', title: '', students: 0, semester: '', description: '' });

    const handleOpenModal = (course = null) => {
        if (course) {
            setCurrentCourse(course);
            setFormData(course);
        } else {
            setCurrentCourse(null);
            setFormData({ code: '', title: '', students: 0, semester: '', description: '' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentCourse(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            setCourses(courses.filter(c => c.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentCourse) {
            // Update
            setCourses(courses.map(c => c.id === currentCourse.id ? { ...formData, id: currentCourse.id } : c));
        } else {
            // Create
            setCourses([...courses, { ...formData, id: Date.now() }]);
        }
        handleCloseModal();
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage your courses and curriculum</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 active:scale-95"
                >
                    <Plus size={18} /> Create Course
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div key={course.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-indigo-100 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl">
                                {course.code.substring(0, 3)}
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleOpenModal(course)}
                                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(course.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-800 mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-500 font-medium mb-4">{course.code} • {course.semester} Semester</p>

                        <p className="text-sm text-gray-600 mb-6 line-clamp-2">{course.description}</p>

                        <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
                            <div className="flex items-center gap-1.5">
                                <Users size={16} />
                                <span>{course.students} Students</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <BookOpen size={16} />
                                <span>Draft active</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl scale-100 animate-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-800">{currentCourse ? 'Edit Course' : 'Create New Course'}</h3>
                            <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Course Code</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                        placeholder="e.g. CSC 301"
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Semester</label>
                                    <select
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                        value={formData.semester}
                                        onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                                    >
                                        <option value="">Select...</option>
                                        <option value="1st">1st Semester</option>
                                        <option value="2nd">2nd Semester</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Course Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                    placeholder="e.g. Data Structures and Algorithms"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                                <textarea
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all h-32 resize-none"
                                    placeholder="Course description..."
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
                                    <Save size={18} /> {currentCourse ? 'Save Changes' : 'Create Course'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherCourses;
