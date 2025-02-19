import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import db from "../db/index.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";

interface GitHubProfile {
    username?: string;
    displayName?: string;
}

interface User {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
}

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            callbackURL: "/api/auth/github/callback",
        },
        async (accessToken: string, refreshToken: string, profile: GitHubProfile, done: (error: any, user?: User | false | null) => void) => {
            try {
                const existingUser = await db.select().from(users).where(eq(users.email, profile.username! + "@github.com"));

                if (existingUser.length > 0) {
                    return done(null, existingUser[0] as User);
                }

                const newUser = await db.insert(users).values({
                    name: profile.displayName || profile.username!,
                    email: profile.username! + "@github.com",
                    password: "",
                    isVerified: true,
                }).returning();

                return done(null, newUser[0] as User);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);
