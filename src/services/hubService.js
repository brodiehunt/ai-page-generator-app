import Hub from "@/src/models/Hub";
import dbConnect from "@/src/utils/db";

export const getAllHubs = async (websiteId) => {
  await dbConnect();

  const hubs = await Hub.find({ websiteId });

  return hubs;
};

export const createNewHub = async ({ name, topic, userId, websiteId }) => {
  await dbConnect();

  const newHub = await new Hub({ name, topic, userId, websiteId });

  return await newHub.save();
};

export const getHubById = async (hubId) => {
  await dbConnect();

  const hub = await Hub.findById(hubId);

  return hub;
};
