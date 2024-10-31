import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { connectDb } from "@/lib/connectDB";


export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            credentials: {
                Email: { label: "Email", type: "email", placeholder: "Your Email " },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any>{
                await connectDb();
                try {
                    
                } catch (error) {
                    
                }
            }
        })
    ]

}