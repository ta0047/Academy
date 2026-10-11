
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Academy | Build Your Future With New Skills",
  description:
    "Learn Web Development, Graphic Design, Python, Data Analysis, and AI with Academy.",
};




export default function Home() {
  return (

<section className="relative overflow-hidden bg-base-100">
  <div className="mx-auto grid min-h-[60vh] max-w-7xl px-6 md:grid-cols-2 md:px-10 lg:gap-2 lg:py-12">

    {/* Left Column */}
    <div className="text-center md:text-left">
      

      <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-base-content sm:text-5xl lg:text-6xl">
        Build Your Future With{" "}
        <span className="block text-primary">
          Practical Skills.
        </span>
      </h1>

      <p className="mx-auto mt-1 max-w-xl text-base leading-8 text-base-content/70 md:mx-0 md:text-lg">
        Discover your potential with professional courses in Web Development,
        Graphic Design, Python, Data Analysis, Artificial Intelligence, and more.
        Learn by doing and take the next step toward your goals.
      </p>

      <div className="mt-1 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
        <Link
          href="/courses"
          className="group inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-7 py-4 font-semibold text-primary-content shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          Explore Courses
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>

        <Link
          href="/auth/login"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-base-content/20 bg-base-100 px-7 py-4 font-semibold text-base-content transition duration-300 hover:border-primary hover:text-primary"
        >
          Student Portal <span>↗</span>
        </Link>
      </div>

     
    </div>

    {/* Right Column */}
    <div className="relative mx-auto w-full max-w-lg">
      {/* Main Visual Panel */}
      <div className="relative overflow-hidden rounded-3xl border border-base-content/10 bg-base-200 p-5 shadow-xl sm:p-8">

        {/* Decorative shapes */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-secondary/5" />

        {/* Dashboard Header */}
        <div className="relative flex items-center justify-around p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-xl ">
              <Image
                src="/logo.png"
                alt="Academy logo"
                width={80}
                height={80}
                className="h-80 w-80 object-contain"
              />
            </div>

           
          </div>

          
        </div>

        {/* Main Card Content */}
        <div className="relative py-3">
             <h2 className="text-3xl font-extrabold leading-tight text-base-content sm:text-4xl">
            Learn Something
            <span className="block text-primary">Extraordinary.</span>
          </h2>

          <p className="mt-3 max-w-sm leading-7 text-base-content/70">
            Turn new knowledge into real skills through technology,
            creativity, and hands-on learning.
          </p>
        </div>

        {/* Learning Categories */}
        <div className="relative grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-base-content/10 bg-base-100 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
              {"</>"}
            </div>
            <h3 className="mt-4 font-bold text-base-content">
              Web Development
            </h3>
            <p className="mt-1 text-sm text-base-content/60">
              Create modern websites
            </p>
          </div>

          <div className="rounded-2xl border border-base-content/10 bg-base-100 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-2xl">
              ✦
            </div>
            <h3 className="mt-4 font-bold text-base-content">
              AI & Data
            </h3>
            <p className="mt-1 text-sm text-base-content/60">
              Explore new possibilities
            </p>
          </div>
        </div>

        {/* Bottom Information */}
       
      </div>
    </div>

  </div>
</section>


  );
}
