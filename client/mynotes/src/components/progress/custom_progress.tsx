import { Box } from "@mui/material";
import { NextPage } from "next";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BorderLinearProgress = styled(LinearProgress)(({ theme }:any) => ({
    zIndex: 999,
    position: "fixed",
    left: 0,
  right: 0,
    bottom: 0,
    height: 5,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

const Custom_Progress : NextPage = ():JSX.Element & any=>{
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
        <BorderLinearProgress/>
        </Box>
    </div>
  }
}
export default Custom_Progress