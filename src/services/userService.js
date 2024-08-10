// import User from "../models/User";
import User from "@/src/models/User";
import dbConnect from "@/src/utils/db";

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const createUser = async (userData) => {
  const { email, password, name } = userData;
  await dbConnect();
  const userWithEmail = await findUserByEmail(email);

  if (userWithEmail) {
    const error = new Error("Email already in use");
    error.status = 409;
    throw error;
  }

  const user = new User({ email, password, name });

  const savedUser = await user.save();
  return savedUser;
};

export const authorizeUser = async (email, password) => {
  try {
    await dbConnect();
    const user = await User.findOne({ email }).select("password email");
    console.log("user", user);
    console.log(typeof password);
    if (!user) return null;

    const isMatch = await user.verifyPassword(password);
    console.log(isMatch);
    if (!isMatch) return null;

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};
