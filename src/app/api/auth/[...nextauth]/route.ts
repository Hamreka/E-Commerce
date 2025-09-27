import NextAuth, { NextAuthOptions } from "next-auth"
import { jwtDecode } from "jwt-decode";
import  Credentials from 'next-auth/providers/credentials';
export const NextOptions: NextAuthOptions = {
    pages: {
        signIn:"/login"
    },
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: {},
                password:{}
            },
            async authorize(credentials) {
                console.log(credentials);
                
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
                    method: 'post',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password:credentials?.password
                    }),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                const data = await res.json()
                if (data.message == 'success') {
                    const decodedToken:{id:string} = jwtDecode(data.token)
                    return {
                        id:decodedToken.id,
                        user:data.user,
                        token:data.token
                    }
                } else {
                    throw new Error(data.message)
                }
                
            
                
            }
        })
    ],
   callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.token = user.token
      token.user = user.user
    }
    return token
  },
  async session({ session, token }) {
    session.user = token.user
    session.token = token.token
    return session
  },
}
}








const handler = NextAuth(NextOptions)

export { handler as GET, handler as POST }