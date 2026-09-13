"use client";

import Link from "next/link";
import {
  Code2,
  Headphones,
  BrainCircuit,
  Server,
  Palette,
  Database,
  ShieldCheck,
  Rocket,
  Users,
  Target,
  Award,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const courses = [
  {
    title: "Software Development",
    description:
      "Learn modern web and software development technologies and build real-world applications.",
    icon: Code2,
  },
  {
    title: "IT Support",
    description:
      "Develop practical skills in computer hardware, operating systems, troubleshooting and technical support.",
    icon: Headphones,
  },
  {
    title: "Artificial Intelligence",
    description:
      "Explore AI concepts, tools, automation and modern technologies shaping the future.",
    icon: BrainCircuit,
  },
  {
    title: "Systems & Networking",
    description:
      "Learn system administration, networking fundamentals, servers, security and infrastructure.",
    icon: Server,
  },
  {
    title: "Graphic Design",
    description:
      "Build creative skills in graphic design, visual communication, branding and digital content.",
    icon: Palette,
  },
  {
    title: "Python Programming",
    description:
      "Learn Python from fundamentals to practical programming, automation and application development.",
    icon: Database,
  },
];

const benefits = [
  "Practical, hands-on learning",
  "Industry-relevant technologies",
  "Beginner-friendly training",
  "Real-world projects",
  "Experienced instructors",
  "Career-focused skills",
];

export default function About() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">

      <section className="relative overflow-hidden bg-base-200">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary blur-3xl" />
          <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-secondary blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Rocket size={17} />
              Building Skills for the Digital Future
            </div>

            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Learn Today.
              <span className="block text-primary">
                Build Tomorrow.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 opacity-75">
              We provide practical and career-focused training in software
              development, IT support, artificial intelligence, systems,
              networking, graphic design, Python and other modern technology
              fields.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="btn btn-primary gap-2"
              >
                Explore Our Courses
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="btn btn-outline"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          <div>
            <div className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">
              Who We Are
            </div>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Your Journey Into Technology Starts Here
            </h2>

            <p className="mt-6 leading-8 opacity-75">
              We are a technology-focused learning platform dedicated to
              helping students, professionals and aspiring IT specialists
              develop practical skills for the modern digital world.
            </p>

            <p className="mt-4 leading-8 opacity-75">
              Our courses are designed to take learners from fundamental
              concepts to practical implementation. Instead of focusing only
              on theory, we encourage students to learn by building,
              experimenting and solving real-world problems.
            </p>

            <p className="mt-4 leading-8 opacity-75">
              Whether you want to become a software developer, IT support
              specialist, AI enthusiast, system administrator, Python
              programmer or graphic designer, our goal is to help you develop
              skills that you can actually use.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-primary p-7 text-primary-content shadow-xl">
              <Users size={32} />
              <h3 className="mt-5 text-xl font-bold">
                Student Focused
              </h3>
              <p className="mt-2 text-sm opacity-80">
                Learning designed around practical student needs.
              </p>
            </div>

            <div className="rounded-2xl bg-base-200 p-7 shadow-lg">
              <Target size={32} className="text-primary" />
              <h3 className="mt-5 text-xl font-bold">
                Career Focused
              </h3>
              <p className="mt-2 text-sm opacity-70">
                Skills aligned with todays technology careers.
              </p>
            </div>

            <div className="rounded-2xl bg-base-200 p-7 shadow-lg">
              <Award size={32} className="text-primary" />
              <h3 className="mt-5 text-xl font-bold">
                Quality Training
              </h3>
              <p className="mt-2 text-sm opacity-70">
                Structured learning with practical exercises.
              </p>
            </div>

            <div className="rounded-2xl bg-primary p-7 text-primary-content shadow-xl">
              <Rocket size={32} />
              <h3 className="mt-5 text-xl font-bold">
                Future Ready
              </h3>
              <p className="mt-2 text-sm opacity-80">
                Learn technologies shaping the future.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-200 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <div className="text-sm font-bold uppercase tracking-widest text-primary">
              What We Teach
            </div>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Explore Our Technology Fields
            </h2>

            <p className="mt-4 opacity-70">
              Learn the technical and creative skills needed to succeed in
              todays rapidly changing digital world.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {

              const Icon = course.icon;

              return (
                <div
                  key={course.title}
                  className="group rounded-2xl bg-base-100 p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-slate-500 transition duration-300 group-hover:bg-primary/20 group-hover:text-based-content">
                    <Icon size={28} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {course.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 opacity-70">
                    {course.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-2">

          <div>
            <div className="text-sm font-bold uppercase tracking-widest text-primary">
              Why Choose Us
            </div>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              More Than Just Online Lessons
            </h2>

            <p className="mt-5 leading-8 opacity-70">
              Technology is best learned through practice. Our approach
              combines concepts, demonstrations, exercises and projects so
              students can understand not only what a technology does, but
              how and when to use it.
            </p>

            <Link
              href="/courses"
              className="btn btn-primary mt-7 gap-2"
            >
              View All Courses
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 rounded-xl border border-base-300 bg-base-100 p-4 shadow-sm"
              >
                <CheckCircle2
                  className="shrink-0 text-success"
                  size={22}
                />

                <span className="font-medium">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="bg-base-200 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <div className="text-sm font-bold uppercase tracking-widest text-primary">
              Our Approach
            </div>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Learn. Practice. Build. Grow.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-4">

            {[
              {
                number: "01",
                title: "Learn",
                text: "Understand the fundamentals and concepts.",
              },
              {
                number: "02",
                title: "Practice",
                text: "Apply your knowledge through practical exercises.",
              },
              {
                number: "03",
                title: "Build",
                text: "Create projects that demonstrate your skills.",
              },
              {
                number: "04",
                title: "Grow",
                text: "Continue developing your career and expertise.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-2xl bg-base-100 p-7 shadow-sm"
              >
                <div className="text-4xl font-black text-primary/20">
                  {step.number}
                </div>

                <h3 className="mt-4 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 opacity-70">
                  {step.text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-3xl bg-primary p-8 text-primary-content md:p-10">
            <Target size={38} />

            <h2 className="mt-6 text-3xl font-bold">
              Our Mission
            </h2>

            <p className="mt-5 leading-8 opacity-90">
              To make technology education practical, accessible and
              career-oriented by helping learners develop skills they can use
              in real-world situations.
            </p>
          </div>

          <div className="rounded-3xl bg-base-200 p-8 md:p-10">
            <ShieldCheck size={38} className="text-primary" />

            <h2 className="mt-6 text-3xl font-bold">
              Our Vision
            </h2>

            <p className="mt-5 leading-8 opacity-70">
              To create a community of confident and capable technology
              professionals who are prepared to adapt, innovate and grow in
              the digital economy.
            </p>
          </div>

        </div>
      </section>

      <section className="bg-primary text-primary-content">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">

          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Start Your Technology Journey?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 opacity-90">
            Choose a course, develop practical skills and take the next step
            toward your technology career.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/courses"
              className="btn border-none bg-white text-primary hover:bg-base-200"
            >
              Explore Courses
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/contact"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-primary"
            >
              Get in Touch
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
