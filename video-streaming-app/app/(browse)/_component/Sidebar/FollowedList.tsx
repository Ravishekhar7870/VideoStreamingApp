'use client'
import { User } from '@/Model/User.mode'
import React from 'react'
import { useSelector } from 'react-redux'
import UserItem, { UserItemSkelton } from './UserItem'
import { Stream } from '@/Model/Stream.model'
import { RootState } from '@/Store'
interface Followed{
    id:string,
    Channel:User
}
interface followList{
    data:(Followed &{
        stream:Stream | null
    })[]
}
function FollowedList({data}:followList) {
    const isCollapsed=useSelector((store:RootState)=>store.sidebar.isCollapsed);
    if(data.length<1){
        return null;
    }
   
  return (

    <div>
        {
            !isCollapsed && (
                <div className='pl-6 mb-4'>
                    <p className='text-sm text-muted-foreground'>
                        Following
                    </p>
                 </div>
            )
        }
        <ul className='space-y-2 px-2'>
        {
                data.map((user)=>(
                    <UserItem key={user.Channel._id} username={user.Channel.username}  imageUrl={user.Channel.ProfilePic} isLive={user.stream?.isLive}
                    />
                ))
             }

        </ul>

    </div>
  )
}
export const FollowedListSkelton=()=>{
    return (
        <ul className='px-2 pt-2 lg:pt-0'>
         {
            [...Array(4)].map((_,i)=>(
                <UserItemSkelton key={i}/>
            ))
         }
        </ul>
    )
}
export default FollowedList