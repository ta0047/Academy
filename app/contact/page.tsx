"use client";
import  Link from "next/link";
import { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong.");
        return;
      }
      toast.success("Your message saved successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Unable to send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-100 text-base-content">

      <section className="bg-base-200">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <MessageCircle size={17} />
              Were Here to Help
            </div>

            <h1 className="text-4xl font-extrabold sm:text-5xl">
              Get in <span className="text-info">Touch</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 opacity-70">
              Have a question about our courses, training programs or
              technology services? Send us a message and our team will get
              back to you.
            </p>

          </div>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        <div className="grid gap-10 lg:grid-cols-5">

          <div className="lg:col-span-2">

            <div className="text-sm font-bold uppercase tracking-widest text-slate-500">
              Contact Information
            </div>

            <h2 className="mt-3 text-3xl font-bold">
              Lets Start a Conversation
            </h2>

            <p className="mt-5 leading-7 opacity-70">
              Whether you want to enroll in a course, need more information,
              or simply want to discuss your learning goals, feel free to
              contact us.
            </p>

            {/* Email */}
            <div className="mt-8 flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail size={22} className="text-slate-500"/>
              </div>

              <div>
                <h3 className="font-bold">Email Us</h3>
                <p className="mt-1 text-sm opacity-70">
                  support@example.com
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="mt-6 flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Phone size={22} className="text-slate-500"/>
              </div>

              <div>
                <h3 className="font-bold">Call Us</h3>
                <p className="mt-1 text-sm opacity-70">
                  +92 XXX XXXXXXX
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin size={22} className="text-slate-500"/>
              </div>

              <div>
                <h3 className="font-bold">Location</h3>
                <p className="mt-1 text-sm opacity-70">
                  Pakistan
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock size={22} className="text-slate-500"/>
              </div>

              <div>
                <h3 className="font-bold">Working Hours</h3>
                <p className="mt-1 text-sm opacity-70">
                  Monday – Saturday
                </p>
                <p className="text-sm opacity-70">
                  9:00 AM – 6:00 PM
                </p>
              </div>
            </div>

            {/* Small Trust Box */}
            <div className="mt-10 rounded-2xl bg-base-200 p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-1 shrink-0 text-success"
                  size={21}
                />

                <div>
                  <h3 className="font-bold">
                    Looking for a course?
                  </h3>

                  <p className="mt-2 text-sm leading-6 opacity-70">
                    Explore our courses in software development, AI, IT
                    support, networking, Python, graphic design and more.
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-3">

            <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-[0_0_0_rgba(0,0,0,0.3)] sm:p-8">

              <div className="mb-7">
                <h2 className="text-2xl font-bold">
                  Send Us a Message
                </h2>

                <p className="mt-2 text-sm opacity-60">
                  Fill out the form below and we will get back to you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 XXX XXXXXXX"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="textarea textarea-bordered min-h-40 w-full"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full gap-2 sm:w-auto"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>

              </form>

            </div>

          </div>

        </div>
      </section>

      <section className="bg-base-200">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">

          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Start Learning?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 opacity-70">
            Explore our technology courses and choose the skills you want to
            develop.
          </p>

          <Link
            href="/courses"
            className="btn btn-primary mt-7"
          >
            Explore Courses
          </Link>

        </div>
      </section>

    </main>
  );
}

