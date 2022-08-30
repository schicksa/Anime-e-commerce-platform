import request from "@/api/request";
import { HOME_CARTOON_LIST } from "@/api/api_constant";

// getAllCartoonList

export const getAllCartoonList = async () => {
    try{
        return await request.get(HOME_CARTOON_LIST);
    }catch(error){
        return {errMsg:error}        
    }
}
