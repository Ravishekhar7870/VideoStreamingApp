import DbConect from "@/lib/Dbconnect";
import getUser from "@/lib/GetUser";
import BlockedModel from "@/Model/Blocked.model";
import UserModel from "@/Model/User.mode";
export const isBlockedByUser=async(id:string)=>{
   await DbConect();
   try {
    if(!id){
     throw new Error("id can't be empty")
    }
    const UserTobeChecked=await UserModel.findById(id);
    if(!UserTobeChecked){
     throw new Error("user doesn't exist")
    }

    const LoggedinUser=await getUser();
    if(LoggedinUser?._id===UserTobeChecked._id){
        return  false;
    }
    const blockedRelation=await BlockedModel.findOne({
       BlockedUserId:LoggedinUser?._id,
       BlockerUserId:UserTobeChecked?._id
    })
    if(!blockedRelation){
     return false;
    }
    return true;
   } catch (error) {
    return false;
   }
}
export const BlockUser=async(id:string)=>{
   await DbConect();
   try {
     const LoggedinUser=await getUser();
     if(!LoggedinUser){
        throw new Error("Not Authorized")
     }
     const UsertoBeBlocked=await UserModel.findById(id);
     if(!UsertoBeBlocked){
        throw new Error("user that you want to block doesn't exist")
     }
     if(UsertoBeBlocked._id===LoggedinUser?._id){
        throw new Error("you can't block ourself")
     }
     const blockedRelation=await BlockedModel.create({
        BlockedUserId:UsertoBeBlocked._id,
        BlockerUserId:LoggedinUser?._id
     })
     return blockedRelation
   } catch (error) {
    throw new Error("something went wrong")
   }
}
export const UnBlockUser=async(id:string)=>{
   await DbConect();
   try {
    const LoggedinUser=await getUser();
    if(!LoggedinUser){
        throw new Error("Not Authorized")
    }
    const UsertoBeUnBlocked=await UserModel.findById(id);
    if(!UsertoBeUnBlocked){
        throw new Error("User doesn't exist")
    }
    const getunblockedRelation=await BlockedModel.findOneAndDelete({
         BlockedUserId:UsertoBeUnBlocked._id,
         BlockerUserId:LoggedinUser._id
    })
    return getunblockedRelation
   } catch (error) {
    throw new Error("something went wrong")
   }
}