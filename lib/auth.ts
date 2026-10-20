import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  secret:
    process.env.NEXTAUTH_SECRET ||
    // Local and preview fallback so the app still builds without a secret.
    // Vercel deployments must set NEXTAUTH_SECRET.
    "esther-studios-local-development-secret",
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized() {
      return true;
    },
  },
});
