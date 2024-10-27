
import { connectDB } from "@/lib/connectDb";
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
    // maxAge: 20,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials
        if (email || password) {
          null
        }
        const db =await connectDB()
        const currentUser = await db.collection('users').findOne({ email })
        if (!currentUser) {
          return null
        }
        const isPassword =currentUser.password===password
        if(!isPassword){
          return null
        }
        return currentUser

      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Attach user ID to session
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      // Persist user ID in the token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
