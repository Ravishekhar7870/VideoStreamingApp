import { Button } from '@/components/ui/button'
import React from 'react'
import UrlCard from './_components/UrlCard'
import getUser from '@/lib/GetUser'
import { getUserStream } from '@/Controllers/Stream.controller';
import KeyCard from './_components/KetCard';
import ConnectModal from './_components/ConnectModal';

async function page() {
    const user=await getUser();
    if(!user){
        throw new Error("Not AUthorized")
    }
    const userStream=await getUserStream(user?._id);
    if(!userStream){
        throw new Error("Stream not Found")
    }
  return (
    <div className='p-6'>
    <div className='flex items-center justify-between mb-4'>
   <h1 className='text-2xl font-bold'>
      Keys and Url
   </h1>
    <ConnectModal/>
   
    </div>
    <div className='space-y-4'>
     <UrlCard value={userStream.serverUrl}/>
     <KeyCard value={userStream.serverKey}/>
   </div>
    </div>
  )
}

export default page