import { jwtRequest } from "@/api/request" 
import { GEN_TOKEN } from "@/api/api_constant"

export default {
    namespaced:true,
    state:()=>({
        userInfo:{},
        token: localStorage.getItem("xm_one_token") || ""
    }),
    actions:{
        cleanToken(store){
            store.commit("CLEAR_TOKEN")
        },
        setUserInfo(store,user){
            store.commit("SET_USERINFO",user)
        },
        deleteUserInfo(store){
            store.commit("DELETE_USERINFO")
        },
        async genToken(store,user){
            try{
                const r = await jwtRequest.post(GEN_TOKEN,user);
                store.commit("SET_TOKEN",(r).data);
            }catch(error){
                console.log(error);
                return {errMsg:"生成token失败"}
            }
        },
        auth_token_get(store){
             store.commit("AUTH_TOKEN_GET");
             return store.state.token
        }
    },
    mutations:{
        SET_TOKEN(state,token){
             state.token = token;
             localStorage.setItem('xm_one_token', token)
        },
        CLEAR_TOKEN(state){
            state.token = "";
            localStorage.removeItem("xm_one_token","");
        },
        SET_USERINFO(state,user){
            state.userInfo = user;
        },
        DELETE_USERINFO(state){
             state.userInfo = {}
        },
        AUTH_TOKEN_GET(state){
             state.token = localStorage.getItem("xm_one_token") || "";
        }
    }
}