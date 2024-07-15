import { NextResponse } from "next/server";
import { parse } from "url";
import { auth } from "@/auth";
import { getAllHubs, getHubById } from "@/src/services/hubService";
import {
  addHubToWebsite,
  removeHubFromWebsite,
} from "@/src/services/websiteService";

export async function DELETE(request, { params }) {
  try {
    const { websiteId, hubId } = params;
    const { query } = parse(request.url, true);
    const removeFromMatrix = query.removeFromMatrix;

    if (!websiteId || !hubId) {
      throw new Error("Can not delete Hub.");
    }

    // Delete all blogs first
    const hubToDelete = await getHubById(hubId);

    if (!hubToDelete) {
      throw new Error("Can not delete hub");
    }
    const topic = hubToDelete.topic;

    const website = await removeHubFromWebsite({
      hubId,
      websiteId,
      hubTopic: topic,
      removeFromMatrix,
    });

    if (!website) {
      throw new Error("Could not remove hub from website");
    }

    await hubToDelete.deleteOne();

    return NextResponse.json({ message: "Wooohooo" });
  } catch (error) {
    console.error("An Error Occured:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
