import { login } from "@/request/LoginRequest"

export const loginHook = async (email,pwd) => {
    return await login(email,pwd);
} 
