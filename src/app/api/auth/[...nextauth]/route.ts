import { connect } from "@/lib/connectDB";
import NextAuth, { Account, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { AdapterUser } from "next-auth/adapters";

const handler = NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials: { email: string; password: string } | null) {
                if (!credentials) return null;
            
                const { email, password } = credentials;
                if (!email || !password) return null;
            
                const Db = await connect();
                if (!Db) {
                    console.error("Failed to connect to the database");
                    return null;
                }
            
                const currentUser = await Db.collection('users').findOne({ email });
                if (!currentUser) {
                    console.error("User not found");
                    return null;
                }
            
                const passwordMatched = await bcrypt.compare(password, currentUser.password);
                if (!passwordMatched) {
                    console.error("Password does not match");
                    return null;
                }
            
                // Ensure no sensitive data is sent with the user object
                const { password: _, ...sanitizedUser } = currentUser;
                return sanitizedUser;
            }
        }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string
        })

    ],
    callbacks: {
        async signIn({ user, account }: { user: User | AdapterUser; account: Account | null }): Promise<boolean | string> {
            if (account?.provider === "Google" || account?.provider === "github") {
                const { name, email, image } = user; // Assuming `user` holds these properties
    
                try {
                    const db = await connect();
                    
                    // Handle case if db is undefined
                    if (!db) {
                        console.error("Database connection failed.");
                        return false; // Deny sign-in if database connection fails
                    }
    
                    const userCollection = db.collection("users");
    
                    // Check if the user already exists
                    const userExists = await userCollection.findOne({ email });
    
                    // If the user does not exist, insert a new record
                    if (!userExists) {
                        await userCollection.insertOne({ name, email, image });
                    }
                    return true; // Allow sign-in
                } catch (error) {
                    console.error("Error during sign-in:", error);
                    return false; // Deny sign-in on error
                }
            }
            return true; // Allow sign-in for other providers
        },
    },
    pages: {
        signIn: '/login',
    }
})

export {handler as GET, handler as POST}