export interface Register_Request_Dto{
    email:string;
    password:string;
    phone:string;
}
export interface Register_Response_Dto{
    message:string;
    status:number;
}
export interface Authenticated_Routes{
    path:string;
    role:string;
}