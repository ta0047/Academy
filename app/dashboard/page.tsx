"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
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
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [studentName, setStudentName] = useState("");


useEffect(() => {
  async function checkAuth() {
    try {
      const response = await axios.get("/api/auth/me");

      setStudentName(response.data.user.name);
    } catch (error) {
      console.error("Authentication check failed:", error);
      router.replace("/auth/login");
    } finally {
      setIsLoading(false);
    }
  }

  checkAuth();
}, [router]);


  const courses = [
    { name: "Active Courses", value: "12", Fee: "$1200" },
    { name: "Completed Courses", value: "42", Fee: "$4200" },
    { name: "Total Courses", value: "14", Fee: "$1400" },
    { name: "Fee Paid", value: "$680", Fee: "$6800" },
  ];

  const recentEnrollments = [
    {
      id: 1,
      name: "Sarah Jenkins",
      email: "sarah@example.com",
      course: "Full-Stack Web Dev",
      status: "Completed",
      amount: "$299",
    },
    {
      id: 2,
      name: "Marcus Chen",
      email: "marcus@example.com",
      course: "UI/UX Design Masterclass",
      status: "Pending",
      amount: "$199",
    },
    {
      id: 3,
      name: "Emily Watson",
      email: "emily@example.com",
      course: "Data Science & AI",
      status: "Completed",
      amount: "$349",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david@example.com",
      course: "Cloud Architecture",
      status: "Completed",
      amount: "$249",
    },
  ];

  const upcomingClasses = [
    {
      id: 1,
      title: "Advanced React & Next.js Patterns",
      instructor: "Dr. Alex Rivera",
      time: "10:00 AM",
      isLive: true,
    },
    {
      id: 2,
      title: "Figma System Design",
      instructor: "Sophia Martinez",
      time: "02:00 PM",
      isLive: false,
    },
    {
      id: 3,
      title: "Python for Data Analysis",
      instructor: "Prof. Michael Zhang",
      time: "04:30 PM",
      isLive: false,
    },
  ];

  const filteredEnrollments = recentEnrollments.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-xl "></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Top Navbar Header */}
        <div className="navbar bg-base-100 rounded-box shadow-sm px-4">
          <div className="flex-1">
            <div className="flex-1">
              <div className="text-lg font-bold ">
                Welcome <span className="text-teal-500 uppercase">{studentName}</span>
              </div>
            </div>
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                  <h2 className="card-title text-4xl mt-2">{courses.value}</h2>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Enrollments Table */}
          <div className="card bg-base-100 shadow-sm lg:col-span-2">
            <div className="card-body p-5">
              <h2 className="card-title text-base font-bold mb-4">
                Recent Enrollments
              </h2>
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
                            <div className="text-xs opacity-50">
                              {item.email}
                            </div>
                          </td>
                          <td>{item.course}</td>
                          <td>
                            <span
                              className={`badge badge-xs ${item.status === "Completed" ? "badge-success" : "badge-warning"}`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="text-right font-medium">
                            {item.amount}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center py-4 opacity-50 text-xs"
                        >
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
              <h2 className="card-title text-base font-bold mb-4">
                Todays Schedule
              </h2>
              <div className="space-y-3">
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button
                  className="btn"
                  onClick={() => {
                    const modal = document.getElementById(
                      "my_modal_3",
                    ) as HTMLDialogElement | null;
                    if (modal) modal.showModal();
                  }}
                >
                  +
                </button>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                      <div className="card w-full max-w-md bg-base-100 mx-auto my-8 border border-base-200">
                        <div className="">
                          <h2 className="card-title text-2xl font-bold">
                            Schedule a Class
                          </h2>

                          {/* Course */}
                          <div className=" w-full">
                            <label className="label">
                              <span className="label-text font-semibold">
                                Course
                              </span>
                            </label>
                            <select
                              name="course"
                              className="select select-bordered w-full"
                              required
                            >
                              <option value="" disabled>
                                Select a course
                              </option>
                              <option value="react">React Development</option>
                              <option value="python">Python Programming</option>
                              <option value="ui-ux">UI/UX Design</option>
                            </select>
                          </div>

                          {/* Date */}
                          <div className="form-control w-full">
                            <label className="label">
                              <span className="label-text font-semibold">
                                Date
                              </span>
                            </label>
                            <input
                              type="date"
                              name="date"
                              className="input input-bordered w-full"
                              required
                            />
                          </div>
                          {/* Time */}
                          <div className="form-control w-full">
                            <label className="label">
                              <span className="label-text font-semibold">
                                Time
                              </span>
                            </label>
                            <input
                              type="time"
                              name="time"
                              className="input input-bordered w-full"
                              required
                            />
                          </div>
                          {/* Actions */}
                          <div className="card-actions justify-end pt-4">
                            <button
                              type="submit"
                              className="btn btn-primary w-full"
                            >
                              Schedule Class
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
