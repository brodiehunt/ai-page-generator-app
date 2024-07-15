import { auth } from "../auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  privateRoutes,
} from "@/routes";

export default auth((req) => {
  console.log("--------------New MiddleWare call -----------------");
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn) {
      // console.log("GOING TO REDIRECT TO DASHBOARD");
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // console.log("returning null when api route");
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    // console.log("GOING TO REDIRECT TO LOGIN");
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // console.log("RETURNING NULL WTF");
  return null;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
