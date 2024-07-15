/**
 * Array of routes (string) that are publically accessible
 *  */
export const publicRoutes = ["/"];

/**
 * Routes used for authentication (will redirect logged in user to /dashboard)
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * Edge case (redirect logged in user to /dashboard. Redirect non-logged in user to /login) (No one can sign up for the application...);
 *
 */
export const noAccess = ["/auth/register"];

/**
 * Protected private routes (will redirect non-logged in users to /auth/login)
 */
export const privateRoutes = ["/dashboard", "/docs"];

/**
 * Prefix for API authentication routes
 * Routes that start with this prefix are used for api auth purposes
 * Both logged in and non-logged in users need to be able to access these routes
 */

export const apiAuthPrefix = "/api/auth";

/**
 * DEFAULT LOGIN REDIRECT (After user successfully logs in)
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
