import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return NextResponse.json({ message: "Logout successful" });
  } 
  catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },{ status: 500 }
    );
  }
}
