import { NextPage } from "next";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import MUI_Global_Colors from "@/enums/MUI_global/MUI_global_colors";
import Button_Sizes from "@/enums/button/button_sizes";
import Button_Types from "@/enums/button/button_types";
import MUI_Global_Variants from "@/enums/MUI_global/MUI_global_variants";

interface Button_With_Loading_Props_Type {
  button_color: any;
  button_size:any;
  button_type:any;
  button_content:string;
  button_custom_styles:any;
  button_variant:any;
  is_button_loading_active:boolean;
  circular_size:number;
  circular_color:any;
  
}

const default_button_color: string = MUI_Global_Colors.Primary
const default_button_size:string = Button_Sizes.Medium
const default_button_type:string = Button_Types.Button
const default_button_variant:string = MUI_Global_Variants.Contained
const default_circular_size:number = 20
const default_circular_color:string = MUI_Global_Colors.Inherit
const default_button_content:string = ""

const Button_With_Loading:NextPage & any = (props:Button_With_Loading_Props_Type):JSX.Element=>{      
    return (
        <Button sx={{...props.button_custom_styles}} color={props.button_color ?? default_button_color} size={props.button_size ?? default_button_size} type={props.button_type ?? default_button_type} variant={props.button_variant ?? default_button_variant} endIcon={props.is_button_loading_active ? <CircularProgress size={props.circular_size ?? default_circular_size} color={props.circular_color ?? default_circular_color} /> : <SendIcon />}>
        {props.button_content ?? default_button_content}
      </Button>
    )
}
export default Button_With_Loading