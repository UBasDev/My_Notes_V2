import * as yup from "yup";

export const Sign_In_Validation_Scheme:any = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();