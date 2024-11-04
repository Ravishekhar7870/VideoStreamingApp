import { isfollowing } from '@/Controllers/Follower.controller';
import { getReqUser } from '@/Controllers/User.controller';
import { notFound } from 'next/navigation';
import React from 'react'
import Action from './_component/Action';
import getUser from '@/lib/GetUser';

interface UserPageProps{
    params:{
        username:string;
    }
}
async function UserPage({params}:UserPageProps) {
  const user= await getReqUser(params.username)
  const CurrUser=await getUser();
  let isLoggedin=false;
  if(CurrUser){
    isLoggedin=true;
  }
  if(!user){
    notFound()
  }
  const isfollow=await isfollowing(user._id)
  return (
    <div className='flex flex-col gap-y-4'>
      <p>Username is:{user.username}</p>
      <p>ClerkId is:{user.clerkId}</p>
      <p>is following {`${isfollow}`}</p>
      <Action id={user._id} isfollow={isfollow} isLoggedin={isLoggedin}/>
      </div>
      
  )
}

export default UserPage