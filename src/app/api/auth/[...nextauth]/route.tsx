import { connect } from "@/lib/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {Db} from 'mongodb'


// Mock function to authenticate user
async function authenticateUser(email: string, password: string): Promise<User | null> {
    // Replace this with your real authentication logic (e.g., database check)
    if (email === "user@example.com" && password === "password123") {
        return { id: 1, name: "John Doe", email: "user@example.com" };
    }
    return null;
}

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
            async authorize(credentials) {
                if (!credentials) return null;

                const { email, password } = credentials;
                if(!email || !password) return null;


                const db: Mogo = await connect();
                const currentUser = await db.collection('users').findOne({ email });
                
                if (!currentUser) {
                    return null;
                }
                const user = await authenticateUser(email, password);

                if (user) {
                    return user; // Return user object if authentication succeeds
                } else {
                    return null; // Return null to indicate failed authentication
                }
            },
        })
    ],
    callbacks: {},
    pages: {
        signIn: '/login',
    }
})

export {handler as GET, handler as POST}