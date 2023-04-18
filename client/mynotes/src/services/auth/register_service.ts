import {Register_Request_Dto, Register_Response_Dto} from "@/interfaces/auth/index"
import axiosInstances from "@/lib/axios/axiosInstances"

export const Register_Service = async (request_body:Register_Request_Dto):Promise<Register_Response_Dto>=>{    
    let response_message =""
    let response_status = 0    
    await axiosInstances.axiosCommonInstance.post("/auth/register",{
        ...request_body
    }).then((response)=>{        
        response_message = response.data ?? ""
        response_status = response.status ?? 0
    }).catch((error:any)=>{        
        console.log(error)        
        response_message = error?.response?.data?.Message ?? ""
        response_status = error?.response?.data?.StatusCode ?? 0
    })
    const response:Register_Response_Dto = {
        message: response_message,
        status: response_status
    }
    return response
}