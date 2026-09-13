import Link from "next/link";
import { courses } from "../../data/courses";
import Image from "next/image";
import { notFound } from "next/navigation";
export default async function CourseDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = courses.find((course) => course.id === Number(id));
  if (!course) {
    notFound();
  }
  return (
    <>
     
<div className="min-h-screen bg-base-200">

  <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">

    <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-base-100 p-5 shadow-xl sm:p-8 lg:grid-cols-2 lg:p-10">

      <div className="relative overflow-hidden rounded-2xl bg-base-200">

        <Image
          src={course.image}
          width={700}
          height={500}
          alt={course.title}
          className="h-auto w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
          {course.title}
        </h1>
        <p className="mt-5 text-base leading-7 opacity-70 sm:text-lg">
          {course.description}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
        </div>
        <div className="mt-8 rounded-2xl border border-base-300 bg-base-200 p-5">

          <p className="text-sm font-medium opacity-60">
            Course Fee
          </p>

          <div className="mt-1 flex items-center justify-between gap-4">

            <p className="text-3xl font-extrabold text-base-content">
              Rs. {course.price}
            </p>
          </div>
          <Link
            href={`/courses/${course.id}/enrollment?course=${encodeURIComponent(
              course.title,
            )}`}
            className="btn btn-primary mt-5 w-full text-base sm:btn-lg"
          >
            Enroll Now
          </Link>
         
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
