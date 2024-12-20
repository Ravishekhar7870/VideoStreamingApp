'use server'

import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";
import getUser from "@/lib/GetUser";
import UserModel from "@/Model/User.mode";
import { isBlockedByUser } from "@/Controllers/Blocked.controller";
export const CreateViewerToken=async(HostId:string)=>{
   let currentUser= await getUser();
   let LoggedinUser
   if(currentUser){
    LoggedinUser=currentUser
   }
   else{
    const id=v4();
    const username=`guesUser#${Math.floor(Math.random()*10000)}`
     LoggedinUser={_id:id,username:username}
   }
   const host=await UserModel.findById(HostId);
   if (!host){
    throw new Error("Something went wrong")
   }
   const isBlocked=await isBlockedByUser(host._id)
   if(isBlocked){
    throw new Error("Streamer has Blocked you")
   }
   const isHost=JSON.stringify(LoggedinUser._id)===JSON.stringify(host._id)
   
   
   const token=new AccessToken(process.env.LIVEKIT_API_KEY,process.env.LIVEKIT_SECRET_KEY
    ,{
        identity: isHost ? `self${String(LoggedinUser._id)}` : String(LoggedinUser._id),
        name:LoggedinUser.username
    }
   )
   token.addGrant({
     room:JSON.stringify(host._id),
     roomJoin:true,
     canPublish:false,
     canPublishData:true

   })
   return await Promise.resolve(token.toJwt())

}