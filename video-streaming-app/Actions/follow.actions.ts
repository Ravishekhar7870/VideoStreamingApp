'use server'

import { follow } from "@/Controllers/Follower.controller"
import { revalidatePath } from "next/cache"
import UserModel from "@/Model/User.mode"
export const followUser=async(id:string)=>{
   try {
   const following= await follow(id);
    revalidatePath('/')
    
    if(following){
        const followedUser=await UserModel.findById(following?.ChannelId)
        revalidatePath(`/${followedUser?.username}`)
        return followedUser?.username;
        
    }
   
   } catch (error:any) {
    throw new Error(error.message)
   }
}