import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import db from "../db/index.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";

interface Profile {
    displayName: string;
    emails?: { value: string }[];
}

interface DoneFunction {
    (error: any, user?: any): void;
}

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "/api/auth/google/callback",
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done: DoneFunction) => {
            try {
                const existingUser = await db.select().from(users).where(eq(users.email, profile.emails![0].value));

                if (existingUser.length > 0) {
                    return done(null, existingUser[0]);
                }

                const newUser = await db.insert(users).values({
                    name: profile.displayName,
                    email: profile.emails![0].value,
                    password: "", // OAuth users don\u2019t need a password
                    isVerified: true,
                }).returning();

                return done(null, newUser[0]);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);
