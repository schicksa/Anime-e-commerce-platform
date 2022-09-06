import { LOGIN } from "@/api/api_constant"
import request from "@/api/request"

export const login = async (email,pwd) => {
    try{
        return await request.get(LOGIN + "?email="+email+"&pwd="+pwd);
    }catch(error){
        return {errMsg:error}        
    }
}
