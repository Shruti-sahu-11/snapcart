import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./lib/db"
import User from "./models/user.model"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
       credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // all logic for after sign in like email password check(if its correct or not) or user existence check
      async authorize(credentials, request) {
    
            await connectDb() // for accessing db
            const email = credentials.email;
            const password = credentials.password as string; 
            const user = await User.findOne({ email})
            if(!user){
                throw new Error("No user found with this email")
            }
            //for password matching
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                throw new Error("Incorrect password")
            }
            return {
                id:user._id.toString(),
                email:user.email,
                name:user.name,
                role:user.role
            }
     },
    })
  ],
  callbacks:{
    //token ke ander user ka data dalta hai
    async jwt({token,user}){
        if(user){
            token.id = user.id,
            token.name = user.name,
            token.email = user.email,
            token.role = user.role
        }
        return token;
    },
    session({session,token}){
        if(session.user){
            session.user.id = token.id as string,
            session.user.name = token.name as string,
            session.user.email = token.email as string,
            session.user.role = token.role as string
        }
        return session;
    }
  },
  pages:{
    signIn:"/login",
    error:"/login"
  },
  session:{
    strategy:"jwt",
    maxAge: 10 * 24 * 60 * 60 * 1000 //1 day
  },
  secret:process.env.AUTH_SECRET
})


//connect db
//email check - if user exist or not becoz one can only sign in if he/she is registered
//password check - if entered correct or not
//return user object if all ok else return null