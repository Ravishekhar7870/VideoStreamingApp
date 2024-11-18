import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { getReqUser } from '@/Controllers/User.controller';
import StreamModel from '@/Model/Stream.model';
import StreamPlayer from '@/app/(StreamPlayer)/StreamPlayer';
import { FollowerCount } from '@/Controllers/Follower.controller';
interface PageProps{
  params:{
    username:string
  }
}
async function page({params}:PageProps) {
  const loggedinUser=await currentUser();
  const reqUser=await getReqUser(params.username)
  if(!reqUser || !loggedinUser || reqUser.clerkId!==loggedinUser.id){
    throw new Error("Not Authorized")
  }
  const getstream=await StreamModel.findOne({
    UserId:reqUser._id
  })
  if(!getstream){
    throw new Error("no Stream found")
  }
  const getFollowerCount=await FollowerCount(reqUser._id);
  const followercount= getFollowerCount.length===0 ? 0:getFollowerCount[0].FollowerCount;
  
  return (
    <div className='h-full'>
       <StreamPlayer user={reqUser} stream={getstream} isFollowing={true} getFollowerCount={followercount}/>
    </div>
  )
}

export default page