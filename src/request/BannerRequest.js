import request from "@/api/request";
import { BANNERS } from "@/api/api_constant";

// get all lists

export const getAllBanner = async () => {
    try{
        return await request.get(BANNERS);
    }catch(error){
        return {errMsg:error}        
    }
}
