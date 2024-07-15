import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/src/schemas";
import { authorizeUser } from "@/src/services/userService";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await authorizeUser(email, password);

          if (!user || !user.password) {
            throw new Error("Invalid credentials");
          }

          return user;
        }
        // Validate fields here (will be email/password)
        // If fields validated then check user exists in db
        // if no user then or user without password. return null
        // If both are fine, verify password.
        // if password verified return user
        // top level else return null
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
