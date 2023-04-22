import axiosInstances from "../axios/axiosInstances";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import axios from "axios";
import { SignInFormItems } from "@/interfaces";

interface ApiLoginResponseType{
  accessToken: string;
  refreshToken: string;
}

const authOptions: NextAuthOptions = {
    session: {
      strategy: `jwt`,    
      maxAge: 1 * 60, //1 dakika. Bu süre, Refresh Tokenla aynı sürede olmalı ve Sessionın `refetchInterval` süresinden daha UZUN olmalıdır
        //maxAge: 1 * 24 * 60 * 60, // 1 günlük
    },
    providers: [
      CredentialsProvider({
        type: "credentials",
        credentials: {},
        async authorize(credentials:any, req:any) { //Buradaki `credentials`, Login formu içerisinden bize gönderilen objecttir.
          const { email, password } = credentials as SignInFormItems
          const bodyToSend = {
            email,
            password,
          };                    
          debugger
          const apiResponse: ApiLoginResponseType = await axiosInstances.axiosCommonInstance
            .post("/auth/login", bodyToSend)
            .then((response) => {     
              console.log(response.data);
              return response.data;
            })
            .catch((error) => {
              console.log('ERROR', error.response);
              throw new Error( 
                `${error.response.data.Message} - ${error.response.data.StatusCode}`,
                { cause: error }
              );
            });
            return {              
              id: "",
              name: "",
              email: "",
              accessToken: apiResponse.accessToken,
              refreshToken: apiResponse.refreshToken,
            };
        },
      }),
    ],
    pages: {
      signIn: `/auth/sign_in`,
      // error: '/auth/error', //User, component içerisinde `signIn` eventi bind edilmiş olan elemente tıklayınca ve ERROR alınınca, bu routea yönlendirir
      signOut: `/`, //User, component içerisinde `signOut` eventi bind edilmiş olan elemente tıklayınca, bu routea yönlendirir
    },
    callbacks: {
      async signIn(props:any) {        
        return true;
      },
      async jwt(params: any) {
        
        if (params.user) { 
          return { ...params.token, ...params.user };
        }
        return { ...params.token }; //Eğer ilk login değilse sadece `token` propertysini döndürecek
      },
  
      async session(
        props: any //props -> { session, user, token }
      ) {        
        props.session.user = props.token; 
        return props.session;
      },
    },
  };
  export default authOptions;