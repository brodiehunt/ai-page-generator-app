import Website from "../models/Website";
import User from "../models/User";
import dbConnect from "../utils/db";

export const getAllWebsites = async (userId) => {
  await dbConnect();

  const websites = await Website.find({ userId });

  return websites;
};

export const getSingleWebsite = async (websiteId) => {
  await dbConnect();

  const website = await Website.findById(websiteId);

  return website;
};

export const findWebsiteName = async (websiteId) => {
  console.log("ENTER FIND WEBSITE NAME SERVICE");
  await dbConnect();

  const website = await Website.findById(websiteId).select("name");
  console.log("The website", website);
  if (!website) {
    throw new Error("No Website Found");
  }
  const websiteName = website.name;
  return { name: websiteName };
};

export const createWebsite = async ({ userId, name, url }) => {
  await dbConnect();

  const newWebsite = new Website({ name, url, userId });

  await newWebsite.save();

  await User.findByIdAndUpdate(
    userId,
    {
      $push: { websites: { websiteId: newWebsite._id, name: newWebsite.name } },
    },
    { new: true }
  );

  return newWebsite;
};

export const deleteWebsite = async ({ userId, websiteId }) => {
  await dbConnect();
  const deletedWebsite = await Website.findByIdAndDelete(websiteId);

  if (!deletedWebsite) {
    throw new Error("Website couldnt be found.");
  }

  await User.findByIdAndUpdate(userId, {
    $pull: { websites: { websiteId: deletedWebsite._id } },
  });

  return deletedWebsite;
};

export const addHubToWebsite = async ({ websiteId, hub, addToMatrix }) => {
  await dbConnect();
  console.log("THE HUB: ", hub);
  if (!addToMatrix) {
    const website = await Website.findByIdAndUpdate(
      websiteId,
      {
        $push: { hubs: { hubId: hub._id, name: hub.name } },
      },
      { new: true }
    );
    return website;
  }

  const website = await Website.findByIdAndUpdate(
    websiteId,
    {
      $push: {
        hubs: { hubId: hub._id, name: hub.name },
        "seoMatrix.hubs": hub.topic,
      },
      $set: {
        "seoMatrix.hasContent": true,
      },
    },
    { new: true }
  );

  return website;
};

export const removeHubFromWebsite = async ({
  websiteId,
  hubId,
  removeFromMatrix,
  hubTopic,
}) => {
  await dbConnect();

  if (!removeFromMatrix) {
    const website = await Website.findByIdAndUpdate(
      websiteId,
      {
        $pull: { hubs: { hubId } },
      },
      { new: true }
    );
    return website;
  }

  const website = await Website.findByIdAndUpdate(
    websiteId,
    {
      $pull: { hubs: { hubId }, "seoMatrix.hubs": hubTopic },
    },
    { new: true }
  );

  return website;
};
