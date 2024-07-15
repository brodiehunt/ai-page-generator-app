import { NextResponse } from "next/server";
import { parse } from "url";
import { auth } from "@/auth";
import { getAllHubs, createNewHub } from "@/src/services/hubService";
import { addHubToWebsite } from "@/src/services/websiteService";

export async function GET(request, { params }) {
  try {
    const { websiteId } = params;

    if (!websiteId) {
      throw new Error("Website Id not provided");
    }

    // const pageSize = parseInt(query.pageSize) || null;

    const hubs = await getAllHubs(websiteId);

    const response = NextResponse.json({
      hubs,
    });
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { websiteId } = params;
    const { name, topic, addToMatrix } = await request.json();
    const { query } = parse(request.url, true);
    console.log("Request Url", request.url);
    const userId = query.userId || "";
    console.log("THE FIELDS", websiteId, name, topic, addToMatrix, userId);
    console.log("ADD TO MATRIX VALUE:", addToMatrix);
    const newHub = await createNewHub({
      name,
      topic,
      userId,
      websiteId,
    });

    if (!newHub) {
      throw new Error("Could not create hub");
    }
    const hubObject = newHub.toObject();
    console.log(hubObject, "HUB OBJECT");
    const addToWebsite = await addHubToWebsite({
      hub: hubObject,
      websiteId,
      addToMatrix,
    });

    if (!addToWebsite) {
      throw new Error("Could not link new hub to website");
    }

    return NextResponse.json({
      hub: newHub,
      error: null,
    });
  } catch (error) {
    console.error("errror", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
