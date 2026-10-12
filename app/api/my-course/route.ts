import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import mongoose from "mongoose";
import connectDB from "@/app/lib/mongoDB";
import User from "@/app/models/User";
import Enrollment from "@/app/models/Enrollment";
import CourseEnrollment from "@/app/models/CourseEnrollment";
import Course from "@/app/models/course";

type EnrollmentRecord = {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  course: string;
  courseId?: mongoose.Types.ObjectId;
  createdAt: Date;
};

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const secretKey = process.env.JWT_SECRET;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!secretKey) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }

  let userId: string;
  try {
    const secret = new TextEncoder().encode(secretKey);
    const { payload } = await jwtVerify(token, secret);
    const payloadUserId = payload.userId;

    if (typeof payloadUserId !== "string") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    userId = payloadUserId;
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const user = await User.findById(userId).select("name email").lean();

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const [enrollmentRecords, dashboardCourses] = await Promise.all([
      Enrollment.find({
        $expr: {
          $eq: [{ $toLower: "$email" }, user.email.trim().toLowerCase()],
        },
      })
        .select("name email phone course courseId createdAt")
        .sort({ createdAt: -1 })
        .lean<EnrollmentRecord[]>(),
      CourseEnrollment.find({ userId })
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    return NextResponse.json(
      {
        user: { name: user.name, email: user.email },
        enrollments: [
          ...enrollmentRecords.map((record) => ({
            _id: `${record._id}:primary`,
            courseId: record.courseId?.toString(),
            name: record.name,
            email: record.email,
            phone: record.phone,
            course: record.course,
            createdAt: record.createdAt,
          })),
          ...dashboardCourses.map((enrollment) => ({
            _id: enrollment._id.toString(),
            courseId: enrollment.courseId.toString(),
            name: user.name,
            email: user.email,
            phone: "Not provided",
            course: enrollment.title,
            createdAt: enrollment.createdAt,
          })),
        ],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching user courses:", error);
    return NextResponse.json(
      { message: "Unable to fetch enrolled courses." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const token = (await cookies()).get("token")?.value;
  const secretKey = process.env.JWT_SECRET;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!secretKey) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }

  let userId: string;
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secretKey),
    );

    if (typeof payload.userId !== "string") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    userId = payload.userId;
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let data: { courseId?: unknown };
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
    !mongoose.isValidObjectId(data.courseId)
  ) {
    return NextResponse.json(
      { message: "A valid course is required." },
      { status: 400 },
    );
  }

  try {
    await connectDB();
    const [user, course] = await Promise.all([
      User.findById(userId).select("name email").lean(),
      Course.findById(data.courseId).select("title").lean(),
    ]);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!course) {
      return NextResponse.json({ message: "Course not found." }, { status: 404 });
    }

    const enrollment = await Enrollment.findOne({
      $expr: {
        $eq: [{ $toLower: "$email" }, user.email.trim().toLowerCase()],
      },
    });
    const courseTitle = course.title.trim();
    const normalizedCourseTitle = courseTitle.toLowerCase();

    const alreadyEnrolledInLegacyCourse =
      enrollment?.courseId?.toString() === data.courseId ||
      enrollment?.course.trim().toLowerCase() === normalizedCourseTitle;
    if (alreadyEnrolledInLegacyCourse) {
      return NextResponse.json(
        { message: "You are already enrolled in this course." },
        { status: 409 },
      );
    }

    await CourseEnrollment.init();
    const existingDashboardCourse = await CourseEnrollment.exists({
      userId,
      courseId: data.courseId,
    });
    if (existingDashboardCourse) {
      return NextResponse.json(
        { message: "You are already enrolled in this course." },
        { status: 409 },
      );
    }

    await CourseEnrollment.create({
      userId: new mongoose.Types.ObjectId(userId),
      courseId: new mongoose.Types.ObjectId(data.courseId),
      title: courseTitle,
    });

    return NextResponse.json(
      { message: "Course added to your dashboard." },
      { status: 201 },
    );
  } catch (error) {
    if (
      error instanceof mongoose.mongo.MongoServerError &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { message: "You are already enrolled in this course." },
        { status: 409 },
      );
    }

    console.error("Error adding course enrollment:", error);
    return NextResponse.json(
      { message: "Unable to add this course." },
      { status: 500 },
    );
  }
}