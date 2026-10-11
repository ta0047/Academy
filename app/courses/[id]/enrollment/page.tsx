"use client";

import { toast } from "react-toastify";
import { useState, ChangeEvent } from "react";
import { useSearchParams } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  course: string;
}

export default function Enrollment() {
  const searchParams = useSearchParams();

const course = searchParams.get("course") || "";

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    course: course,
  });

   const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/enrollment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-xl bg-base-100 shadow-[0_0_15px_rgba(0,0,0,0.3)]">
        <div className="card-body">

          <h1 className="text-xl font-bold text-center">
            Enroll Now
          </h1>

          {/* Course Applied For */}
          <div className="mt-2">
            <label className="font-semibold">
              Course Applied For
            </label>

            <input
              type="text"
              value={formData.course}
              readOnly
              className="input input-bordered w-full mt-1"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />

            {/* Message */}
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="textarea textarea-bordered w-full h-12"
              required
            />

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary"
            >
              Submit Enrollment
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
