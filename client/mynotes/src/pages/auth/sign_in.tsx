import AuthLayout from "@/Layouts/AuthLayout/AuthLayout"
import { show_snackbar } from "@/redux_stores/snackbar_state";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import snackbar_severity_enums from '@/enums/snackbar_severity_enums';
import { NextPage } from "next";
import {Component_page_with_layout_type} from '@/interfaces';
import Sign_In_Form from "@/components/sign_in_form/sign_in_form"
import { Grid } from "@mui/material";

const SignInComponent: Component_page_with_layout_type = ():JSX.Element =>{
    return (
            <Grid container>
                <Grid item xs={12}>
                    <h2 style={{textAlign:'center'}}>Login</h2>
                </Grid>
                <Grid item xs={12}>
                <Sign_In_Form/>
                </Grid>
            </Grid>            
    )
}
SignInComponent.getLayout = (page:any)=>{
    return <AuthLayout>{page}</AuthLayout>
}
export default SignInComponent