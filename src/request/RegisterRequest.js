import { REGISTER_USER } from "@/api/api_constant"
import request from "@/api/request"

export const registerUser = async (user) => {
    try{
        return await request.post(REGISTER_USER,user);
    }catch(error){
        return {errMsg:error}        
    }
}

export const checkUserIsExists = async (email) => {
    try{
        return await request.get(REGISTER_USER+"?email="+email);
    }catch(error){
        return {errMsg:error}        
    }
}