import { NextResponse } from "next/server";
import dbConnect from "@/src/utils/db";
import User from "@/src/models/User";
import { parse } from "url";
import { auth } from "@/auth";
import { createWebsite, getAllWebsites } from "@/src/services/websiteService";

export async function GET(request) {
  try {
    await dbConnect();

    const { query } = parse(request.url, true);
    const userId = query.userId || 1;
    const pageSize = parseInt(query.pageSize) || null;
    console.log("USER ID IN API", userId);
    const websites = await getAllWebsites(userId);
    console.log("THE websites HAS BEEN FETCHED");
    const response = NextResponse.json({
      websites: websites,
    });
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error) {
    // console.error("Failed to fetch websites:", error);
    // return { error: "Failed To fetch websites" };
    console.error("Error in API route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error("No user session found");
    }

    const { name, url } = await request.json();
    const newWebsite = await createWebsite({ userId, name, url });

    return NextResponse.json({ message: "Woooohooo", website: newWebsite });
  } catch (error) {
    console.log("Enter catch", error);
    return NextResponse.json({ error: "Fuck me" }, { status: 500 });
  }
}
