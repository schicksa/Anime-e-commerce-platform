import axios from "axios"
import { BASE_URL,TIMEOUT , JWT_VALIDATE_URL} from "./api_constant";

import nprogress from "nprogress"

const request = axios.create({
    baseURL:BASE_URL,
    timeout:TIMEOUT
})

export const jwtRequest = axios.create({
    baseURL:JWT_VALIDATE_URL,
    timeout:TIMEOUT
})

request.interceptors.request.use((config)=>{
    nprogress.start();
    return config;
});

request.interceptors.response.use((res)=>{
    nprogress.done();
    return res;
},(error)=>{
    return Promise.reject(new Error("response fail ...."))
})

export default request;