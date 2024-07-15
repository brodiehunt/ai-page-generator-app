"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import * as z from "zod";
import { RegisterSchema } from "@/src/schemas";
import { createUser } from "@/src/services/userService";

export const registerUser = async (values) => {
  console.log(values);
  const validatedFields = RegisterSchema.safeParse(values);
  console.log(validatedFields);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  try {
    const newUser = await createUser(validatedFields.data);
    return { success: "User Created" };
  } catch (error) {
    console.log("Errror:", error);
    return { error: error.message };
  }
};
