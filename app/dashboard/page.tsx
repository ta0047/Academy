"use client";

import React, { useState } from "react";
import {
  Users,
  BookOpen,
  GraduationCap,
  DollarSign,
  Search,
  Bell,
  Plus,
  PlayCircle,
} from "lucide-react";

export default function AcademyDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const courses = [
    { name: "Active Courses", value: "12" },
    { name: "Completed Courses", value: "42"},
    { name: "Total Courses", value: "14" }
  ];

  const recentEnrollments = [
    { id: 1, name: "Sarah Jenkins", email: "sarah@example.com", course: "Full-Stack Web Dev", status: "Completed", amount: "$299" },
    { id: 2, name: "Marcus Chen", email: "marcus@example.com", course: "UI/UX Design Masterclass", status: "Pending", amount: "$199" },
    { id: 3, name: "Emily Watson", email: "emily@example.com", course: "Data Science & AI", status: "Completed", amount: "$349" },
    { id: 4, name: "David Kim", email: "david@example.com", course: "Cloud Architecture", status: "Completed", amount: "$249" },
  ];

  const upcomingClasses = [
    { id: 1, title: "Advanced React & Next.js Patterns", instructor: "Dr. Alex Rivera", time: "10:00 AM", isLive: true },
    { id: 2, title: "Figma System Design", instructor: "Sophia Martinez", time: "02:00 PM", isLive: false },
    { id: 3, title: "Python for Data Analysis", instructor: "Prof. Michael Zhang", time: "04:30 PM", isLive: false },
  ];

  const filteredEnrollments = recentEnrollments.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Top Navbar Header */}
        <div className="navbar bg-base-100 rounded-box shadow-sm px-4">
          <div className="flex-1">
            <a className="text-xl font-bold">Apex Academy</a>
          </div>
          <div className="flex-none gap-3">
            <div className="form-control">
              <div className="input-group relative flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input input-bordered input-sm w-48 md:w-64"
                />
                <Search className="absolute right-3 h-4 w-4 opacity-50 text-3xl" />
              </div>
            </div>
           
            
          </div>
        </div>

        {/* Key Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((courses) => {
           
            return (
              <div key={courses.name} className="card bg-base-100 shadow-sm">
                <div className="card-body p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-70">{courses.name}</span>
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    
                    <BookOpen className="h-4 w-4" />
                  
                    </div>
                  </div>
                  <h2 className="card-title text-2xl mt-2">{courses.value}</h2>
                  
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Enrollments Table */}
          <div className="card bg-base-100 shadow-sm lg:col-span-2">
            <div className="card-body p-5">
              <h2 className="card-title text-base font-bold mb-4">Recent Enrollments</h2>
              <div className="overflow-x-auto">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Course</th>
                      <th>Status</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnrollments.length > 0 ? (
                      filteredEnrollments.map((item) => (
                        <tr key={item.id} className="hover">
                          <td>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-xs opacity-50">{item.email}</div>
                          </td>
                          <td>{item.course}</td>
                          <td>
                            <span className={`badge badge-xs ${item.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="text-right font-medium">{item.amount}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-4 opacity-50 text-xs">
                          No results found for ...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Schedule Sidebar */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-5">
              <h2 className="card-title text-base font-bold mb-4">Todays Schedule</h2>
              <div className="space-y-3">
                {upcomingClasses.map((lecture) => (
                  <div key={lecture.id} className="p-3 bg-base-200/50 rounded-box border border-base-300">
                    <div className="flex items-center justify-between text-xs opacity-60">
                      <span>{lecture.time}</span>
                      {lecture.isLive && (
                        <span className="badge badge-error badge-xs animate-pulse">LIVE</span>
                      )}
                    </div>
                    <p className="font-semibold text-sm mt-1">{lecture.title}</p>
                    <p className="text-xs opacity-70">{lecture.instructor}</p>
                    <button className={`btn btn-xs mt-3 w-full ${lecture.isLive ? 'btn-primary' : 'btn-outline'}`}>
                      <PlayCircle className="h-3.5 w-3.5 mr-1" />
                      {lecture.isLive ? "Join Class" : "Details"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}