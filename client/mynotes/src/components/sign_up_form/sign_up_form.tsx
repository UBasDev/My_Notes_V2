import { NextPage } from "next";
import { yupResolver } from "@hookform/resolvers/yup";
import { Sign_Up_Validation_Scheme } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Button_With_Loading from "../buttons/button_with_loading";
import MUI_Global_Variants from "@/enums/MUI_global/MUI_global_variants";
import Button_Types from "@/enums/button/button_types";
import Button_Sizes from "@/enums/button/button_sizes";
import MUI_Global_Colors from "@/enums/MUI_global/MUI_global_colors";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./sign_up_form.module.css"
import {Register_Service} from "@/services/auth";
import { Register_Request_Dto, Register_Response_Dto } from "@/interfaces/auth";

const Sign_Up_Form: NextPage = (): JSX.Element => {
  const [isButtonLoadingActive, setIsButtonLoadingActive] =
    useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { register, handleSubmit, watch, formState, setValue }: any = useForm({
    resolver: yupResolver(Sign_Up_Validation_Scheme),
    defaultValues: {
      email: "",
      password: "",
      phone: "",
    },
  });
  const handleFormSubmit = async (data: Register_Request_Dto, event: any): Promise<void> => {
    //event.preventDefault();
    const response_from_api:Register_Response_Dto = await Register_Service(data)
    if(response_from_api.status != 200) alert(response_from_api.message)
    console.log('DATA',data);
  };
  const Sign_In_Form_Inputs = [
    {
      id: 1,
      key: "email",
      value: "email",
      element_id: "sign_up_email_input",
      placeholder: "Your email",
      default_value: "",
      label_value: "Email",
      input_type: "text",
      icon: (
        <IconButton tabIndex={-1} aria-label="email section" edge="end">
          <AccountCircleIcon />
        </IconButton>
      ),
    },
    {
      id: 2,
      key: "password",
      value: "password",
      element_id: "sign_up_password_input",
      placeholder: "Your password",
      default_value: "",
      label_value: "Password",
      input_type: showPassword ? "text" : "password",
      icon: (
        <IconButton
          tabIndex={-1}
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      ),
    },
    // {
    //   id: 3,
    //   key: "phone",
    //   value: "phone",
    //   element_id: "sign_up_phone_input",
    //   placeholder: "Your phone",
    //   default_value: "",
    //   label_value: "Phone",
    //   input_type: "text",
    //   icon: (
    //     <IconButton tabIndex={-1} aria-label="email section" edge="end">
    //       <AccountCircleIcon />
    //     </IconButton>
    //   ),
    // },
  ];
  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit as any)}>
        <Grid
          paddingY={2}
          paddingX={1}
          container
          justifyContent={"center"}
          alignItems={"center"}
          spacing={5}
        >
          {Sign_In_Form_Inputs.map((form_input, index) => (
            <Grid item xs={12} lg={11} key={form_input.id}>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor={form_input.element_id}>
                  {form_input.label_value}
                </InputLabel>
                <OutlinedInput
                  type={form_input.input_type}
                  autoFocus={form_input.id === 1 ? true : false}
                  fullWidth
                  {...register(form_input.value, {})}
                  placeholder={form_input.placeholder}
                  defaultValue={form_input.default_value}
                  id={form_input.element_id}
                  endAdornment={
                    <InputAdornment tabIndex={-1} position="end">
                      {form_input.icon}
                    </InputAdornment>
                  }
                  label={form_input.label_value}
                />
              </FormControl>
              <p
                style={{
                  color: "red",
                  fontWeight: "600",
                  padding: "0.2rem 1rem",
                }}
              >
                {formState.errors?.[form_input.key]?.message ?? ""}
              </p>
            </Grid>
          ))}
          <Grid item xs={10} lg={6}>
            <PhoneInput              
              inputStyle={{width: "100%"}}
              inputProps={{
                name: 'phone',                
              }}
              country={"tr"}
              preferredCountries={["tr","us"]}
              disableCountryCode={false}
              enableSearch={true}
              autoFormat={true}    
              copyNumbersOnly={true}
              jumpCursorToEnd={true}
              masks={{tr: '(...) ...-..-..'}}          
              value=""
              onChange={(value:string, data:any) => {                
                setValue('phone', value.slice(data?.dialCode?.length))
              }}              
            />
            <p
                style={{
                  color: "red",
                  fontWeight: "600",
                  padding: "0.2rem 1rem",
                }}
              >
                {formState.errors?.phone?.message ?? ""}
              </p>
          </Grid>
          <Grid
            item
            xs={12}
            lg={11}
            alignItems={"center"}
            justifyContent={"center"}
            textAlign={"center"}
          >            
            <Button_With_Loading
              is_button_loading_active={isButtonLoadingActive}
              button_variant={MUI_Global_Variants.Contained}
              button_type={Button_Types.Submit}
              button_size={Button_Sizes.Large}
              button_content={"Send"}
              button_color={MUI_Global_Colors.Primary}
              circular_size={20}
              circular_color={MUI_Global_Colors.Inherit}
            />
          </Grid>          
        </Grid>
      </form>
    </>
  );
};
export default Sign_Up_Form;
