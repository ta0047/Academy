
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || data.error || "Login failed. Please try again.");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Login failed:", error);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-base-200">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-5 sm:px-6 lg:grid-cols-2 lg:px-8">
        <section className="hidden flex-col justify-between overflow-hidden rounded-3xl p-12 shadow-2xl lg:flex">
          <Link
            href="/"
            className="flex w-fit items-center gap-3 text-xl font-bold"
          >
            <span className="grid size-11 place-items-center rounded-2xl bg-white/15 text-2xl">
              ✦
            </span>
            Apex Academy
          </Link>

          <div className="max-w-lg">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] opacity-80">
              Learn without limits
            </p>
            <h1 className="text-5xl font-bold leading-tight">
              Your next big idea starts here.
            </h1>
            <p className="mt-6 text-lg leading-relaxed opacity-80">
              Pick up where you left off and keep building the skills that move
              you forward.
            </p>
          </div>

          <p className="text-sm opacity-80">
            Join learners growing every day
          </p>
        </section>

        <section className="mx-auto w-full max-w-md">
          <Link
            href="/"
            className="mb-8 flex items-center justify-center gap-3 text-xl font-bold lg:hidden"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-content">
              ✦
            </span>
            Academy
          </Link>

          <div className="card border border-base-300/60 bg-base-100 shadow-xl">
            <div className="card-body gap-6 p-6 sm:p-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-base-content/60">
                  Enter your email and password to continue.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <label className="form-control w-full">
                  <span className="label-text mb-2 font-medium">
                    Email address
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="input input-bordered w-full bg-base-100"
                  />
                </label>

                <label className="form-control w-full">
                  <span className="label mb-2 p-0">
                    <span className="label-text font-medium">Password</span>
                  </span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="input input-bordered w-full bg-base-100"
                  />
                </label>

                {error && (
                  <div role="alert" className="alert alert-error text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary mt-1 w-full text-base"
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-base-content/60">
                New to Academy?{" "}
                <Link
                  href="/auth/register"
                  className="link link-primary font-semibold"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-base-content/45">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="link">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="link">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
