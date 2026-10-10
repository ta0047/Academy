export const metadata = {
  title: "Home",
  description: "this is the home page",
};
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero min-h-[80vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            
            <div className="mb-10">
              <Image src="/logo.png" alt="Logo" width={150} height={150} className="mr-2 inline-block" />
            </div>

            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Build Your Future With
              <span className="text-base-content/30"> New Skills</span>
            </h1>

            <p className="py-6 text-lg text-base-content/70">
              Learn practical skills through our professional courses in
              Web Development, Graphic Design, Python, Data Analysis,
              Artificial Intelligence, and more.
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="btn btn-primary btn-lg"
              >
                Explore Courses
              </Link>

              <Link
                href="/contact"
                className="btn btn-outline btn-lg"
              >
                Contact Us
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-base-100 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">

          <div className="card bg-base-200 shadow-md">
            <div className="card-body text-center">
              <div className="text-4xl">💻</div>
              <h2 className="card-title justify-center">
                Practical Learning
              </h2>
              <p className="text-base-content/70">
                Learn useful skills with practical and easy-to-follow
                training.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body text-center">
              <div className="text-4xl">🎯</div>
              <h2 className="card-title justify-center">
                Career Focused
              </h2>
              <p className="text-base-content/70">
                Develop skills that can help you move forward in your
                professional career.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body text-center">
              <div className="text-4xl">🚀</div>
              <h2 className="card-title justify-center">
                Start Today
              </h2>
              <p className="text-base-content/70">
                Choose a course and start your learning journey today.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
