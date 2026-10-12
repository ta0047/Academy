import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoDB";
import Course from "@/app/models/course";

export async function GET(request: Request) {
    try{
        await connectDB();
        const course = await Course.find().lean();
        return NextResponse.json(course, { status: 200 });

    }
    catch (error) {
        console.error("Error fetching courses:", error);
        return NextResponse.json({ message: "Unable to fetch courses." }, { status: 500 });
    }
}