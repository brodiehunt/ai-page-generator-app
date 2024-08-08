import { auth } from "../auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  privateRoutes,
} from "@/routes";

// Auth middleware function to redirect users.
export default auth((req) => {
  console.log("--------------New MiddleWare call -----------------");
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // If it is a auth route -> always allow
  if (isApiAuthRoute) return null;

  if (isAuthRoute) {
    // If user visits login or register whilst signed in -> redirect to dashboard.
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return null;
  }

  // If private route and not logged in -> redirect to login page.
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
