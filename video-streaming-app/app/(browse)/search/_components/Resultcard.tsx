import { Stream } from '@/Model/Stream.model'
import { User } from '@/Model/User.mode'
import Link from 'next/link'
import React from 'react'
import Thumbnail, { ThumbnailSkelton } from '../../(Home)/_components/Thumbnail'
import { formatDistanceToNow } from 'date-fns'
import { Skeleton } from '@/components/ui/skeleton'
import { Blocked } from '@/Model/Blocked.model'
interface StreamWithUser extends Stream{
   User:User
   Blocked?:Array<Blocked>
}
interface ResultCardprops{
    data:StreamWithUser
}
function Resultcard({data}:ResultCardprops) {
  return (
   <Link href={`/${data.User.username}`}>
    <div className='w-full flex gap-x-4'>
      <div className='relative h-[9rem] w-[16rem]'>
         <Thumbnail username={data.User.username} src={data.thumbnail} fallback={data.User.ProfilePic} isLive={data.isLive} />
      </div>
      <div className='space-y-1'>
       <div className='flex items-center gap-x-2'>
        <p className='font-bold text-lg cursor-pointer hover:text-blue-500'>
            {data.User.username}
        </p>
       </div>
       <p className='text-muted-foreground text-sm'>
        {data.name}
       </p>
       <p className='text-muted-foreground text-sm'>
        {formatDistanceToNow(new Date(data?.updatedAt),{
            addSuffix:true
        })}
       </p>
      </div>
    </div>
   </Link>
  )
}
export const ResultCardSkelton=()=>{
    return (
        <div className='w-full flex gap-x-4'>
            <div className='relative h-[9rem] w-[16rem]'>
              <ThumbnailSkelton/>
            </div>
           <div className='space-y-2'>
            <Skeleton className='h-4 w-32'/>
            <Skeleton className='h-3 w-24'/>
            <Skeleton className='h-3 w-16'/>
           </div>
        </div>
    )
}

export default Resultcard