"use client";

import { useEffect } from "react";
import Link from "next/link";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">

        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m0 3.75h.008M10.29 3.86l-8.82 15a2 2 0 001.72 3h17.62a2 2 0 001.72-3l-8.82-15a2 2 0 00-3.44 0z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-slate-800">
          Something went wrong
        </h1>

        <p className="mt-4 text-slate-500">
          We&apos;re sorry, but something unexpected happened.
          Please try again.
        </p>

        {/* Button */}
        <button
          onClick={() => reset()}
          className="mt-8 rounded-lg bg-slate-700 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
        >
          Try Again
        </button>

        {/* Home */}
        <Link
          href="/"
          className="ml-3 inline-block rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}