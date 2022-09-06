import {COMMDITY_BY_ID} from "@/api/api_constant"
import request from "@/api/request";

export const commdityById = async (id) => {
    try{
        return await request.get(COMMDITY_BY_ID + "?id=" + id);
    }catch(error){
        return {errMsg:error}        
    }
}
