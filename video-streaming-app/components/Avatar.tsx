import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from '@/components/ui/skeleton'
interface AvatarProps{
    username:string
    islive?:boolean,
    imageUrl?:string
}
function ChannelAvatar({username,islive,imageUrl}:AvatarProps) {
  return (
    <div className='relative'>
     <Avatar  className={`${islive && 'ring-2 ring-rose-500 border border-background'}`}>
       <AvatarImage src={imageUrl} className='objet-cover'/>
       <AvatarFallback>
          {username[0]}
          {username[username.length-1]}
       </AvatarFallback>
     </Avatar>
    </div>
  )
}
export const AvatarSkelton=()=>{
   return (
    <div>
        <Skeleton className='rounded-full'></Skeleton>
    </div>
   )
}

export default ChannelAvatar