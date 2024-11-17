import DbConect from "@/lib/Dbconnect";
import getUser from "@/lib/GetUser";
import StreamModel from "@/Model/Stream.model";
import { get } from "http";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();




export const ourFileRouter = {
  thumbnailUploader:f(
    {
      image:{
        maxFileCount:1,
        maxFileSize:'4MB'
      }
    }
  )
  .middleware(async()=>{
      const loggedinUser=await getUser()
      return {user:loggedinUser}
  })
  .onUploadComplete(async({metadata,file})=>{
      //update the stream;
     await  DbConect();
      const getStream=await StreamModel.findOne({
        UserId:metadata?.user?._id
      })
      if(getStream){
        getStream.thumbnail=file.url as string;
        await getStream.save({validateBeforeSave:false})
      }
      return {fileUrl:file.url}
      
  })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
