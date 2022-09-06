import { addFavorite , getFavorites , getFavoriteCommdityByCId , deleteFavorite } from "@/request/FavoriteRequest"

export const addFavoriteHook  = async (favoriteRecord) => {
     return await addFavorite(favoriteRecord);
};

export const getFavoritesHook  = async (uid) => {
    return await getFavorites(uid);
};

export const getFavoriteCommdityByCIdHook = async (cid,uid) => {
    return await getFavoriteCommdityByCId(cid,uid);
}

export const deleteFavoriteHook = async (id) => {
    return await deleteFavorite(id);
}