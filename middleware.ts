// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login", 
    signOut: "/auth/signout"
  },
});

export const config = {
  matcher: ["/notes", "/notes/:path*"],
};
