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
              <Image
                src="/logo.png"
                alt="Logo"
                width={150}
                height={150}
                className="mr-2 inline-block"
              />
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              <span className="block text-base-content">
                Build Your Future With
              </span>

              <Link href="/courses" className="t-6 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                New Skills
              </Link>

              <span className="mt-5 block text-lg font-medium text-base-content/70 md:text-xl">
                Your journey to success starts here.
              </span>

              <Link
                href="/auth/login"
                className="t-6 inline-flex items-center gap-3 rounded-xl bg-gradient-to-l from-primary to-secondary px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Student Portal
                <span className="rounded-lg bg-white/20 px-3 py-1 text-sm">
                  Login →
                </span>
              </Link>
            </h1>

            <p className="py-6 text-lg text-base-content/70">
              Learn practical skills through our professional courses in Web
              Development, Graphic Design, Python, Data Analysis, Artificial
              Intelligence, and more.
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/courses" className="btn btn-primary btn-lg">
                Explore Courses
              </Link>

              <Link href="/contact" className="btn btn-outline btn-lg">
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
              <h2 className="card-title justify-center">Practical Learning</h2>
              <p className="text-base-content/70">
                Learn useful skills with practical and easy-to-follow training.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body text-center">
              <div className="text-4xl">🎯</div>
              <h2 className="card-title justify-center">Career Focused</h2>
              <p className="text-base-content/70">
                Develop skills that can help you move forward in your
                professional career.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body text-center">
              <div className="text-4xl">🚀</div>
              <h2 className="card-title justify-center">Start Today</h2>
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
