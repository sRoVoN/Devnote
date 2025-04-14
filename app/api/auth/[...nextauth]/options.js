// app/api/auth/[...nextauth]/options.js
import CredentialsProvider from "next-auth/providers/credentials"

export const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "username",
                    type: "text",
                    placeholder: "username"
                },
                password: {
                    label: "password",
                    type: "password",
                    placeholder: "password"
                }
            },
            async authorize(credentials){
                const user = {
                    id: "1",
                    name: "soo arvin",
                    username: "rvn",
                    password: "456"
                };
                if(credentials?.username === user.username && 
                    credentials?.password === user.password
                ){
                    return user
                }else{
                    return null
                }

            }
        })
    ],
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/signout"
    }
}