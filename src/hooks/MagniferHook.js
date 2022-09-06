import { commdityById } from "@/request/MagniferRequest"

export const commdityByIdHook = async (id) => {
    return await commdityById(id);
}