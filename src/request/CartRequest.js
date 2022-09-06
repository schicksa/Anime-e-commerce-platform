import {ADD_CART} from "@/api/api_constant"
import request from "@/api/request"

// ADD_CART: The ADD_CART here is the api of JSONSERVER that follows the restful style,
// so different request methods can be used to achieve different effects

export const addCart = async (cart) => {
    try{
        return await request.post(ADD_CART,cart);
    }catch(error){
        return {errMsg:error}        
    }
}


export const getCarts = async (uid) => {
    try{
        return await request.get(ADD_CART+"?uid="+uid);
    }catch(error){
        return {errMsg:error}        
    }
}

export const deleteCart = async (id) => {
    try{
        // JSONSERVER requires an ID to be deleted, so the deletion of the database here will not be done,
        // just deleted in memory
       if(id){
        return await request.delete(ADD_CART+"/" + id);
       } 
    }catch(error){
        return {errMsg:error}        
    }
}

export const updateCartNumber = async (cart) => {
    try{
        await deleteCart(cart.id); 
        // JSONSERVER requires an ID to be deleted, so the deletion of the database here will not be done, just deleted in memory
        await addCart(cart);
    }catch(error){
        return {errMsg:error}        
    }
}