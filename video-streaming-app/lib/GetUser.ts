import { currentUser } from "@clerk/nextjs/server";
import DbConect from "./Dbconnect";
import UserModel from "@/Model/User.mode";
const getUser=async()=>{
    try {
        await DbConect()
       const currUser=await currentUser();
       
       if(!currUser){
        throw new Error("No user is currently logged in")
       }
       const dbUser=await UserModel.findOne({
         clerkId:currUser?.id
       }) 
       if(!dbUser){
        throw new Error("No user found in database")
       }
       return dbUser
    } catch (error:any) {
        throw new Error(error.message)
    }
}
export default getUser