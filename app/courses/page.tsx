import React from "react";
import Link from "next/link";
import { courses } from "../data/courses";
import Image from "next/image";

export const metadata = {
  title: "courses",
  description: "this is the courses page",
};

type CoursesPageProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function Page({
  searchParams,
}: CoursesPageProps) {
  const { search } = await searchParams;

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search?.toLowerCase() || "")
  );

  return (
    <div className="text-2xl min-h-screen m-2">
      <div className="relative w-80 m-auto">
 {/* Search Bar */}
      <form className="mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search services..."
          defaultValue={search || ""}
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
      {/* Courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredCourses.map((course) => (
          <div className="card bg-base-100 shadow-[0_0_15px_rgba(0,0,0,0.3)] transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            key={course.id}
          >
            <figure>
              <Image
                src={course.image}
                alt={course.title}
                width={300}
                height={300}
                style={{ width: "100%", height: "100%" }}
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                {course.title}
              </h2 >
              <p className="text line-clamp-1">
                {course.description}
              </p>
              <div className="card-actions">
                <p className="text-lg rounded-md">
                  Rs. {course.price}
                </p>

                <Link
                  href={`/courses/${course.id}`}
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