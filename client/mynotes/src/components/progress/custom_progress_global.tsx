import { Box } from "@mui/material";
import { NextPage } from "next";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Border_Linear_Progress from "./border_linear_progress";
import { useSelector } from "react-redux";

const Custom_Progress_Global : NextPage = ():JSX.Element & any=>{
  const {is_progress_visible} = useSelector((state:any) => state.progress_state)
  
  if(is_progress_visible){
    return <div>
        <Box>
        <Border_Linear_Progress/>
        </Box>
    </div>
  }
}
export default Custom_Progress_Global