"use server";
import { findWebsiteName } from "@/src/services/websiteService";

export const getWebsiteName = async (websiteId) => {
  console.log("Enter GET WEBSITE NAME ACTION");
  try {
    const { name } = await findWebsiteName(websiteId);

    return { name, error: null };
  } catch (error) {
    console.log("ERRROR HANDLED BY ACTION", error);
    return { error: "Could not fetch website name", name: null };
  }
};
