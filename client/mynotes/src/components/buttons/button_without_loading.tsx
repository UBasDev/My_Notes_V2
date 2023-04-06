import MUI_Global_Colors from "@/enums/MUI_global/MUI_global_colors"
import MUI_Global_Variants from "@/enums/MUI_global/MUI_global_variants"
import Button_Sizes from "@/enums/button/button_sizes"
import Button_Types from "@/enums/button/button_types"
import { Button } from "@mui/material"
import { NextPage } from "next"

interface Button_With_Loading_Props_Type {
    button_color: any;
    button_size:any;
    button_type:any;
    button_content:string;
    button_custom_styles:any;
    button_variant:any;    
    button_end_icon:any;
  }

const default_button_color: string = MUI_Global_Colors.Primary
const default_button_size:string = Button_Sizes.Medium
const default_button_type:string = Button_Types.Button
const default_button_variant:string = MUI_Global_Variants.Contained
const default_button_content:string = ""
const default_button_end_icon:any = null

const Button_Without_Loading:NextPage & any = (props:any):JSX.Element=>{      
    return (
        <Button sx={{...props.button_custom_styles}} color={props.button_color ?? default_button_color} size={props.button_size ?? default_button_size} type={props.button_type ?? default_button_type} variant={props.button_variant ?? default_button_variant} endIcon={props.button_end_icon ?? default_button_end_icon}>
        {props.button_content ?? default_button_content}
      </Button>
    )
}
export default Button_Without_Loading