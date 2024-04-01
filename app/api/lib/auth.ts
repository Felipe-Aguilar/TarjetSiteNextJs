import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                usuId: { label: "usuId", type: "text", placeholder: "usuId" },
                token: { label: "token", type: "text", placeholder: "token" },
            },
            async authorize(credentials) {

                if (credentials) {
                    return {
                        id: credentials.usuId,
                        name: credentials.usuId,
                        email: credentials.token,
                    }
                }

                return null;
            },
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ user }){
            return true;
        },
        async jwt({ token }){
            return token;
        },
        async session({ session }){

            return session;
        }
    },
    // pages: {
    //     signIn: '/login'
    // }
};