export const maxDuration = 60;
import { NextResponse } from "next/server";
import { authorizeUser } from "@/src/services/userService";

export async function POST(req) {
  try {
    console.log("Hit the api brosef");
    const { email, password } = await req.json();
    const userAuthorized = await authorizeUser(email, password);

    return NextResponse.json({ user: userAuthorized });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ user: null });
  }
}
