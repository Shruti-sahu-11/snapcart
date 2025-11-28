
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

//cretae middleware 
export async function proxy(req:NextRequest){

    const {pathname} = req.nextUrl;
    
    const publicRoutes = ["/login","/register","/api/auth","/_next"]
    if(publicRoutes.some((path) => pathname.startsWith(path))){
        console.log("🔥 MIDDLEWARE IS RUNNING:", req.nextUrl.pathname);
        return NextResponse.next();
    }
    const token = await getToken({req, secret:process.env.AUTH_SECRET})
    console.log("token generated",token)
    console.log("req url",req.url)
    if(!token){
        const loginUrl = new URL("/login",req.url)
        loginUrl.searchParams.set("callbackUrl",req.url)
        return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
}
//it tell middleware will not run for these routes only
export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
    
}

// req -----> middleware---->server