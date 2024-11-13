import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { getReqUser } from '@/Controllers/User.controller';
import StreamModel from '@/Model/Stream.model';
import StreamPlayer from '@/app/(StreamPlayer)/StreamPlayer';
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
  return (
    <div className='h-full'>
       <StreamPlayer user={reqUser} stream={getstream} isFollowing={true}/>
    </div>
  )
}

export default page