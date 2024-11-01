import DbConect from "./Dbconnect";
import getUser from "./GetUser";
import UserModel from "@/Model/User.mode";
const RecommendChannel=async()=>{
   try {
    await  DbConect();
   
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
export default RecommendChannel