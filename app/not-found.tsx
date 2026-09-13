import Link from "next/link";
export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-slate-300">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-slate-500 mt-3">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 rounded-lg bg-slate-700 text-white hover:bg-slate-800"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}