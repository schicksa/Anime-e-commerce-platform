import request from "@/api/request";
import { ADD_COMMDITY,GET_COMMDITY_LIST,DELETE_COMMDITY } from "@/api/api_constant";

export const addCommdity = async (commdity) => {
  try {
    return await request.post(ADD_COMMDITY, commdity);
  } catch (error) {
    return { errMsg: error };
  }
};

export const getCommdityList = async (pageIndex = 1,pageSize = 10,searchType,searchText,sortType,orderType) => {
  try {
    let url = GET_COMMDITY_LIST+"?_page="+pageIndex+"&_limit="+pageSize+"&_sort="+sortType+"&_order="+orderType;
    if(searchText){
      url+="&"+searchType+"_like="+searchText;
    }
    return await request.get(url);
  } catch (error) {
    return { errMsg: error };
  }
};

export const deleteComdity = async (id) => {
    try {
        return await request.delete(DELETE_COMMDITY+"/"+id);
      } catch (error) {
        return { errMsg: error };
      }
}
