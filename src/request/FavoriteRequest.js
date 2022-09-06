import { ADD_FAVORITE } from "@/api/api_constant";
import request from "@/api/request";

export const addFavorite = async (favoriteRecord) => {
  try {
    return await request.post(ADD_FAVORITE, favoriteRecord);
  } catch (error) {
    return { errMsg: error };
  }
};

export const getFavorites = async (uid) => {
  try {
    return await request.get(ADD_FAVORITE+"?uid="+uid);
  } catch (error) {
    return { errMsg: error };
  }
};

export const getFavoriteCommdityByCId = async (cid,uid) => {
  try {
    return await request.get(ADD_FAVORITE+"?cid="+cid+"&uid="+uid);
  } catch (error) {
    return { errMsg: error };
  }
};

export const deleteFavorite = async (id) => {
  try {
    return await request.delete(ADD_FAVORITE+"/"+id);
  } catch (error) {
    return { errMsg: error };
  }
}
