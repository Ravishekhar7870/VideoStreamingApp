
import { getUserStream } from '@/Controllers/Stream.controller';
import getUser from '@/lib/GetUser'
import React from 'react'
import ToggleCard from './_components/ToggleCard';

async function page() {
    const User=await getUser();
    if(!User){
        throw new Error("Not Authorized")
    }
    const userStream=await getUserStream(User?._id)
    if(!userStream){
        throw new Error("No Stream Available")
    }
   
  return (
    <div className='p-6 pl-24'>
        <div className='mb-4'>
          <h1 className='text-2xl font-bold'>
            Chat Setting
          </h1>
        </div>
        <div className='space-y-4'>
         <ToggleCard field='isChatEnabled' label="Enable Chat" value={userStream.isChatEnabled}/>
         <ToggleCard field='isChatSlowed' label="Slow Chat" value={userStream.isChatSlowed}/>
         <ToggleCard field='isChatFollowerOnly' label="Follower Only" value={userStream.isChatFollowerOnly}/>
        </div>
        </div>
  )
}

export default page