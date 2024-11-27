import React from 'react'
import { Stream } from '@/Model/Stream.model'
import { User } from '@/Model/User.mode'
import Link from 'next/link'
import Thumbnail, { ThumbnailSkelton } from './Thumbnail'
import ChannelAvatar from '@/components/Avatar'
import { Skeleton } from '@/components/ui/skeleton'
interface StreamCardwithUser  extends Stream{
   User:User,
   Blocked?:Array<any>
}
interface StreamcardProps{
    data:StreamCardwithUser
}
function Streamcard({data}:StreamcardProps) {
  return (
    <Link href={`/${data.User.username}`}>
   <div className='h-full w-full space-y-4'>
      <Thumbnail
      src={data.thumbnail}
      fallback={data.User.ProfilePic}
      username={data.User.username}
      isLive={data.isLive}
      />
      <div className='flex gap-x-3'>
         <ChannelAvatar username={data.User.username} islive={data.isLive}imageUrl={data.User.ProfilePic} />
       <div className='flex flex-col text-sm overflow-hidden'>
         <p className='truncate font-semibold hover:text-blue-500'>
            {data.name}
         </p>
         <p className='text-muted-foreground'>
            {data.User.username}
         </p>
       </div>
      </div>
   </div>
   </Link>
  )
}
export const StreamcardSkelton=()=>{
   return (
      <div className='h-full w-full space-y-4'>
       <ThumbnailSkelton/>
       <div className='flex gap-x-3'>
        <div className='flex flex-col gap-y-1'>
          <Skeleton className='h-4 w-32'/>
          <Skeleton className='h-3 w-34'/>
        </div>
       </div>
      </div>
   )
}
export default Streamcard