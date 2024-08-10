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
  const { email, password } = values;

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  try {
    const newUser = await createUser(validatedFields.data);
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "User Created" };
  } catch (error) {
    console.error("Errror:", error);
    if (error instanceof AuthError) {
      // Errors thrown by me in the authorize function.
      if (error.cause?.err instanceof Error) {
        return { error: error.cause.err.message };
      }
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Ooops something went wrong" };
      }
    }
    return { error: error.message };
  }
};
