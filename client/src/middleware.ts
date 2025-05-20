import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Only run middleware on app routes, skip static files and assets
    "/((?!_next|.*\\..*|favicon.ico).*)",
  ],
};
