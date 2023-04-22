import constants from "@/constants";
import * as yup from "yup";

export const Sign_Up_Validation_Scheme:any = yup
  .object({
    email: yup.string().required("Email is required").matches(constants.email_regexp, "Email adress is not valid"),
    password: yup.string().required("Password is required").matches(constants.password_regexp, "Must Contain 10-16 Characters, One Uppercase, One Number, One Special Case Character and musn't contain any whitespaces"),
    phone: yup.string().required("Phone is required").test({
      test(value, ctx){
        if(value.length<5){
          return ctx.createError({ message: "Phone number is not valid" })
        }
      }
    }),
  })
  .required();