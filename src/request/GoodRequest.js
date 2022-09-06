import request from "@/api/request";
import { GOODS_CATEGORY_API } from "@/api/api_constant";

// Get a list of all goods

export const getAllCateGory = async () => {
    try{
        return await request.get(GOODS_CATEGORY_API);
    }catch(error){
        return {errMsg:error}        
    }
}
