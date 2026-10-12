"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

type Course = {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
};

export default function CoursesList({ search }: { search: string }) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get("/api/course");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses();
  }, []);

  const searchTerm = search.trim().toLowerCase();
  const filteredCourses = courses.filter((course) =>
    course.title.trim().toLowerCase().includes(searchTerm),
  );

  return (
    <div className="text-2xl min-h-screen m-2">
      <div className="relative w-80 m-auto">
        <form className="mb-4" method="GET" action="/courses">
          <input
            type="text"
            name="search"
            placeholder="Search courses..."
            defaultValue={search}
            className="input input-bordered input-sm w-56 rounded-s-full"
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm rounded-e-full"
          >
            Search
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredCourses.map((course) => (
          <div
            className="card bg-base-100 shadow-[0_0_15px_rgba(0,0,0,0.3)] transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            key={course._id}
          >
            <figure>
              <Image
                src={course.image}
                alt={course.title}
                width={300}
                height={300}
                style={{ width: "100%", height: "100%" }}
                preload
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{course.title}</h2>
              <p className="text line-clamp-1">{course.description}</p>
              <div className="card-actions">
                <p className="text-lg rounded-md">Rs. {course.price}</p>

                <Link
                  href={`/courses/${course._id}`}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
