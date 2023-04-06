import Slide from '@mui/material/Slide';
import { useState } from 'react';
import { Alert, Button, Snackbar, SnackbarProps } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'
import { hide_snackbar, remove_snackbar_content_and_type } from '@/redux_stores/snackbar_state';
import { NextPage } from 'next';
import configs from '@/configs';

const anchor_origin: any = {
    vertical: 'top',
    horizontal:'right'
}

const snackbar_configs = configs.snackbar_configs

const Custom_Snackbar:NextPage = ():JSX.Element=>{    
    
    const {is_snackbar_visible, snackbar_content, snackbar_type} = useSelector((state:any) => state.snackbar_state)
    const dispatch = useDispatch()    
  
    const handle_close = (event?: React.SyntheticEvent | Event, reason?: string) => {
    //   if (reason === 'clickaway') {
    //     return;
    //   }
  
      if(is_snackbar_visible){
        dispatch(hide_snackbar())
        setTimeout(()=>{
            dispatch(remove_snackbar_content_and_type())
        },300)
      }
    };
    return (
        <>
      <Snackbar anchorOrigin={anchor_origin} transitionDuration={snackbar_configs.transition_duration} TransitionComponent={Slide} open={is_snackbar_visible} autoHideDuration={snackbar_configs.auto_hide_duration} onClose={handle_close}>
        <Alert onClose={handle_close} severity={snackbar_type || "success"} sx={{ width: '100%' }}>
          {snackbar_content}
        </Alert>
      </Snackbar>            
        </>
    )
}
export default Custom_Snackbar