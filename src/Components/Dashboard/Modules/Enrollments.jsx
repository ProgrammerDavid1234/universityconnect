import React, { useState } from 'react';
import { PlusCircle, MinusCircle, BookCheck } from 'lucide-react';

const initialAvailableCourses = [
    { id: 101, code: 'MTH 201', title: 'Mathematical Engineering', units: 3 },
    { id: 102, code: 'PHY 202', title: 'Engineering Physics', units: 2 },
    { id: 103, code: 'CSC 204', title: 'Logic Circuits', units: 3 },
];

const initialEnrolledCourses = [
    { id: 1, code: 'CSC 301', title: 'Data Structures & Algorithms', units: 3 },
];

const Enrollments = () => {
    const [available, setAvailable] = useState(initialAvailableCourses);
    const [enrolled, setEnrolled] = useState(initialEnrolledCourses);

    const handleEnroll = (course) => {
        setEnrolled([...enrolled, course]);
        setAvailable(available.filter((c) => c.id !== course.id));
    };

    const handleUnenroll = (course) => {
        setAvailable([...available, course]);
        setEnrolled(enrolled.filter((c) => c.id !== course.id));
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Course Enrollments</h2>
                <p className="text-gray-500 text-sm mt-1">Manage your semester course load</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Enrolled Section */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                            <BookCheck size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Enrolled Courses</h3>
                            <p className="text-xs text-gray-500 font-medium">{enrolled.length} Active</p>
                        </div>
                    </div>

                    {enrolled.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-2">
                                <BookCheck size={24} />
                            </div>
                            <p className="text-gray-500 font-medium">No courses enrolled yet.</p>
                            <p className="text-xs text-gray-400 mt-1">Select from available courses to get started.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {enrolled.map((course) => (
                                <div key={course.id} className="group bg-green-50/50 rounded-2xl p-4 border border-green-100 flex justify-between items-center transition-all hover:bg-green-50 hover:shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white text-green-700 font-bold text-xs flex items-center justify-center shadow-sm border border-green-100">
                                            {course.code.split(' ')[0]}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-800 text-sm">{course.code}</div>
                                            <div className="text-xs text-gray-500 font-medium">{course.title}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-bold text-green-700 bg-white px-2 py-1 rounded border border-green-100">{course.units} Units</span>
                                        <button
                                            onClick={() => handleUnenroll(course)}
                                            className="w-8 h-8 rounded-full bg-white text-red-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors shadow-sm"
                                            title="Unenroll"
                                        >
                                            <MinusCircle size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Available Section */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <PlusCircle size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Available Courses</h3>
                            <p className="text-xs text-gray-500 font-medium">{available.length} Options</p>
                        </div>
                    </div>

                    {available.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                            <p className="text-gray-400 italic">No more courses available.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {available.map((course) => (
                                <div key={course.id} className="group bg-white rounded-2xl p-4 border border-gray-100 flex justify-between items-center transition-all hover:border-blue-200 hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 font-bold text-xs flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                            {course.code.split(' ')[0]}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-800 text-sm group-hover:text-blue-700 transition-colors">{course.code}</div>
                                            <div className="text-xs text-gray-500 font-medium">{course.title}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded">{course.units} Units</span>
                                        <button
                                            onClick={() => handleEnroll(course)}
                                            className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all shadow-md shadow-blue-200"
                                            title="Enroll"
                                        >
                                            <PlusCircle size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Enrollments;
