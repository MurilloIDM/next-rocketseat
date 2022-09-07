import { query as q } from "faunadb";

import nextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { fauna } from "../../../services/fauna";

export default nextAuth({
  secret: process.env.SIGN_KEY,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: "read:user"
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index("user_by_email"),
                  q.Casefold(user?.email),
                ),
              ),
            ),
            q.Create(
              q.Collection("users"),
              { data: { email: user?.email } },
            ),
            q.Get(
              q.Match(
                q.Index("user_by_email"),
                q.Casefold(user?.email),
              ),
            ),
          ),
        );

        return true;
      } catch {
        return false;
      }
    },
  }
});