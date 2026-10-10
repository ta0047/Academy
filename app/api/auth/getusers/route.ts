import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoDB";
import User from "@/app/models/User";

export async function GET(request: Request) {
    try{
        await connectDB();
        const users = await User.find({}, { password: 0 }).lean();
        return NextResponse.json(users, { status: 200 });

    }
    catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ message: "Unable to fetch users." }, { status: 500 });
    }

}