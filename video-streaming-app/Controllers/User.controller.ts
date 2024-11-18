import UserModel from "@/Model/User.mode";
import DbConect from "@/lib/Dbconnect";
import getUser from "@/lib/GetUser";
export const getReqUser=async(username:string)=>{
    if(!username){
        return;
      }
  await DbConect();
  
  try {
    const reqUser=await UserModel.findOne({
        username:username
    })
    return reqUser
  } catch (error) {
    return null
  }
}
export const updateUserbio=async(bio:string)=>{
   DbConect();
   try {
    const user=await getUser();
    if(!user){
      throw new Error("not Authorized")
    }
    user.bio=bio;
    await user.save({validateBeforeSave:false})
    return user;
   } catch (error) {
    throw new Error("something went wrong")
   }
}