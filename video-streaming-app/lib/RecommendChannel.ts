import DbConect from "./Dbconnect";
import getUser from "./GetUser";
import UserModel from "@/Model/User.mode";
const RecommendChannel=async()=>{
  try {
    await  DbConect();
  } catch (error:any) {
    throw new Error(error.message)
  }
  const currUser=await getUser();
   
  if(currUser){
    try {
    
      const Users=await UserModel.aggregate(
          [
            {
              $lookup:{
                from:"followers",
                let:{userId:"$_id"},
                pipeline:[
                  {
                    $match:{
                      $expr:{
                        $and:[
                          {$eq:["$followerId",currUser._id]},
                          {$eq:["$ChannelId","$$userId"]}
                        ]
                      }
                    }
                  }
                ],
                as:"isFollowed"
              }
            },
            {
                 $match:{
                  isFollowed:{$size:0},
                  _id: { $ne: currUser._id }
                 }
            },
            {
              $lookup:{
                from:"blockeds",
                let:{userId:"$_id"},
                pipeline:[
                  {
                    $match:{
                      $expr:{
                        $and:[
                          {$eq:["$BlockedUserId",currUser._id]},
                          {$eq:["$BlockerUserId","$$userId"]}
                        ]
                      }
                    }
                  }
                ],
                as:"isblocked"
              }
            },
            {
              $match:{
                isblocked:{$size:0}
              }
            }
             , {
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