import { NextResponse } from "next/server";
import dbConnect from "@/src/utils/db";
import User from "@/src/models/User";
import { parse } from "url";
import { auth } from "@/auth";
import { deleteWebsite, getSingleWebsite } from "@/src/services/websiteService";

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { websiteId } = params;

    const { query } = parse(request.url, true);

    const userId = query.userId || 1;

    if (!websiteId || !userId) {
      return NextResponse.json(
        { error: "Website ID or User ID not provided" },
        { status: 400 }
      );
    }

    const deletedWebsite = await deleteWebsite({ websiteId, userId });

    console.log("This website has been successfully deleted", deletedWebsite);
    const response = NextResponse.json({
      website: deletedWebsite,
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

export async function GET(request, { params }) {
  try {
    const { websiteId } = params;

    if (!websiteId) {
      throw new Error("Could not fetch website data");
    }

    const website = await getSingleWebsite(websiteId);

    if (!website) {
      throw new Error("Website not found");
    }

    return NextResponse.json({ error: null, website: website });
  } catch (error) {
    console.error("Error in GET single website route handler", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
