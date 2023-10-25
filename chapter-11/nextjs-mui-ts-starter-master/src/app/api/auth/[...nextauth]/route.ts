// lưu thông tin người đăng nhập vào cookie thông qua mã hõa


import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { AuthOptions } from "next-auth"
import { sendRequest } from "../../../utils/api";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    secret: process.env.NO_SECRET,
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Sound Cloud", // tên hiển thị
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }


                const res = await sendRequest<IBackendRes<IAuth>>({
                    url: "http://localhost:8000/api/v1/auth/login",
                    method: "POST",
                    body: {
                        username: credentials?.username,
                        password: credentials?.password,
                    },
                })

                if (res && res.data) {
                    // Any object returned will be saved in `user` property of the JWT
                    return res.data as any
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        // ...add more providers here
    ],
    callbacks: {
        // b1: giải mã token chỗ cookies
        async jwt({ token, user, account, profile, trigger }) {
            if (trigger === "signIn" && account?.provider !== "credentials") {
                // save in cookies
                // call api
                const res = await sendRequest<IBackendRes<IAuth>>({
                    url: "http://localhost:8000/api/v1/auth/social-media",
                    method: "POST",
                    body: {
                        type: account?.provider.toUpperCase(),
                        username: user.email
                    }
                })
                if (res.data) {
                    token.access_token = res.data.access_token;
                    token.refresh_token = res.data.refresh_token;
                    token.user = res.data?.user;
                }
            }

            if (trigger === "signIn" && account?.provider == "credentials") {
                token.access_token = user.access_token;
                token.refresh_token = user.refresh_token;
                token.user = user.user;
            }

            return token
        },
        // b2: sau đó nạp (lưu) lại cho session
        async session({ session, token, user }) {
            if (token) {
                session.access_token = token.access_token
                session.refresh_token = token.refresh_token
                session.user = token.user
            }
            return session
        },
    }
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }