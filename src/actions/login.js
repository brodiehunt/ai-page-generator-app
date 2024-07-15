"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import * as z from "zod";
import { LoginSchema } from "@/src/schemas";
import { authorizeUser } from "../services/userService";

export const login = async (values) => {
  console.log(values);
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validatedFields.data;

  // try {
  //   const user = await authorizeUser(email, password);
  //   console.log("User in login sever action", user);

  //   if (!user) {
  //     const error = new Error("No user exists");
  //     throw error;
  //   }

  //   return { success: "User Logged in" };
  // } catch (error) {
  //   console.log("Errror:", error);
  //   return { error: error.message };
  // }

  // return { success: "Ye boiii" };
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
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
    throw error;
  }
};
