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
    
     if (validData.isChatEnabled !== undefined) {
        userStream.isChatEnabled = validData.isChatEnabled;
      }
      
      if (validData.isChatSlowed !== undefined) {
        userStream.isChatSlowed = validData.isChatSlowed;
      }
      
      if (validData.isChatFollowerOnly !== undefined) {
        userStream.isChatFollowerOnly = validData.isChatFollowerOnly;
      }
      if(validData.name){
        userStream.name=validData.name
      }
     await userStream.save({validateBeforeSave:false})
     revalidatePath(`/${CurrUser.username}`);
     revalidatePath(`/user/${CurrUser.username}`)
     revalidatePath(`/user/${CurrUser.username}/Chat`)
   } catch (error) {
    throw new Error("something went wrong")
   }
}
export const RemoveThumbnail=async()=>{
    await DbConect()
    try {
      const LoggedinUser=await getUser()
      if(!LoggedinUser){
        throw new Error("not Authorizes")
      }
      const getStream=await StreamModel.findOne({
        UserId:LoggedinUser._id
      })
      if(!getStream){
        throw new Error("No Stream found")
      }
      getStream.thumbnail="";
      await getStream.save({validateBeforeSave:false})
      return LoggedinUser.username
    } catch (error) {
      throw new Error('Something went wrong')
    }
}