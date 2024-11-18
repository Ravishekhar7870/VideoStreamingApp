'use server'

import { updateUserbio } from "@/Controllers/User.controller"
import { revalidatePath } from "next/cache";

export const updateUserbioAction=async(bio:string)=>{
    try {
        const user=await updateUserbio(bio);
        if(user){
            revalidatePath(`/user/${user.username}`)
            revalidatePath(`/${user.username}`)
        }
    } catch (error) {
        throw new Error("something went wrong")
    }
}