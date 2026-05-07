import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

const authConfig = {
  providers: [GitHub],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;