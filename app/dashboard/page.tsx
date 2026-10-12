"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  BookOpen,
  Search,
} from "lucide-react";

type Enrollment = {
  _id: string;
  courseId?: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  createdAt: string;
};

type Course = {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
};

export default function AcademyDashboard() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [studentName, setStudentName] = useState("");
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [enrollmentError, setEnrollmentError] = useState("");
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [addCourseError, setAddCourseError] = useState("");

  async function refreshEnrollments() {
    const response = await axios.get<{
      user: { name: string };
      enrollments: Enrollment[];
    }>("/api/my-course");
    setStudentName(response.data.user.name);
    setEnrollments(response.data.enrollments);
  }

  async function openAddCourseDialog() {
    setAddCourseError("");
    const dialog = document.getElementById(
      "add_course_dialog",
    ) as HTMLDialogElement | null;
    dialog?.showModal();

    if (availableCourses.length > 0) return;

    setIsLoadingCourses(true);
    try {
      const response = await axios.get<Course[]>("/api/course");
      setAvailableCourses(response.data);
    } catch (error) {
      console.error("Failed to load available courses:", error);
      setAddCourseError("Unable to load available courses. Please try again.");
    } finally {
      setIsLoadingCourses(false);
    }
  }

  async function handleAddCourse(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedCourseId) return;

    setIsAddingCourse(true);
    setAddCourseError("");
    try {
      await axios.post("/api/my-course", { courseId: selectedCourseId });
      await refreshEnrollments();
      setSelectedCourseId("");
      (document.getElementById("add_course_dialog") as HTMLDialogElement | null)
        ?.close();
    } catch (error) {
      console.error("Failed to add course:", error);
      setAddCourseError(
        axios.isAxiosError(error)
          ? error.response?.data?.message ?? "Unable to add this course."
          : "Unable to add this course.",
      );
    } finally {
      setIsAddingCourse(false);
    }
  }

  useEffect(() => {
    async function loadDashboard() {
      try {
        await refreshEnrollments();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          router.replace("/auth/login");
        } else {
          console.error("Failed to load enrolled courses:", error);
          setEnrollmentError("Unable to load your enrolled courses.");
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboard();
  }, [router]);

  const courses = [
    { name: "Enrolled Courses", value: String(enrollments.length) },
  ];

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredEnrollments = enrollments.filter((item) =>
    item.course.toLowerCase().includes(normalizedSearchTerm),
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
                Welcome{" "}
                <span className="text-teal-500 uppercase">{studentName}</span>
              </div>
            </div>
          </div>
          <div className="flex-none gap-3">
            <div className="form-control">
              <div className="input-group relative flex items-center">
                <input
                  type="text"
                  placeholder="Search your courses..."
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
              <div className="card-title text-base font-bold mb-4 justify-between">
                <h2>Recent Courses </h2>

                {/* Course Modal */}
                <div className="space-y-3">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={openAddCourseDialog}
                  >
                    Add Course
                  </button>
                  <dialog id="add_course_dialog" className="modal">
                    <div className="modal-box">
                      <form onSubmit={handleAddCourse}>
                        <button
                          type="button"
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                          onClick={() => {
                            (
                              document.getElementById(
                                "add_course_dialog",
                              ) as HTMLDialogElement | null
                            )?.close();
                          }}
                        >
                          ✕
                        </button>
                        <div className="card w-full max-w-md bg-base-100 mx-auto my-8 border border-base-200">
                          <div>
                            <h2 className="card-title text-2xl font-bold">
                              Add a Course
                            </h2>
                            <p className="mt-2 text-sm opacity-70">
                              Choose a course to add to your dashboard.
                            </p>

                            <label className="form-control mt-5 w-full">
                              <span className="label-text mb-2 font-semibold">
                                Available courses
                              </span>
                              <select
                                value={selectedCourseId}
                                onChange={(event) =>
                                  setSelectedCourseId(event.target.value)
                                }
                                className="select select-bordered w-full"
                                required
                                disabled={isLoadingCourses}
                              >
                                <option value="" disabled>
                                  {isLoadingCourses
                                    ? "Loading courses..."
                                    : "Select a course"}
                                </option>
                                {availableCourses.map((course) => {
                                  const isEnrolled = enrollments.some(
                                    (enrollment) =>
                                      enrollment.courseId === course._id ||
                                      enrollment.course.trim().toLowerCase() ===
                                        course.title.trim().toLowerCase(),
                                  );

                                  return (
                                    <option
                                      key={course._id}
                                      value={course._id}
                                      disabled={isEnrolled}
                                    >
                                      {course.title}
                                      {isEnrolled ? " (Already added)" : ""}
                                    </option>
                                  );
                                })}
                              </select>
                            </label>
                            {addCourseError && (
                              <p className="mt-3 text-sm text-error" role="alert">
                                {addCourseError}
                              </p>
                            )}
                            <div className="card-actions justify-end pt-4">
                             
                              <button
                                type="submit"
                                className="btn btn-primary w-full"
                                disabled={
                                  isAddingCourse ||
                                  isLoadingCourses ||
                                  !selectedCourseId
                                }
                              >
                                {isAddingCourse ? "Adding..." : "Add Course"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </dialog>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Course</th>
                      <th>Phone</th>
                      <th className="text-right">Enrolled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollmentError ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center py-4 text-error text-xs"
                        >
                          {enrollmentError}
                        </td>
                      </tr>
                    ) : filteredEnrollments.length > 0 ? (
                      filteredEnrollments.map((item) => (
                        <tr key={item._id} className="hover">
                          <td>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-xs opacity-50">
                              {item.email}
                            </div>
                          </td>
                          <td>{item.course}</td>
                          <td>{item.phone}</td>
                          <td className="text-right font-medium">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center py-4 opacity-50 text-xs"
                        >
                          {enrollments.length === 0
                            ? "You have not enrolled in any courses yet."
                            : "No courses match your search."}
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
              {/* Schedule Class modal Button */}
              <div className="space-y-3">
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
                      <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        
                      >
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
