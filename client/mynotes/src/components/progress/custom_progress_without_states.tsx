import { Box } from "@mui/material";
import { NextPage } from "next";
import Border_Linear_Progress from "./border_linear_progress";

const Custom_Progress_Without_States:NextPage = ():JSX.Element=>{
    return (
        <div>
        <Box>
        <Border_Linear_Progress/>
        </Box>
    </div>
    )
}
export default Custom_Progress_Without_States