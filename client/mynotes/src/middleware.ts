import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import authOptions from "./lib/auth/auth";
import { getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";
import constants from "./constants";

export default withAuth(
  async function middleware(req, res) {
    const token = await getToken({ req }); //Eğer sessionda bir token mevcutsa çekecektir
    const session = await getSession() //Userın sessionını server-side çekmemizi sağlar
    //console.log(token);
    //console.log(session);        

    const isAuth: boolean = !!token; //Kullanıcının auth olup olmadığına göre boolean döndürdük    
    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized({ req , token }) {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        //console.log(token)
        let if_current_authenticated_route:boolean = false
        constants.authenticated_routes.map((route_item)=>{
          if(req.nextUrl.pathname.includes(route_item.path)){
            if_current_authenticated_route = true
          }
        })        
        console.log('MID BOOL',if_current_authenticated_route)
        if(if_current_authenticated_route) return !!token //Token varsa bu routea izin verir        
        return true
      },
    },
  }
);
export const config = {
  matcher: ["/", "/:path*"],
};