import { Box } from "@mui/material";
import { NextPage } from "next";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Border_Linear_Progress from "./border_linear_progress";

const Custom_Progress_Page_Transition : NextPage = ():JSX.Element & any=>{
  const [isProgressVisible, setIsProgressVisible] = useState<boolean>(false)  
  const router = useRouter();
    useEffect(()=>{
      router.events.on('routeChangeStart', handleRouteChangeStart)
      router.events.on('routeChangeComplete', handleRouteChangeComplete)
      router.events.on('routeChangeError', handleRouteChangeError)
      return ()=>{
        router.events.off('routeChangeStart', handleRouteChangeStart)
        router.events.off('routeChangeComplete', handleRouteChangeComplete)
        router.events.off('routeChangeError', handleRouteChangeError)
      }
    },[])
    const handleRouteChangeStart = (url:string)=>{
      setIsProgressVisible(true)
    }
    const handleRouteChangeComplete = (url:string)=>{
      setIsProgressVisible(false)
    }
    const handleRouteChangeError = (error:any)=>{
      console.log('An error occurred while page transition', error)
      setIsProgressVisible(false)
    }    
  if(isProgressVisible){
    return <div>
        <Box>
        <Border_Linear_Progress/>
        </Box>
    </div>
  }
}
export default Custom_Progress_Page_Transition