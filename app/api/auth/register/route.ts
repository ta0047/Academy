
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/app/lib/mongoDB";
import User from "@/app/models/User";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Validate required fields
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      return NextResponse.json(
        { message: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name.trim();

    // Basic email and password validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (password.length < 8 || password.length > 72) {
      return NextResponse.json(
        { message: "Password must be between 8 and 72 characters." },
        { status: 400 }
      );
    }

    if (normalizedName.length > 100) {
      return NextResponse.json(
        { message: "Name must be 100 characters or fewer." },
        { status: 400 }
      );
    }

    await connectDB();

    // Check whether the email is already registered
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Account created successfully." },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Handle a duplicate email if two requests arrive together
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    console.error("Registration error:", error);

    return NextResponse.json(
      { message: "Unable to create your account." },
      { status: 500 }
    );
  }
}
