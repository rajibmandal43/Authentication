import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { login, register } from "../../controllers/authController";

// register route
export async function POST(req) {
  await connectDB();

  try {
    const {searchParams} = new URL(req.url);

    // http://localhost:3000/api/auth?signup=true
    if (searchParams.get("signup")) return register(req);

    // http://localhost:3000/api/auth?login=true
    if (searchParams.get("login")) return login(req);

    return NextResponse.json({ message: "Invalid API Endpoint" });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}