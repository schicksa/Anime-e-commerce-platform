import {addCommdity,getCommdityList,deleteComdity} from "@/request/CommdityRequest"

export const addCommdityHook = async (commdity) => {
    return await addCommdity(commdity);
}

export const getCommdityListHook = async (pageIndex,pageSize,searchType,searchText,sortType,orderType) => {
    return await getCommdityList(pageIndex,pageSize,searchType,searchText,sortType,orderType);
}

export const getCommdityIds = (commdity) => {
    const ids = [];
    commdity.forEach(commdity => {
        ids.push({title:commdity.title,id:commdity.id});
    });
    return ids;
}

export const deleteCommdityHook = async (id) => {
    return await deleteComdity(id);
}