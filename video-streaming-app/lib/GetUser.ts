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
export default getUser