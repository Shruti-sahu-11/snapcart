import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";


export async function POST(req:NextRequest){
    try{
        await connectDb(); // for accessing db
        const {name,email,password} = await req.json();
        const existUser = await User.findOne({email});
        if(existUser){
            return NextResponse.json(
                {message:"email alrady exist!"},
                {status:400} //for frontend error
            )
        }

        if(password.length < 6){
            return NextResponse.json(
                {message:"password must be at least 6 characters"},
                {status:400}
            )
        }

        const hashedPasswrod = await bcrypt.hash(password,10)
        const user = await User.create({
            name,email,password:hashedPasswrod
        })
        return NextResponse.json(
                user,
                {status:200}
            )
    }
    catch (error){
        return NextResponse.json(
                {message:`register error ${error}`},
                {status:500}  //server error
            )
    }
}

//connect db
//name,email,password -> from frontend 
//email check -> existing user
//password length >=6
//password hashing -> bcryptjs
//save user to db -> mongoose
//return response -> success message user created