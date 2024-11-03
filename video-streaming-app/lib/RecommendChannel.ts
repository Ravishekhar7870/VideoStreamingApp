import DbConect from "./Dbconnect";
import getUser from "./GetUser";
import UserModel from "@/Model/User.mode";
const RecommendChannel=async()=>{
  try {
    await  DbConect();
  } catch (error:any) {
    throw new Error(error.message)
  }
  let currUser;
   try {
    currUser=await getUser();
   } catch (error) {
    currUser=null
   }
   
  if(currUser){
    try {
    
      const Users=await UserModel.aggregate(
          [
            {
              $match: {
                clerkId:{ $ne: currUser.clerkId}
              }
            },
              {
                $sort: {
                  createdAt:1
                }
              }
            ]
      )
      return Users
    } catch (error:any) {
     throw new Error(error.message)
    }
  }
  else{
    try {
    
    
      const Users=await UserModel.aggregate(
          [
              {
                $sort: {
                  createdAt:1
                }
              }
            ]
      )
      return Users
    } catch (error:any) {
     throw new Error(error.message)
    }
  }
  
}
export default RecommendChannel