'use server'

import { BlockUser, UnBlockUser } from "@/Controllers/Blocked.controller";
import UserModel from "@/Model/User.mode";
import { revalidatePath } from "next/cache";

export const BlockUserAction=async(id:string)=>{
    try {
        if(!id){
            return;
        }
        const blockUser=await BlockUser(id)
        console.log(blockUser);
        revalidatePath('/')
        if(blockUser){
            const getUser=await UserModel.findById(blockUser.BlockedUserId)
            
            revalidatePath(`/${getUser?.username}`)
            return getUser?.username
        }
    } catch (error:any) {
        throw new Error(error.message)
    }
    
}
export const UnBlockUserAction=async(id:string)=>{
  try {
    const unblockResult=await UnBlockUser(id);
    revalidatePath('/')
    if(unblockResult){
        const getUser=await UserModel.findById(unblockResult.BlockedUserId)
        revalidatePath(`/${getUser?.username}`)
        return getUser?.username
    }
  } catch (error) {
    throw new Error("something went wrong")
  }
}
