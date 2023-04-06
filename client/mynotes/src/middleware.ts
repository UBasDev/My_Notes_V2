import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import authOptions from "./lib/auth/auth";
import { getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";

const sensitiveRoutes = [`/dashboard`];
export default withAuth(
  async function middleware(req, res) {
    const token = await getToken({ req }); //Eğer sessionda bir token mevcutsa çekecektir
    const session = await getSession() //Userın sessionını server-side çekmemizi sağlar
    //console.log(token);
    //console.log(session);

    const isAuth: boolean = !!token; //Kullanıcının auth olup olmadığına göre boolean döndürdük
    const pathname = req.nextUrl.pathname;
    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);
export const config = {
  matcher: [`/`, `/auth/sign_in`, `/dashboard/:path*`, `/api/:path*`],
};