import DbConect from "@/lib/Dbconnect";
import getUser from "@/lib/GetUser";
import StreamModel, { Stream } from "@/Model/Stream.model";
import { revalidatePath } from "next/cache";
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
export const UpdateUserStrean=async(values:Partial<Stream>)=>{
    await DbConect();
   try {
     const CurrUser=await getUser();
     if(!CurrUser){
        throw new Error("Not Authorized")
     }
     const userStream=await StreamModel.findOne({
        UserId:CurrUser._id
     })
     if(!userStream){
        throw new Error("can not find the user Stream")
     }
     const validData={
       name:values.name,
       isChatEnabled:values.isChatEnabled,
       isChatSlowed:values.isChatSlowed,
       isChatFollowerOnly:values.isChatFollowerOnly,
     }
     userStream.isChatEnabled=validData.isChatEnabled;
     userStream.isChatSlowed=validData.isChatSlowed;
     userStream.isChatFollowerOnly=validData.isChatFollowerOnly;
     await userStream.save({validateBeforeSave:false})
     revalidatePath(`/${CurrUser.username}`);
     revalidatePath(`/user/${CurrUser.username}`)
     revalidatePath(`/user/${CurrUser.username}/Chat`)
   } catch (error) {
    throw new Error("something went wrong")
   }
}