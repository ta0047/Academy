import { NextResponse } from "next/server";

import Enrollment from "../../models/Enrollment";
import connectDB from "../../lib/mongoDB";

export async function POST(request: Request) {
  try {
    await connectDB();

    const data = await request.json();

    const existingEnrollment = await Enrollment.findOne({
      email: data.email,
    });

    if (existingEnrollment) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        { status: 409 },
      );
    }

  const enroll = await Enrollment.create({
  name: data.name,
  email: data.email,
  phone: data.phone,
  message: data.message,
  course: data.course,
});

    return NextResponse.json(
      {
        message: "Enroll Successfully",
        data: enroll,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Enrollment Error:", error);

    return NextResponse.json(
      {
        message: "Failed to save enrollment",
      },
      { status: 500 },
    );
  }
}
