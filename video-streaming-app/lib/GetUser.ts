import { currentUser } from "@clerk/nextjs/server";
import DbConect from "./Dbconnect";
import UserModel from "@/Model/User.mode";
const getUser=async()=>{
    
        await DbConect()
       const currUser=await currentUser();
       
       if(!currUser){
          return null;
       }
       const dbUser=await UserModel.findOne({
         clerkId:currUser?.id
       }) 
       if(!dbUser){
        throw new Error("No user found in database")
       }
       return dbUser
    
}
export const getUserbyUsername=async(username:string)=>{
  DbConect();
  const self=await currentUser();
  if(!self){
    throw new Error("not Authorized")
  }
  const user=await UserModel.findOne({
    username:username
  })
  if(!user){
    throw new Error("not Authorized")
  }
  if(user.username!==self.username){
      throw new Error("not Authorized")
  }
  return user;
}
export default getUser
