import { jwtRequest } from "@/api/request";
import { AUTH } from "@/api/api_constant"

export const authHook = async (token) => {
     if(!token){
         return {
             errMsg:"token missed",
             code:-1
         }
     }
     return  await jwtRequest.post(AUTH,{},{
        headers:{
            token
        }
    });;
}