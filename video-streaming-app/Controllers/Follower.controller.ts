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
   if(id===currUser._id){
    return true;
   }
   try {
      const otherUser=await UserModel.findById(id);
      if(!otherUser){
        throw new Error("user doesn't exist")
      }
      const following=await FollowerModel.findOne({
        follower:currUser._id,
        Channel:otherUser?._id,
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
