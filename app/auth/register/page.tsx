
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import type { FormEvent } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || data.error || "Registration failed. Please try again.");
        toast.error(data.message || data.error || "Registration failed. Please try again.");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
      toast.success("Registration successful! Welcome to Apex Academy.");
    } catch (error) {
      console.error("Registration failed:", error);
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
          
          


<Link 
  href="/courses" 
  className="group relative inline-flex items-center gap-4 rounded-2xl bg-gradient-to-r from-primary via-primary/90 to-secondary px-7 py-3.5 text-base font-medium text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 active:translate-y-0"
>
  {/* Button Text & Label */}
  <span className="flex items-center gap-2.5">
    Explore our courses
    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
      New Skills
    </span>
  </span>

  {/* Animated Arrow Icon */}
  <svg 
    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth="2.5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
</Link>


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
                  Create An Account
                </h2>
               
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                <label className="form-control w-full">
                  <span className="label-text mb-2 font-medium">
                    Full Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="input input-bordered w-full bg-base-100"
                  />
                </label>
                <label className="form-control w-full">
                  <span className="label-text mb-2 font-medium">
                    Email address
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="abc@example.com"
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
                      Registering...
                    </>
                  ) : (
                    <>
                      Sign up <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-base-content/60">
                Already an Account?{" "}
                <Link
                  href="/auth/login"
                  className="link link-primary font-semibold"
                >
                  Login
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
