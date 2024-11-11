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
   if(!currUser){
    return;
   }
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
export const unfollowUser=async(id:string)=>{
   await DbConect();
   const currUser=await getUser();
  if(!currUser){
    return;
  }
   if (id.toString() === currUser._id.toString()) {
     throw new Error("cannot unfollow yourself")
}
   try {
     const otherUser=await UserModel.findById(id);
     if(!otherUser){
        throw new Error("Couldn't find User")
     }
     const deletedFollow=await FollowerModel.findOneAndDelete({
        followerId:currUser?._id,
        ChannelId:otherUser?._id
     })
    return deletedFollow
   } catch (error:any) {
    throw new Error(error.message)
   }
}
export const getFollowedChannel=async()=>{
   await DbConect();
   const currUser=await getUser();
   if(!currUser){
    return [];
   }
   try {
    const FollowedChannel=await FollowerModel.aggregate([
          
            {
              $lookup:{
                from:"blockeds",
                let:{userId:"$ChannelId"},
                pipeline:[
                  {
                    $match:{
                      $expr:{
                        $and:[
                          {$eq:["$BlockedUserId",currUser._id]},
                          {$eq:["$BlockerUserId","$$userId"]}
                        ]
                      }
                    }
                  }
                ],
                as:"isblocked"
              }
            },
            {
              $match:{
                isblocked:{$size:0}
              }
            },
          {
           $match:{
             followerId:currUser._id
           }
          }
          ,
          {
          $lookup: {
           from: "users",
           localField:"ChannelId",
           foreignField:"_id",
           as: "Channel"
         }
       },
       {
         $addFields: {
           Channel:{
             $arrayElemAt:["$Channel",0]
           }
         }
       },
       {
        $project: {
          Channel:1
       }
      },
      {
        $lookup: {
          from: 'streams',
          localField: 'Channel._id',
          foreignField:'UserId',
          as: 'stream'
        }
     },
     {
       $addFields: {
         stream: {
           $arrayElemAt:['$stream',0]
         }
       }
     },
     {
       $project:{
        Channel:1,
        stream:{
          isLive:1
        }
       }
     }
    ])
    return FollowedChannel
   } catch (error) {
    throw new Error("Something went wrong")
   }
}
