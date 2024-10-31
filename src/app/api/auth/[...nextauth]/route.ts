import { connect } from "@/lib/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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
        })
    ],
    callbacks: {},
    pages: {
        signIn: '/login',
    }
})

export {handler as GET, handler as POST}