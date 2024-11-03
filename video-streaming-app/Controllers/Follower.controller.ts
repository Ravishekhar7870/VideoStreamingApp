import DbConect from "@/lib/Dbconnect";
import getUser from "@/lib/GetUser";
import FollowerModel from "@/Model/Follower.model";
import UserModel from "@/Model/User.mode";
import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";
export const isfollowing=async(id:string)=>{
    if(!id){
        return;
    }
   await DbConect();
   const currUser=await getUser();
   
   if (id.toString() === currUser._id.toString()) {
    return true;
}
   try {
      const otherUser=await UserModel.findById(id);
      if(!otherUser){
        throw new Error("user doesn't exist")
      }
      const following=await FollowerModel.findOne({
        followerId:currUser._id,
        ChannelId:otherUser?._id,
      });
      if(following){
        return true;
      }
      else{
        return false;
      }
   } catch (error:any) {
    
    throw new Error(error.message)
   }
}
export const follow=async(id:string)=>{
    await DbConect();
    const currUser=await getUser();
    if(!currUser){
        return;
    }
    try {
        const OtherUser=await UserModel.findById(id);
        if(!OtherUser){
            throw new Error("couldn't find the user")
        }
        const isfollower=await FollowerModel.findOne({
             followerId:currUser._id,
             ChannelId:OtherUser._id
        });
        if(isfollower){
            throw new Error("already following")
        }
        const newFollowing=await FollowerModel.create({
            followerId:currUser._id,
            ChannelId:OtherUser._id,
        })
        if(newFollowing){
            return newFollowing
        }
    } catch (error:any) {
        throw new Error(error.message)
    }
}
