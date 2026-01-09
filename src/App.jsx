import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './Components/Authentication/Auth'
import DashboardLayout from './Components/Dashboard/DashboardLayout'
import { Courses, Assignments, Enrollments, Submissions, DashboardHome } from './Components/Dashboard/Modules'
import TeacherDashboardLayout from './Components/TeacherDashboard/TeacherDashboardLayout'
import { TeacherCourses, TeacherAssignments, TeacherEnrollments, TeacherSubmissions, TeacherDashboardHome } from './Components/TeacherDashboard/Modules'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="courses" element={<Courses />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="enrollments" element={<Enrollments />} />
          <Route path="submissions" element={<Submissions />} />
        </Route>

        {/* Teacher Dashboard Routes */}
        <Route path="/teacher-dashboard" element={<TeacherDashboardLayout />}>
          <Route index element={<TeacherDashboardHome />} />
          <Route path="courses" element={<TeacherCourses />} />
          <Route path="assignments" element={<TeacherAssignments />} />
          <Route path="enrollments" element={<TeacherEnrollments />} />
          <Route path="submissions" element={<TeacherSubmissions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App