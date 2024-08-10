import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/src/schemas";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("Authorize function running");
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const baseURL =
            process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
          // Make a POST request to the new API route
          const response = await fetch(`${baseURL}/api/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            throw new Error("Failed to authorize user");
          }

          const { user } = await response.json();

          if (!user || !user.password) {
            throw new Error("Invalid credentials");
          }

          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
};
