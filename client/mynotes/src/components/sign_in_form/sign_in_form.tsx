import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { SignInFormItems } from "@/interfaces";
import { signIn } from "next-auth/react";
import { show_snackbar } from "@/redux_stores/snackbar_state";
import Snackbar_Severity_Enums from "@/enums/snackbar_severity_enums";
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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { yupResolver } from "@hookform/resolvers/yup";
import Button_With_Loading from "@/components/buttons/button_with_loading";
import Button_Sizes from "@/enums/button/button_sizes";
import { useState } from "react";
import MUI_Global_Colors from "@/enums/MUI_global/MUI_global_colors";
import MUI_Global_Variants from "@/enums/MUI_global/MUI_global_variants";
import Button_Types from "@/enums/button/button_types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Sign_In_Validation_Scheme } from "@/lib/validations";
//import {Sign_In_Validation_Scheme} from "@/lib/validations";

const Sign_In_Form: NextPage = (): JSX.Element => {
  const [isButtonLoadingActive, setIsButtonLoadingActive] =
    useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const dispatch = useDispatch();
  const { is_snackbar_visible } = useSelector(
    (state: any) => state.snackbar_state
  );
  const { register, handleSubmit, watch, formState }: any = useForm({
    resolver: yupResolver(Sign_In_Validation_Scheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleFormSubmit = async (
    data: SignInFormItems,
    event: any
  ): Promise<void> => {
    setIsButtonLoadingActive(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.ok) window.location.replace(window.location.origin);
    else {
      if (!is_snackbar_visible) {
        dispatch(
          show_snackbar({
            snackbar_content: res?.error,
            snackbar_type: Snackbar_Severity_Enums.Error,
          })
        );
      }
    }
    setIsButtonLoadingActive(false);
  };

  const Sign_In_Form_Inputs = [
    {
      id: 1,
      key: "email",
      value: "email",
      element_id: "login_email_input",
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
      element_id: "login_password_input",
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
  ];

  return (
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
              <InputLabel htmlFor={form_input.element_id}>{form_input.label_value}</InputLabel>
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
  );
};
export default Sign_In_Form;
