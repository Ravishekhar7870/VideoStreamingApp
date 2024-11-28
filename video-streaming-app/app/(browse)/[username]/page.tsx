import { FollowerCount, isfollowing } from '@/Controllers/Follower.controller';
import { getReqUser } from '@/Controllers/User.controller';
import { notFound } from 'next/navigation';
import React from 'react'

import { isBlockedByUser, } from '@/Controllers/Blocked.controller';
import { getUserStream } from '@/Controllers/Stream.controller';
import StreamPlayer from '@/app/(StreamPlayer)/StreamPlayer';


interface UserPageProps{
    params:{
        username:string;
    }
}
async function UserPage({params}:UserPageProps) {
  const user= await getReqUser(params.username)
  if(!user ){
    notFound();
  }
  const stream=await getUserStream(user._id)
  if(!stream){
    notFound();
  }
  let isfollowingUser=await isfollowing(user._id);
  if(isfollowingUser===undefined){
    isfollowingUser=false;
  }
  const isblockedByUser=await isBlockedByUser(user._id);
  const getFollowerCount=await FollowerCount(user._id);
  const followercount= getFollowerCount.length===0 ? 0:getFollowerCount[0].FollowerCount;
  if(isblockedByUser){
    notFound();
  }
  return (
    <StreamPlayer user={user} isFollowing={isfollowingUser} stream={stream} getFollowerCount={followercount} />
      
  )
}

export default UserPage