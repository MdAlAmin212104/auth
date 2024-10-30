import NextAuth from "next-auth";


const handler = async () => NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
    providers: [
        
    ],
    callbacks: {},
    pages: {
        signIn: 'login',
    }
})

export {handler as GET, handler as POST}