import DbConect from "@/lib/Dbconnect";
import StreamModel from "@/Model/Stream.model";
export const getUserStream=async(id:string)=>{
  await DbConect();
  try {
    if(!id){
      throw new Error("id can be empty")
    }
    const userstream=await StreamModel.findOne({
      UserId:id
    });
    return userstream
  } catch (error) {
    throw new Error("something went wrong")
  }
}