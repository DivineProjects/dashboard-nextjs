import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    /**
     * Runs on every request. Use this to protect routes.
     */
    authorized({ auth, request }) {
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard && !isLoggedIn) {
        // Not logged in → redirect to login
        return NextResponse.redirect(new URL("/login", nextUrl));
      }

      if (!isOnDashboard && isLoggedIn && nextUrl.pathname === "/login") {
        // Logged in → redirect from login page to dashboard
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
      }

      // Default: allow request
      return true;
    },
  },
  providers: [], // We'll add real providers below
} satisfies NextAuthConfig;
