import { NextResponse } from "next/server";

import Feedback from "../../models/Feedback";
import connectDB from "../../lib/mongoDB";

export async function POST(request: Request) {
  try {
    await connectDB();

    const data = await request.json();
    const feedback = await Feedback.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      course: data.course,
    });

    return NextResponse.json(
      {
        message: "Message Saved successfully",
        data: feedback,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Feedback Error:", error);

    return NextResponse.json(
      {
        message: "Failed to save feedback",
      },
      { status: 500 },
    );
  }
}
