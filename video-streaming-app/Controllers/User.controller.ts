import UserModel from "@/Model/User.mode";
import DbConect from "@/lib/Dbconnect";
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