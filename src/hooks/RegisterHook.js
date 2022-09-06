import { registerUser , checkUserIsExists } from "@/request/RegisterRequest"

export const registerUserHook = async (user) => {
    return await registerUser(user);
} 

export const checkUserIsExistsHook = async (email) => {
    return await checkUserIsExists(email);
}