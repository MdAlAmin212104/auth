
import { connect } from "@/lib/connectDB";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const newUser = await req.json();
    try {
        const db = await connect();
        const userCollection = db?.collection('users');
        const exist = await userCollection?.findOne({email: newUser.email})
        if(exist) {
            return Response.json({massage: 'user exists'});
        }
        const user = await userCollection?.insertOne(newUser);
        return Response.json({massage: 'user registered successfully', user});
    } catch (error) {
        console.error('Error registering user:', error);
        return Response.json({massage: 'Error registering user'});
    }
}