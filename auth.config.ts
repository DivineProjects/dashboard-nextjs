import type { NextAuthConfig } from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request }) {
      const nextUrl = (request as NextRequest).nextUrl;
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard && !isLoggedIn) {
        // Redirect unauthenticated users → login
        return NextResponse.redirect(new URL("/login", nextUrl));
      }

      if (!isOnDashboard && isLoggedIn && nextUrl.pathname === "/login") {
        // Redirect logged-in users away from login
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },

  providers: [],
};
