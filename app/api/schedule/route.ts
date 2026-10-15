import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import mongoose from "mongoose";
import connectDB from "@/app/lib/mongoDB";
import Course from "@/app/models/course";
import Schedule from "@/app/models/Schedule";

function isValidDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsedDate = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === value
  );
}

async function getAuthenticatedUserId() {
  const token = (await cookies()).get("token")?.value;
  const secretKey = process.env.JWT_SECRET;

  if (!token || !secretKey) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secretKey),
    );
    return typeof payload.userId === "string" ? payload.userId : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const userId = await getAuthenticatedUserId();
  if (!userId || !mongoose.isValidObjectId(userId)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const schedules = await Schedule.find({ userId })
      .sort({ date: 1, time: 1, createdAt: 1 })
      .select("_id courseName date time")
      .lean();

    return NextResponse.json(
      {
        schedules: schedules.map((schedule) => ({
          _id: schedule._id.toString(),
          courseName: schedule.courseName,
          date: schedule.date,
          time: schedule.time,
        })),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching user schedules:", error);
    return NextResponse.json(
      { message: "Unable to fetch your schedules." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const userId = await getAuthenticatedUserId();
  if (!userId || !mongoose.isValidObjectId(userId)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let data: { courseId?: unknown; date?: unknown; time?: unknown };
  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  if (
    typeof data.courseId !== "string" ||
    !mongoose.isValidObjectId(data.courseId) ||
    !isValidDate(data.date) ||
    typeof data.time !== "string" ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(data.time)
  ) {
    return NextResponse.json(
      { message: "A valid course, date, and time are required." },
      { status: 400 },
    );
  }

  try {
    await connectDB();
    const course = await Course.findById(data.courseId).select("title").lean();

    if (!course) {
      return NextResponse.json(
        { message: "Course not found." },
        { status: 404 },
      );
    }

    const schedule = await Schedule.create({
      userId: new mongoose.Types.ObjectId(userId),
      courseId: new mongoose.Types.ObjectId(data.courseId),
      courseName: course.title.trim(),
      date: data.date,
      time: data.time,
    });

    return NextResponse.json(
      {
        message: "Schedule added to your dashboard.",
        schedule: {
          _id: schedule._id.toString(),
          courseName: schedule.courseName,
          date: schedule.date,
          time: schedule.time,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding user schedule:", error);
    return NextResponse.json(
      { message: "Unable to add this schedule." },
      { status: 500 },
    );
  }
}
