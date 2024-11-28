import DbConect from "@/lib/Dbconnect";
import getUser from "@/lib/GetUser";
import StreamModel, { Stream } from "@/Model/Stream.model";
import { currentUser } from "@clerk/nextjs/server";
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
     return CurrUser;
     
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
export const getStreamFeed=async()=>{
  await DbConect();
  const LoggedinUser=await getUser();
  let streams=[]
  if(LoggedinUser){
     streams=await StreamModel.aggregate(
      [
        {
          $lookup:{
            from:'blockeds',
            let:{streamerUserId:'$UserId'},
            pipeline:[
              {
                $match:{
                  $expr:{
                    $and:[
                      {$eq:['$BlockedUserId',LoggedinUser._id]},
                      {$eq:['$BlockerUserId','$$streamerUserId']}
                    ]
                  }
                }
              }
            ],
            as:'Blocked'

          }
        },
        {
          $match:{
            Blocked:{$size:0},
            UserId: { $ne: LoggedinUser._id }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'UserId',
            foreignField:'_id' ,
            as: 'User'
          }
        },
         {
           $addFields: {
             User:{
               $arrayElemAt:["$User",0]
             }
           }
         },
         {
           $sort: {
             isLive:-1,updatedAt:-1
           }
         },
         {
          $project: {
            ingressId:0,
            serverKey:0,
            serverUrl:0
          }
        }
      ]
     )
  }
  else{
   streams=await StreamModel.aggregate(
    [{
      $lookup: {
        from: 'users',
        localField: 'UserId',
        foreignField:'_id' ,
        as: 'User'
      }
    },
     {
       $addFields: {
         User:{
           $arrayElemAt:["$User",0]
         }
       }
     },
     {
       $sort: {
         isLive:-1,updatedAt:-1
       }
     },
     {
      $project: {
        ingressId:0,
        serverKey:0,
        serverUrl:0
      }
    }
    ]
   )
  }
  return streams
}
export const getSearchedStreams=async(term:string)=>{
  await DbConect();
       let LoggedinUser
       const pattern=new RegExp(term,'i')
       try {
        LoggedinUser=await getUser();
       } catch (error) {
        LoggedinUser=null
       }
       let searchedStreams=[]
       if(LoggedinUser){
         searchedStreams=await StreamModel.aggregate([
          {
            $lookup:{
              from:'blockeds',
              let:{streamerUserId:'$UserId'},
              pipeline:[
                {
                  $match:{
                    $expr:{
                      $and:[
                        {$eq:['$BlockedUserId',LoggedinUser._id]},
                        {$eq:['$BlockerUserId','$$streamerUserId']}
                      ]
                    }
                  }
                }
              ],
              as:'Blocked'
  
            }
          },
          {
            $match:{
              Blocked:{$size:0},
              UserId: { $ne: LoggedinUser._id }
            }
          },
          {
            $lookup:{
             from: 'users',
             localField: 'UserId',
             foreignField:'_id' ,
             as: 'User'
            }
           },
           {
            $addFields: {
              User:{
                $arrayElemAt:["$User",0]
              }
            }
           },
           {
            $match:{
              $or:[
                {name:{ $regex:pattern }},
                {'User.username':{ $regex:pattern}}
              ]
            }
           },
           {
            $project: {
              ingressId:0,
              serverKey:0,
              serverUrl:0
            }
           }
         ])
       }
       else{
         searchedStreams=await StreamModel.aggregate([
             {
              $lookup:{
               from: 'users',
               localField: 'UserId',
               foreignField:'_id' ,
               as: 'User'
              }
             },
             {
              $addFields: {
                User:{
                  $arrayElemAt:["$User",0]
                }
              }
             },
             {
              $match:{
                $or:[
                  {name:{ $regex:pattern }},
                  {'User.username':{ $regex:pattern}}
                ]
              }
             },
             {
              $project: {
                ingressId:0,
                serverKey:0,
                serverUrl:0
              }
             }
         ])
       }
       return searchedStreams;
}