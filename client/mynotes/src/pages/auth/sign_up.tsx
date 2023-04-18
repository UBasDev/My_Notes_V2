import AuthLayout from "@/Layouts/AuthLayout/AuthLayout";
import Sign_Up_Form from "@/components/sign_up_form/sign_up_form";
import { Grid } from "@mui/material";

const Sign_Up = ():JSX.Element =>{
    return (
        <Grid container>
            <Grid item xs={12}>
                <h2 style={{textAlign:'center'}}>Sign Up</h2>
            </Grid>
            <Grid item xs={12}>
                <Sign_Up_Form/>
            </Grid>
        </Grid>
    )
}
Sign_Up.getLayout = (page:any)=>{
    return <AuthLayout>{page}</AuthLayout>
}
export default Sign_Up