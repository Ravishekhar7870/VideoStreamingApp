'use server'

import { BlockUser, UnBlockUser } from "@/Controllers/Blocked.controller";
import getUser from "@/lib/GetUser";
import UserModel from "@/Model/User.mode";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService=new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!,
)
export const BlockUserAction=async(id:string)=>{
    
        if(!id){
            return;
        }
        const loggedinUser=await getUser();
        if(!loggedinUser){
          throw new Error("Not Authorized")
        }
        let blockUser;
       try {
         blockUser=await BlockUser(id)
       } catch (error) {
        //guest user
       }
        roomService.removeParticipant(JSON.stringify(loggedinUser._id),id)
       
        revalidatePath(`/user/${loggedinUser.username}/community`);
        revalidatePath(`/${loggedinUser.username}`)
       
     
    
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
